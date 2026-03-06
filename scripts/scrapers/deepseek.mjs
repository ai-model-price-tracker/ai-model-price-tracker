import { log, round, extractTables } from './utils.mjs';

export const name = 'DeepSeek';
export const url = 'https://api-docs.deepseek.com/quick_start/pricing';

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  const text = await page.textContent('body');
  const models = [];

  // Try table parsing first
  const tables = await extractTables(page);

  for (const table of tables) {
    for (const row of table) {
      const rowText = row.join(' ');
      const modelMatch = rowText.match(/(deepseek[-\w]*)/i);
      if (!modelMatch) continue;

      const cacheMissMatch = rowText.match(/cache\s*miss[^$]*\$([0-9.]+)/i);
      const cacheHitMatch = rowText.match(/cache\s*hit[^$]*\$([0-9.]+)/i);
      const outputMatch = rowText.match(/output[^$]*\$([0-9.]+)/i);

      if (cacheMissMatch && outputMatch) {
        const modelName = modelMatch[1];
        if (models.some(m => m.name === modelName)) continue;
        models.push({
          provider: 'deepseek',
          id: `deepseek/${modelName.toLowerCase()}`,
          name: modelName,
          input_price_per_1m: round(parseFloat(cacheMissMatch[1])),
          output_price_per_1m: round(parseFloat(outputMatch[1])),
          cached_input_price_per_1m: cacheHitMatch ? round(parseFloat(cacheHitMatch[1])) : null,
          context_length: 128000,
          supports_vision: false,
          supports_function_calling: true,
          supports_streaming: true,
          source: 'official',
        });
      }
    }
  }

  // Fallback: text parsing
  if (models.length === 0) {
    for (const modelName of ['deepseek-chat', 'deepseek-reasoner']) {
      if (!text.toLowerCase().includes(modelName)) continue;
      const idx = text.toLowerCase().indexOf(modelName);
      const section = text.slice(idx, idx + 500);
      const prices = [...section.matchAll(/\$([0-9.]+)/g)].map(m => parseFloat(m[1]));

      if (prices.length >= 2) {
        prices.sort((a, b) => a - b);
        const cacheHit = prices.length >= 3 ? prices[0] : null;
        const input = prices.length >= 3 ? prices[1] : prices[0];
        const output = prices[prices.length - 1];

        models.push({
          provider: 'deepseek',
          id: `deepseek/${modelName}`,
          name: modelName,
          input_price_per_1m: round(input),
          output_price_per_1m: round(output),
          cached_input_price_per_1m: cacheHit ? round(cacheHit) : null,
          context_length: 128000,
          supports_vision: false,
          supports_function_calling: true,
          supports_streaming: true,
          source: 'official',
        });
      }
    }
  }

  log(`DeepSeek: ${models.length} models scraped`);
  return models;
}
