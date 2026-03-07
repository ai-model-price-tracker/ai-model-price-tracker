import { log, round, extractTables } from './utils.mjs';

export const name = 'xAI';
export const url = 'https://docs.x.ai/docs/models';

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(5000);

  const models = [];
  const tables = await extractTables(page);

  for (const table of tables) {
    const headers = table[0]?.map(h => h.toLowerCase()) || [];
    const nameCol = headers.findIndex(h => h.includes('model'));
    const inputCol = headers.findIndex(h => h.includes('input'));
    const outputCol = headers.findIndex(h => h.includes('output'));

    if (nameCol < 0 || (inputCol < 0 && outputCol < 0)) continue;

    for (let i = 1; i < table.length; i++) {
      const row = table[i];
      const modelName = row[nameCol];
      if (!modelName) continue;

      const inputPrice = inputCol >= 0 ? row[inputCol]?.match(/\$?([0-9.]+)/) : null;
      const outputPrice = outputCol >= 0 ? row[outputCol]?.match(/\$?([0-9.]+)/) : null;

      if (inputPrice && outputPrice) {
        models.push({
          provider: 'xai',
          id: `x-ai/${modelName.toLowerCase().replace(/\s+/g, '-')}`,
          name: modelName,
          input_price_per_1m: round(parseFloat(inputPrice[1])),
          output_price_per_1m: round(parseFloat(outputPrice[1])),
          cached_input_price_per_1m: null,
          context_length: null,
          supports_vision: modelName.toLowerCase().includes('vision'),
          supports_function_calling: true,
          supports_streaming: true,
          source: 'official',
        });
      }
    }
  }

  log(`xAI: ${models.length} models scraped`);
  return models;
}
