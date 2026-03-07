/**
 * Updates README files with live data from official-prices.json and latest.json:
 *
 * 1. Scraper status table — emoji-based, no translation needed:
 *    ✅ N models  — scraped successfully
 *    ⚠️ 0 models  — ran but got nothing
 *
 * 2. Tracked Providers table — auto-generated from latest.json providers
 *    that have an official_pricing_url. Language-neutral (names + URLs).
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(process.cwd());
const OFFICIAL_PATH = join(ROOT, 'docs', 'data', 'official-prices.json');
const LATEST_PATH = join(ROOT, 'docs', 'data', 'latest.json');

// Map: scraper filename (without .mjs) → provider field in official-prices.json
const SCRAPER_PROVIDERS = {
  anthropic: 'anthropic',
  openai: 'openai',
  'google-gemini': 'google',
  deepseek: 'deepseek',
  'aws-bedrock': 'amazon',
  mistral: 'mistral',
  xai: 'xai',
};

// ─── Scraper status ─────────────────────────────────────────────────────────

function getOfficialCounts(data) {
  const counts = {};
  for (const m of data.models) {
    counts[m.provider] = (counts[m.provider] || 0) + 1;
  }
  return counts;
}

function buildStatus(scraperFile, counts) {
  const provider = SCRAPER_PROVIDERS[scraperFile];
  if (!provider) return null;
  const count = counts[provider] || 0;
  return count > 0 ? `✅ ${count} models` : `⚠️ 0 models`;
}

function updateScraperTable(content, counts) {
  for (const [scraperFile] of Object.entries(SCRAPER_PROVIDERS)) {
    const status = buildStatus(scraperFile, counts);
    if (!status) continue;

    const re = new RegExp(
      `(\\|\\s*\\[\`${scraperFile}\\.mjs\`\\][^|]*\\|[^|]*\\|)\\s*[^|]+\\s*\\|`,
    );
    content = content.replace(re, `$1 ${status} |`);
  }
  return content;
}

// ─── Tracked Providers ──────────────────────────────────────────────────────

function buildTrackedProvidersTable(latestData) {
  const providers = latestData.providers || [];

  // Merge providers with the same display name (e.g. mistral/mistralai, google/gemini)
  const merged = {};
  for (const p of providers) {
    if (!p.official_pricing_url) continue;
    const name = p.display_name || p.provider;
    if (!merged[name]) {
      merged[name] = { name, models: 0, url: p.official_pricing_url };
    }
    merged[name].models += p.models.length;
  }

  const tracked = Object.values(merged).sort((a, b) => b.models - a.models);

  const rows = tracked.map(p => {
    const domain = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `| ${p.name} | ${p.models} | [${domain}](${p.url}) |`;
  });

  return [
    '| Provider | Models | Official Pricing |',
    '|----------|--------|-----------------|',
    ...rows,
  ].join('\n');
}

function updateTrackedProviders(content, table) {
  // Find the tracked providers table by looking for a table that contains "platform.openai".
  // Match the full table: header + separator + all rows (platform.openai can be any row).
  const re = /(\|[^\n]+\|\n\|[-| ]+\|\n)((?:\|[^\n]+\|\n)+?)(\n)/;
  // Find all table blocks; pick the one containing "platform.openai"
  let result = content;
  let match;
  const globalRe = new RegExp(re.source, 'g');
  while ((match = globalRe.exec(content)) !== null) {
    const fullTable = match[1] + match[2];
    if (fullTable.includes('platform.openai')) {
      result = content.slice(0, match.index) + table + '\n' + match[3] + content.slice(match.index + match[0].length);
      break;
    }
  }
  return result;
}

// ─── Main ───────────────────────────────────────────────────────────────────

let officialData, latestData;
try {
  officialData = JSON.parse(readFileSync(OFFICIAL_PATH, 'utf-8'));
} catch {
  console.error(`Cannot read ${OFFICIAL_PATH}`);
  process.exit(1);
}

try {
  latestData = JSON.parse(readFileSync(LATEST_PATH, 'utf-8'));
} catch {
  console.error(`Cannot read ${LATEST_PATH}`);
  process.exit(1);
}

const counts = getOfficialCounts(officialData);
console.log('Official scraper counts:', counts);

const trackedTable = buildTrackedProvidersTable(latestData);
const trackedCount = trackedTable.split('\n').length - 2; // minus header rows
console.log(`Tracked providers with URLs: ${trackedCount}`);

function updateReadme(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const original = content;

  content = updateScraperTable(content, counts);
  content = updateTrackedProviders(content, trackedTable);

  if (content !== original) {
    writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
}

// Update README.md
updateReadme(join(ROOT, 'README.md'));

// Update translations
const transDir = join(ROOT, 'translations');
for (const f of readdirSync(transDir)) {
  if (f.startsWith('README.') && f.endsWith('.md')) {
    updateReadme(join(transDir, f));
  }
}
