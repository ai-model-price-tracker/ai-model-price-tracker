import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';

// Normalize variant slugs to canonical form
const SLUG_ALIASES = {
  mistralai: 'mistral',
  together_ai: 'together',
  'x-ai': 'xai',
  cohere_chat: 'cohere',
  gemini: 'google',
  bedrock: 'amazon',
  bedrock_converse: 'amazon',
  bedrock_mantle: 'amazon',
  amazon_nova: 'amazon',
  aws: 'amazon',
  azure_ai: 'azure',
  fireworks_ai: 'fireworks',
  vertex_ai: 'google',
  vertex_ai_beta: 'google',
};

function normalizeSlug(slug) {
  return SLUG_ALIASES[slug] || slug;
}

// Provider display names and official pricing URLs (canonical slugs only)
const PROVIDERS = {
  'openai': { display: 'OpenAI', url: 'https://platform.openai.com/docs/pricing' },
  'anthropic': { display: 'Anthropic', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
  'google': { display: 'Google', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  'deepseek': { display: 'DeepSeek', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
  'mistral': { display: 'Mistral', url: 'https://mistral.ai/pricing' },
  'meta-llama': { display: 'Meta (Llama)', url: 'https://llama.meta.com/' },
  'cohere': { display: 'Cohere', url: 'https://cohere.com/pricing' },
  'perplexity': { display: 'Perplexity', url: 'https://docs.perplexity.ai/guides/pricing' },
  'groq': { display: 'Groq', url: 'https://groq.com/pricing' },
  'together': { display: 'Together AI', url: 'https://www.together.ai/pricing' },
  'xai': { display: 'xAI (Grok)', url: 'https://docs.x.ai/docs/models' },
  'amazon': { display: 'Amazon Bedrock', url: 'https://aws.amazon.com/bedrock/pricing/' },
  'microsoft': { display: 'Azure OpenAI', url: 'https://azure.microsoft.com/en-us/pricing/details/azure-openai/' },
  'azure': { display: 'Azure OpenAI', url: 'https://azure.microsoft.com/en-us/pricing/details/azure-openai/' },
  'qwen': { display: 'Qwen (Alibaba)', url: 'https://help.aliyun.com/zh/model-studio/getting-started/models' },
  'nvidia': { display: 'NVIDIA', url: 'https://build.nvidia.com/' },
  'ai21': { display: 'AI21 Labs', url: 'https://www.ai21.com/pricing' },
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

// OpenRouter: pricing fields are USD per token → × 1,000,000 = USD per 1M tokens
// e.g. GPT-4o: prompt=0.0000025 → $2.5/1M tokens
function processOpenRouterModels(raw) {
  if (!raw?.data || !Array.isArray(raw.data)) {
    log('[WARN] OpenRouter response missing data array');
    return [];
  }

  const toPrice = (v) => {
    if (!v || v === '0') return null;
    const n = parseFloat(v) * 1_000_000;
    return isNaN(n) ? null : round(n);
  };

  return raw.data
    .filter(m => m.pricing)
    .map(m => {
      const providerSlug = parseOpenRouterProvider(m.id);
      const p = m.pricing;
      const arch = m.architecture || {};

      return {
        provider: providerSlug,
        id: m.id,
        name: m.name || m.id,
        description: m.description || null,
        created: m.created || null,

        // Pricing — all converted from USD/token → USD/1M tokens
        input_price_per_1m: toPrice(p.prompt),
        output_price_per_1m: toPrice(p.completion),
        cached_input_price_per_1m: toPrice(p.input_cache_read),
        input_cache_write_price_per_1m: toPrice(p.input_cache_write),
        image_price_per_1m: toPrice(p.image),
        web_search_price_per_request: p.web_search ? parseFloat(p.web_search) : null,
        internal_reasoning_price_per_1m: toPrice(p.internal_reasoning),
        audio_price_per_1m: toPrice(p.audio),

        // Architecture
        context_length: m.context_length || null,
        max_completion_tokens: m.top_provider?.max_completion_tokens || null,
        input_modalities: arch.input_modalities || null,
        output_modalities: arch.output_modalities || null,
        tokenizer: arch.tokenizer || null,

        // Capabilities
        supports_vision: arch.input_modalities?.includes('image') ?? false,
        supports_function_calling: Array.isArray(m.supported_parameters) && m.supported_parameters.includes('tools'),
        supports_streaming: true,
        supported_parameters: m.supported_parameters || null,

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

// genai-prices: prices are already in USD per 1M tokens — no conversion needed
// e.g. GPT-4o: input_mtok=2.5 → $2.5/1M tokens
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
      if (!m || typeof m !== 'object') continue;
      const prices = m.prices || {};
      const ep = (v) => { const n = extractPrice(v); return n != null ? round(n) : null; };

      models.push({
        provider: slug,
        id: `${slug}/${m.id}`,
        name: m.name || m.id,

        // Already USD per 1M tokens
        input_price_per_1m: ep(prices.input_mtok),
        output_price_per_1m: ep(prices.output_mtok),
        cached_input_price_per_1m: ep(prices.cache_read_mtok),
        input_cache_write_price_per_1m: ep(prices.cache_write_mtok),
        input_audio_price_per_1m: ep(prices.input_audio_mtok),
        output_audio_price_per_1m: ep(prices.output_audio_mtok),
        cache_audio_read_price_per_1m: ep(prices.cache_audio_read_mtok),

        context_length: m.context_window || null,
        deprecated: m.deprecated === true,
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

// LiteLLM: cost fields are USD per token → × 1,000,000 = USD per 1M tokens
// e.g. GPT-4o: input_cost_per_token=0.0000025 → $2.5/1M tokens
// ⚠ Some providers (e.g. wandb) have incorrect values in upstream data.
//   These are caught by the price sanity filter after merge.
function processLiteLLMModels(raw) {
  if (!raw || typeof raw !== 'object') {
    log('[WARN] LiteLLM response is not an object');
    return [];
  }

  // USD per token → USD per 1M tokens
  const to1M = (v) => v != null ? round(v * 1_000_000) : null;

  const models = [];
  for (const [key, v] of Object.entries(raw)) {
    if (key === 'sample_spec') continue;
    if (v.mode !== 'chat') continue;
    if (!v.input_cost_per_token && !v.output_cost_per_token) continue;

    const providerSlug = normalizeLiteLLMProvider(v.litellm_provider);

    models.push({
      provider: providerSlug,
      id: `${providerSlug}/${key}`,
      name: key,

      // Pricing — USD per token → USD per 1M tokens
      input_price_per_1m: to1M(v.input_cost_per_token),
      output_price_per_1m: to1M(v.output_cost_per_token),
      cached_input_price_per_1m: to1M(v.cache_read_input_token_cost),
      input_cache_write_price_per_1m: to1M(v.cache_creation_input_token_cost),
      batch_input_price_per_1m: to1M(v.input_cost_per_token_batches),
      batch_output_price_per_1m: to1M(v.output_cost_per_token_batches),
      input_audio_price_per_1m: to1M(v.input_cost_per_audio_token),
      output_audio_price_per_1m: to1M(v.output_cost_per_audio_token),
      output_reasoning_price_per_1m: to1M(v.output_cost_per_reasoning_token),

      // Limits
      context_length: v.max_input_tokens || v.max_tokens || null,
      max_output_tokens: v.max_output_tokens || null,
      max_images_per_prompt: v.max_images_per_prompt || null,

      // Capabilities
      supports_vision: v.supports_vision === true,
      supports_function_calling: v.supports_function_calling === true,
      supports_parallel_function_calling: v.supports_parallel_function_calling === true,
      supports_response_schema: v.supports_response_schema === true,
      supports_prompt_caching: v.supports_prompt_caching === true,
      supports_pdf_input: v.supports_pdf_input === true,
      supports_audio_input: v.supports_audio_input === true,
      supports_audio_output: v.supports_audio_output === true,
      supports_web_search: v.supports_web_search === true,
      supports_reasoning: v.supports_reasoning === true,
      supports_computer_use: v.supports_computer_use === true,
      supports_streaming: v.supports_native_streaming !== false,

      source: 'litellm',
    });
  }
  return models;
}

// ─── Merge & Normalize ──────────────────────────────────────────────────────

function loadOfficialScrapedData() {
  const cwd = process.cwd();
  const officialPath = join(cwd, 'docs', 'data', 'official-prices.json');
  if (!existsSync(officialPath)) return [];
  try {
    const data = JSON.parse(readFileSync(officialPath, 'utf-8'));
    return data.models || [];
  } catch {
    return [];
  }
}

// No merge — keep every source's entry separately so users can compare across sources
function combineModels(openRouterModels, genaiModels, litellmModels, officialModels) {
  return [...openRouterModels, ...genaiModels, ...litellmModels, ...officialModels];
}

function groupByProvider(models) {
  const groups = {};
  for (const m of models) {
    const slug = normalizeSlug(m.provider);
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
  let cheapestInput = null, expensiveInput = null;
  let cheapestOutput = null, expensiveOutput = null;
  let sumInput = 0, sumOutput = 0, pricedCount = 0;

  for (const p of providers) {
    totalModels += p.models.length;
    for (const m of p.models) {
      const inp = m.input_price_per_1m;
      const out = m.output_price_per_1m;
      const entry = { provider: p.display_name, id: m.id, name: m.name, input_price_per_1m: inp, output_price_per_1m: out };

      if (inp != null && inp > 0) {
        pricedCount++;
        sumInput += inp;
        sumOutput += (out || 0);
        if (!cheapestInput || inp < cheapestInput.input_price_per_1m) cheapestInput = entry;
        if (!expensiveInput || inp > expensiveInput.input_price_per_1m) expensiveInput = entry;
      }
      if (out != null && out > 0) {
        if (!cheapestOutput || out < cheapestOutput.output_price_per_1m) cheapestOutput = entry;
        if (!expensiveOutput || out > expensiveOutput.output_price_per_1m) expensiveOutput = entry;
      }
    }
  }

  return {
    total_providers: providers.length,
    total_models: totalModels,
    cheapest_model: cheapestInput,
    most_expensive_model: expensiveInput,
    cheapest_output_model: cheapestOutput,
    most_expensive_output_model: expensiveOutput,
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

  const docsDataDir = resolve(cwd, 'docs', 'data');
  mkdirSync(docsDataDir, { recursive: true });

  const json = JSON.stringify(data, null, 2);

  const datedPath = join(docsDataDir, `${today}.json`);
  const latestPath = join(docsDataDir, 'latest.json');

  writeFileSync(datedPath, json);
  writeFileSync(latestPath, json);

  log(`Written: ${datedPath}`);
  log(`Written: ${latestPath}`);
}

function loadPreviousData() {
  const cwd = process.cwd();
  const latestPath = join(cwd, 'docs', 'data', 'latest.json');
  if (!existsSync(latestPath)) return null;
  try {
    return JSON.parse(readFileSync(latestPath, 'utf-8'));
  } catch {
    return null;
  }
}

// ─── Diff ────────────────────────────────────────────────────────────────

function writeDiff(currentData) {
  const previous = loadPreviousData();
  if (!previous) {
    log('No previous data — skipping diff');
    return;
  }

  // Build maps: key = "source/id" → model data
  const toMap = (data) => {
    const map = new Map();
    for (const p of data.providers) {
      for (const m of p.models) {
        const key = `${m.source}/${m.id}`;
        map.set(key, { ...m, provider_display: p.display_name });
      }
    }
    return map;
  };

  const prevMap = toMap(previous);
  const currMap = toMap(currentData);

  const added = [];
  const removed = [];
  const priceChanged = [];

  // New models
  for (const [key, m] of currMap) {
    if (!prevMap.has(key)) {
      added.push({ id: m.id, name: m.name, source: m.source, provider: m.provider_display,
        input_price_per_1m: m.input_price_per_1m, output_price_per_1m: m.output_price_per_1m });
    }
  }

  // Removed models
  for (const [key, m] of prevMap) {
    if (!currMap.has(key)) {
      removed.push({ id: m.id, name: m.name, source: m.source, provider: m.provider_display });
    }
  }

  // Price changes
  for (const [key, curr] of currMap) {
    const prev = prevMap.get(key);
    if (!prev) continue;
    const inputChanged = prev.input_price_per_1m !== curr.input_price_per_1m;
    const outputChanged = prev.output_price_per_1m !== curr.output_price_per_1m;
    if (inputChanged || outputChanged) {
      priceChanged.push({
        id: curr.id, name: curr.name, source: curr.source, provider: curr.provider_display,
        input: { from: prev.input_price_per_1m, to: curr.input_price_per_1m },
        output: { from: prev.output_price_per_1m, to: curr.output_price_per_1m },
      });
    }
  }

  const diff = {
    date: new Date().toISOString().slice(0, 10),
    compared_to: previous.updated_at,
    summary: {
      added: added.length,
      removed: removed.length,
      price_changed: priceChanged.length,
    },
    added,
    removed,
    price_changed: priceChanged,
  };

  const cwd = process.cwd();
  const docsDataDir = resolve(cwd, 'docs', 'data');
  const diffPath = join(docsDataDir, `${diff.date}_diff.json`);
  writeFileSync(diffPath, JSON.stringify(diff, null, 2));
  log(`Diff written: ${diffPath}`);
  log(`  Added: ${added.length}, Removed: ${removed.length}, Price changed: ${priceChanged.length}`);
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
      log('Preserving previous data (docs/data/latest.json unchanged).');
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

  const combined = combineModels(openRouterModels, genaiModels, litellmModels, officialModels);
  log(`Combined total: ${combined.length} models (no merge, all sources kept)`);

  // Filter out models with absurd prices (upstream data errors, not unit mismatch in our code).
  // e.g. LiteLLM's wandb provider has input_cost_per_token=0.135 for DeepSeek R1 (should be ~0.00000055).
  // Real most expensive models are ~$75/1M (Claude Opus). $1000 threshold gives wide margin.
  const MAX_PRICE_PER_1M = 1000;
  const sane = combined.filter(m => {
    const input = m.input_price_per_1m ?? 0;
    const output = m.output_price_per_1m ?? 0;
    if (input > MAX_PRICE_PER_1M || output > MAX_PRICE_PER_1M) {
      log(`[FILTERED] ${m.id}: $${input}/$${output} per 1M tokens exceeds $${MAX_PRICE_PER_1M} threshold`);
      return false;
    }
    return true;
  });
  if (sane.length < combined.length) {
    log(`Filtered ${combined.length - sane.length} models with abnormal prices`);
  }

  const sources = [];
  if (openRouterModels.length > 0) sources.push('openrouter');
  if (genaiModels.length > 0) sources.push('genai-prices');
  if (litellmModels.length > 0) sources.push('litellm');
  if (officialModels.length > 0) sources.push('official');

  const providers = groupByProvider(sane);
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

  // Diff must run before writeOutput overwrites latest.json
  writeDiff(output);
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
