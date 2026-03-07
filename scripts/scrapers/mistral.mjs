import { log, round, extractTables } from './utils.mjs';

export const name = 'Mistral';
export const url = 'https://mistral.ai/pricing';

const MODEL_PATTERNS = [
  /Mistral\s+Large/i, /Mistral\s+Small/i, /Mistral\s+Medium/i,
  /Codestral/i, /Pixtral\s+Large/i, /Pixtral/i,
  /Ministral\s+8B/i, /Ministral\s+3B/i, /Mistral\s+Nemo/i,
];

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(5000);

  const text = await page.textContent('body');
  const models = [];

  // Try table extraction (SPA renders tables after JS)
  const tables = await extractTables(page);

  for (const table of tables) {
    for (const row of table) {
      const rowText = row.join(' ');
      for (const pattern of MODEL_PATTERNS) {
        const match = rowText.match(pattern);
        if (!match) continue;

        const modelName = match[0];
        const prices = [...rowText.matchAll(/\$([0-9.]+)/g)].map(m => parseFloat(m[1]));
        if (prices.length >= 2 && !models.some(m => m.name === modelName)) {
          models.push({
            provider: 'mistral',
            id: `mistralai/${modelName.toLowerCase().replace(/\s+/g, '-')}`,
            name: modelName,
            input_price_per_1m: round(prices[0]),
            output_price_per_1m: round(prices[1]),
            cached_input_price_per_1m: null,
            context_length: null,
            supports_vision: modelName.toLowerCase().includes('pixtral'),
            supports_function_calling: true,
            supports_streaming: true,
            source: 'official',
          });
        }
      }
    }
  }

  // Fallback: text parsing
  if (models.length === 0) {
    for (const pattern of MODEL_PATTERNS) {
      const match = text.match(pattern);
      if (!match) continue;
      const modelName = match[0];
      const idx = text.indexOf(modelName);
      const section = text.slice(idx, idx + 300);
      const prices = [...section.matchAll(/\$([0-9.]+)/g)].map(m => parseFloat(m[1]));
      if (prices.length >= 2 && !models.some(m => m.name === modelName)) {
        models.push({
          provider: 'mistral',
          id: `mistralai/${modelName.toLowerCase().replace(/\s+/g, '-')}`,
          name: modelName,
          input_price_per_1m: round(prices[0]),
          output_price_per_1m: round(prices[1]),
          cached_input_price_per_1m: null,
          context_length: null,
          supports_vision: modelName.toLowerCase().includes('pixtral'),
          supports_function_calling: true,
          supports_streaming: true,
          source: 'official',
        });
      }
    }
  }

  log(`Mistral: ${models.length} models scraped`);
  return models;
}
