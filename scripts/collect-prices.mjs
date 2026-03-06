import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';

// Provider display names and official pricing URLs
const PROVIDERS = {
  'openai': { display: 'OpenAI', url: 'https://platform.openai.com/docs/pricing' },
  'anthropic': { display: 'Anthropic', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
  'google': { display: 'Google', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  'deepseek': { display: 'DeepSeek', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
  'mistralai': { display: 'Mistral', url: 'https://mistral.ai/pricing' },
  'mistral': { display: 'Mistral', url: 'https://mistral.ai/pricing' },
  'meta-llama': { display: 'Meta (Llama)', url: 'https://llama.meta.com/' },
  'cohere': { display: 'Cohere', url: 'https://cohere.com/pricing' },
  'cohere_chat': { display: 'Cohere', url: 'https://cohere.com/pricing' },
  'perplexity': { display: 'Perplexity', url: 'https://docs.perplexity.ai/guides/pricing' },
  'groq': { display: 'Groq', url: 'https://groq.com/pricing' },
  'together': { display: 'Together AI', url: 'https://www.together.ai/pricing' },
  'together_ai': { display: 'Together AI', url: 'https://www.together.ai/pricing' },
  'x-ai': { display: 'xAI (Grok)', url: 'https://docs.x.ai/docs/models' },
  'xai': { display: 'xAI (Grok)', url: 'https://docs.x.ai/docs/models' },
  'amazon': { display: 'Amazon Bedrock', url: 'https://aws.amazon.com/bedrock/pricing/' },
  'bedrock': { display: 'Amazon Bedrock', url: 'https://aws.amazon.com/bedrock/pricing/' },
  'microsoft': { display: 'Azure OpenAI', url: 'https://azure.microsoft.com/en-us/pricing/details/azure-openai/' },
  'azure': { display: 'Azure OpenAI', url: 'https://azure.microsoft.com/en-us/pricing/details/azure-openai/' },
  'qwen': { display: 'Qwen (Alibaba)', url: 'https://help.aliyun.com/zh/model-studio/getting-started/models' },
  'nvidia': { display: 'NVIDIA', url: 'https://build.nvidia.com/' },
  'ai21': { display: 'AI21 Labs', url: 'https://www.ai21.com/pricing' },
  'gemini': { display: 'Google', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  'cerebras': { display: 'Cerebras', url: 'https://cerebras.ai/pricing' },
  'fireworks_ai': { display: 'Fireworks AI', url: 'https://fireworks.ai/pricing' },
  'deepinfra': { display: 'DeepInfra', url: 'https://deepinfra.com/pricing' },
  'sambanova': { display: 'SambaNova', url: 'https://sambanova.ai/' },
  'replicate': { display: 'Replicate', url: 'https://replicate.com/pricing' },
};

const OPENROUTER_API = 'https://openrouter.ai/api/v1/models';
const GENAI_PRICES_API = 'https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json';
const LITELLM_API = 'https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json';

// ─── Fetch helpers ───────────────────────────────────────────────────────────

async function fetchWithRetry(url, label, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      log(`Fetching ${label}... (attempt ${attempt + 1})`);
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const data = await res.json();
      log(`Fetched ${label} successfully`);
      return data;
    } catch (err) {
      log(`[WARN] ${label} attempt ${attempt + 1} failed: ${err.message}`);
      if (attempt < retries) {
        log(`Retrying in 5s...`);
        await sleep(5000);
      }
    }
  }
  return null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function log(msg) { console.log(`[${new Date().toISOString()}] ${msg}`); }

// ─── OpenRouter ──────────────────────────────────────────────────────────────

function parseOpenRouterProvider(modelId) {
  const parts = modelId.split('/');
  return parts.length >= 2 ? parts[0].toLowerCase() : 'unknown';
}

function processOpenRouterModels(raw) {
  if (!raw?.data || !Array.isArray(raw.data)) {
    log('[WARN] OpenRouter response missing data array');
    return [];
  }

  return raw.data
    .filter(m => m.pricing)
    .map(m => {
      const providerSlug = parseOpenRouterProvider(m.id);
      const inputPrice = parseFloat(m.pricing.prompt || '0') * 1_000_000;
      const outputPrice = parseFloat(m.pricing.completion || '0') * 1_000_000;
      const cachedInput = m.pricing.input_cache_read
        ? parseFloat(m.pricing.input_cache_read) * 1_000_000
        : null;

      return {
        provider: providerSlug,
        id: m.id,
        name: m.name || m.id,
        input_price_per_1m: round(inputPrice),
        output_price_per_1m: round(outputPrice),
        cached_input_price_per_1m: cachedInput !== null ? round(cachedInput) : null,
        context_length: m.context_length || null,
        supports_vision: m.architecture?.input_modalities?.includes('image') ?? false,
        supports_function_calling: Array.isArray(m.supported_parameters) && m.supported_parameters.includes('tools'),
        supports_streaming: true,
        source: 'openrouter',
      };
    });
}

// ─── genai-prices ────────────────────────────────────────────────────────────

function extractPrice(value) {
  if (value == null) return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && value.base != null) return value.base;
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

function processGenAIPrices(raw) {
  if (!Array.isArray(raw)) {
    log('[WARN] genai-prices response is not an array');
    return [];
  }

  const models = [];
  for (const provider of raw) {
    const slug = (provider.id || '').toLowerCase();
    if (!provider.models) continue;

    for (const m of provider.models) {
      const prices = m.prices || {};
      const inp = extractPrice(prices.input_mtok);
      const out = extractPrice(prices.output_mtok);
      const cached = extractPrice(prices.cache_read_mtok);
      models.push({
        provider: slug,
        id: `${slug}/${m.id}`,
        name: m.name || m.id,
        input_price_per_1m: inp != null ? round(inp) : null,
        output_price_per_1m: out != null ? round(out) : null,
        cached_input_price_per_1m: cached != null ? round(cached) : null,
        context_length: m.context_window || null,
        supports_vision: false,
        supports_function_calling: false,
        supports_streaming: true,
        source: 'genai-prices',
      });
    }
  }
  return models;
}

// ─── LiteLLM ─────────────────────────────────────────────────────────────────

// Normalize LiteLLM provider slugs to match our provider keys
function normalizeLiteLLMProvider(litellmProvider) {
  if (!litellmProvider) return 'unknown';
  const p = litellmProvider.toLowerCase();
  // Strip vertex_ai- prefixes (vertex_ai-anthropic_models → anthropic)
  if (p.startsWith('vertex_ai-')) {
    const sub = p.replace('vertex_ai-', '').replace('_models', '');
    return sub;
  }
  if (p === 'bedrock' || p === 'bedrock_converse') return 'amazon';
  if (p === 'amazon_nova') return 'amazon';
  return p;
}

function processLiteLLMModels(raw) {
  if (!raw || typeof raw !== 'object') {
    log('[WARN] LiteLLM response is not an object');
    return [];
  }

  const models = [];
  for (const [key, v] of Object.entries(raw)) {
    if (key === 'sample_spec') continue;
    // Only include chat models with token pricing
    if (v.mode !== 'chat') continue;
    if (!v.input_cost_per_token || !v.output_cost_per_token) continue;

    const providerSlug = normalizeLiteLLMProvider(v.litellm_provider);
    const inputPrice = v.input_cost_per_token * 1_000_000;
    const outputPrice = v.output_cost_per_token * 1_000_000;
    const cachedInput = v.cache_read_input_token_cost
      ? v.cache_read_input_token_cost * 1_000_000
      : null;

    models.push({
      provider: providerSlug,
      id: `${providerSlug}/${key}`,
      name: key,
      input_price_per_1m: round(inputPrice),
      output_price_per_1m: round(outputPrice),
      cached_input_price_per_1m: cachedInput !== null ? round(cachedInput) : null,
      context_length: v.max_input_tokens || v.max_tokens || null,
      supports_vision: v.supports_vision === true,
      supports_function_calling: v.supports_function_calling === true,
      supports_streaming: true,
      source: 'litellm',
    });
  }
  return models;
}

// ─── Merge & Normalize ──────────────────────────────────────────────────────

function loadOfficialScrapedData() {
  const cwd = process.cwd();
  const officialPath = join(cwd, 'outputs', 'official-prices.json');
  if (!existsSync(officialPath)) return [];
  try {
    const data = JSON.parse(readFileSync(officialPath, 'utf-8'));
    return data.models || [];
  } catch {
    return [];
  }
}

function mergeModels(openRouterModels, genaiModels, litellmModels, officialModels) {
  const map = new Map();

  // OpenRouter first (primary)
  for (const m of openRouterModels) {
    map.set(m.id.toLowerCase(), m);
  }

  // genai-prices supplements: add if missing, or enrich cache pricing
  for (const m of genaiModels) {
    const key = m.id.toLowerCase();
    if (map.has(key)) {
      const existing = map.get(key);
      if (existing.cached_input_price_per_1m == null && m.cached_input_price_per_1m != null) {
        existing.cached_input_price_per_1m = m.cached_input_price_per_1m;
      }
    } else {
      map.set(key, m);
    }
  }

  // LiteLLM supplements: add if missing, or enrich capabilities/cache pricing
  for (const m of litellmModels) {
    const key = m.id.toLowerCase();
    if (map.has(key)) {
      const existing = map.get(key);
      if (existing.cached_input_price_per_1m == null && m.cached_input_price_per_1m != null) {
        existing.cached_input_price_per_1m = m.cached_input_price_per_1m;
      }
      if (!existing.supports_vision && m.supports_vision) {
        existing.supports_vision = true;
      }
      if (!existing.supports_function_calling && m.supports_function_calling) {
        existing.supports_function_calling = true;
      }
    } else {
      map.set(key, m);
    }
  }

  // Official scraped data: highest trust - overwrite prices if exists
  for (const m of officialModels) {
    const key = m.id.toLowerCase();
    if (map.has(key)) {
      const existing = map.get(key);
      // Official prices override aggregator prices
      if (m.input_price_per_1m != null) existing.input_price_per_1m = m.input_price_per_1m;
      if (m.output_price_per_1m != null) existing.output_price_per_1m = m.output_price_per_1m;
      if (m.cached_input_price_per_1m != null) existing.cached_input_price_per_1m = m.cached_input_price_per_1m;
      existing.source = 'official';
    } else {
      map.set(key, m);
    }
  }

  return Array.from(map.values());
}

function groupByProvider(models) {
  const groups = {};
  for (const m of models) {
    const slug = m.provider;
    if (!groups[slug]) {
      const info = PROVIDERS[slug] || { display: slug, url: null };
      groups[slug] = {
        provider: slug,
        display_name: info.display,
        official_pricing_url: info.url,
        models: [],
      };
    }
    const { provider: _p, ...modelData } = m;
    groups[slug].models.push(modelData);
  }

  // Sort models within each provider by input price
  for (const g of Object.values(groups)) {
    g.models.sort((a, b) => (a.input_price_per_1m ?? Infinity) - (b.input_price_per_1m ?? Infinity));
  }

  // Sort providers by display name
  return Object.values(groups).sort((a, b) => a.display_name.localeCompare(b.display_name));
}

function buildSummary(providers) {
  let totalModels = 0;
  let cheapest = null;
  let mostExpensive = null;
  let sumInput = 0;
  let sumOutput = 0;
  let pricedCount = 0;

  for (const p of providers) {
    totalModels += p.models.length;
    for (const m of p.models) {
      const inp = m.input_price_per_1m;
      const out = m.output_price_per_1m;
      if (inp == null || inp <= 0) continue;

      pricedCount++;
      sumInput += inp;
      sumOutput += (out || 0);

      const entry = { provider: p.display_name, id: m.id, name: m.name, input_price_per_1m: inp, output_price_per_1m: out };
      if (!cheapest || inp < cheapest.input_price_per_1m) cheapest = entry;
      if (!mostExpensive || inp > mostExpensive.input_price_per_1m) mostExpensive = entry;
    }
  }

  return {
    total_providers: providers.length,
    total_models: totalModels,
    cheapest_model: cheapest,
    most_expensive_model: mostExpensive,
    average_input_price_per_1m: pricedCount > 0 ? round(sumInput / pricedCount) : 0,
    average_output_price_per_1m: pricedCount > 0 ? round(sumOutput / pricedCount) : 0,
  };
}

function round(n) {
  return Math.round(n * 1_000_000) / 1_000_000;
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateOutput(data) {
  const errors = [];

  if (!data.providers || data.providers.length === 0) {
    errors.push('No providers found');
  }
  if (!data.summary) {
    errors.push('No summary generated');
  }
  if (data.summary) {
    if (data.summary.total_models < 10) {
      errors.push(`Too few models: ${data.summary.total_models} (expected at least 10)`);
    }
    if (data.summary.total_providers < 3) {
      errors.push(`Too few providers: ${data.summary.total_providers} (expected at least 3)`);
    }
    if (data.summary.average_input_price_per_1m == null || isNaN(data.summary.average_input_price_per_1m)) {
      errors.push('average_input_price_per_1m is null or NaN');
    }
    if (!data.summary.cheapest_model) {
      errors.push('No cheapest model found');
    }
    if (!data.summary.most_expensive_model) {
      errors.push('No most expensive model found');
    }
  }

  // Check that key providers exist
  const providerSlugs = new Set(data.providers.map(p => p.provider));
  for (const required of ['openai', 'anthropic']) {
    if (!providerSlugs.has(required)) {
      errors.push(`Missing key provider: ${required}`);
    }
  }

  return errors;
}

// ─── Output ─────────────────────────────────────────────────────────────────

function writeOutput(data) {
  const cwd = process.cwd();
  const today = new Date().toISOString().slice(0, 10);

  const outputDir = resolve(cwd, 'outputs');
  const docsDir = resolve(cwd, 'docs');
  mkdirSync(outputDir, { recursive: true });
  mkdirSync(docsDir, { recursive: true });

  const json = JSON.stringify(data, null, 2);

  const datedPath = join(outputDir, `${today}.json`);
  const latestPath = join(outputDir, 'latest.json');
  const docsLatestPath = join(docsDir, 'latest.json');

  writeFileSync(datedPath, json);
  writeFileSync(latestPath, json);
  writeFileSync(docsLatestPath, json);

  log(`Written: ${datedPath}`);
  log(`Written: ${latestPath}`);
  log(`Written: ${docsLatestPath}`);
}

function loadPreviousData() {
  const cwd = process.cwd();
  const latestPath = join(cwd, 'outputs', 'latest.json');
  if (!existsSync(latestPath)) return null;
  try {
    return JSON.parse(readFileSync(latestPath, 'utf-8'));
  } catch {
    return null;
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  log('Starting AI model price collection...');

  const [openRouterRaw, genaiRaw, litellmRaw] = await Promise.all([
    fetchWithRetry(OPENROUTER_API, 'OpenRouter API'),
    fetchWithRetry(GENAI_PRICES_API, 'genai-prices'),
    fetchWithRetry(LITELLM_API, 'LiteLLM'),
  ]);

  if (!openRouterRaw && !genaiRaw && !litellmRaw) {
    log('[ERROR] All data sources failed.');
    const previous = loadPreviousData();
    if (previous) {
      log('Preserving previous data (outputs/latest.json unchanged).');
      log('Dashboard will continue to show the last successful collection.');
      process.exit(1);
    }
    console.error('No previous data available and all sources failed. Exiting.');
    process.exit(1);
  }

  const openRouterModels = openRouterRaw ? processOpenRouterModels(openRouterRaw) : [];
  const genaiModels = genaiRaw ? processGenAIPrices(genaiRaw) : [];
  const litellmModels = litellmRaw ? processLiteLLMModels(litellmRaw) : [];

  const officialModels = loadOfficialScrapedData();

  log(`OpenRouter: ${openRouterModels.length} models`);
  log(`genai-prices: ${genaiModels.length} models`);
  log(`LiteLLM: ${litellmModels.length} models`);
  log(`Official scrape: ${officialModels.length} models`);

  const merged = mergeModels(openRouterModels, genaiModels, litellmModels, officialModels);
  log(`Merged total: ${merged.length} models`);

  const sources = [];
  if (openRouterModels.length > 0) sources.push('openrouter');
  if (genaiModels.length > 0) sources.push('genai-prices');
  if (litellmModels.length > 0) sources.push('litellm');
  if (officialModels.length > 0) sources.push('official');

  const providers = groupByProvider(merged);
  const summary = buildSummary(providers);

  const output = {
    updated_at: new Date().toISOString(),
    sources,
    providers,
    summary,
  };

  // Validate before writing
  const validationErrors = validateOutput(output);
  if (validationErrors.length > 0) {
    log('[WARN] Validation issues:');
    for (const err of validationErrors) {
      log(`  - ${err}`);
    }
    // Still write if we have some data, but warn
    if (output.providers.length === 0) {
      log('[ERROR] No data to write. Preserving previous data.');
      process.exit(1);
    }
  }

  writeOutput(output);

  log(`Done! ${summary.total_providers} providers, ${summary.total_models} models`);
  log(`Sources: ${sources.join(', ')}`);
  log(`Cheapest: ${summary.cheapest_model?.name} ($${summary.cheapest_model?.input_price_per_1m}/1M input)`);
  log(`Most expensive: ${summary.most_expensive_model?.name} ($${summary.most_expensive_model?.input_price_per_1m}/1M input)`);

  if (validationErrors.length > 0) {
    process.exit(2); // Warn exit code - data written but with issues
  }
}

main();
