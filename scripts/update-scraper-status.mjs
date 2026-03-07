/**
 * Reads official-prices.json and updates the scraper status table
 * in README.md and all translations/README.*.md files.
 *
 * Status uses emoji so no translation is needed:
 *   ✅ N models  — scraped successfully
 *   ⚠️ 0 models  — ran but got nothing
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(process.cwd());
const DATA_PATH = join(ROOT, 'docs', 'data', 'official-prices.json');

// Map: scraper filename (without .mjs) → provider field in official-prices.json
const SCRAPER_PROVIDERS = {
  anthropic: 'anthropic',
  openai: 'openai',
  'google-gemini': 'google',
  deepseek: 'deepseek',
  'aws-bedrock': 'amazon',
  mistral: 'mistralai',
  xai: 'x-ai',
};

function getProviderCounts(data) {
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

function updateReadme(filePath, counts) {
  let content = readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [scraperFile, provider] of Object.entries(SCRAPER_PROVIDERS)) {
    const status = buildStatus(scraperFile, counts);
    if (!status) continue;

    // Match: | [`scraperFile.mjs`](...) | Provider Name | <old status> |
    const re = new RegExp(
      `(\\|\\s*\\[\`${scraperFile}\\.mjs\`\\][^|]*\\|[^|]*\\|)\\s*[^|]+\\s*\\|`,
    );
    const replacement = `$1 ${status} |`;
    const newContent = content.replace(re, replacement);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
}

// Main
let data;
try {
  data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
} catch {
  console.error(`Cannot read ${DATA_PATH}`);
  process.exit(1);
}

const counts = getProviderCounts(data);
console.log('Provider counts:', counts);

// Update README.md
updateReadme(join(ROOT, 'README.md'), counts);

// Update translations
const transDir = join(ROOT, 'translations');
for (const f of readdirSync(transDir)) {
  if (f.startsWith('README.') && f.endsWith('.md')) {
    updateReadme(join(transDir, f), counts);
  }
}
