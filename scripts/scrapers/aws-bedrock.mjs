import { log, round, extractTables, parsePrice } from './utils.mjs';

export const name = 'AWS Bedrock';
export const url = 'https://aws.amazon.com/bedrock/pricing/';

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(5000);

  const models = [];
  const tables = await extractTables(page);

  for (const table of tables) {
    const headers = table[0]?.map(h => h.toLowerCase()) || [];

    // Bedrock pricing tables typically have columns like:
    // Model | Price per 1,000 input tokens | Price per 1,000 output tokens
    const modelCol = headers.findIndex(h => h.includes('model'));
    const inputCol = headers.findIndex(h => h.includes('input'));
    const outputCol = headers.findIndex(h => h.includes('output'));

    if (modelCol < 0 || inputCol < 0 || outputCol < 0) continue;

    for (let i = 1; i < table.length; i++) {
      const row = table[i];
      const modelName = row[modelCol]?.trim();
      if (!modelName) continue;

      const inputText = row[inputCol] || '';
      const outputText = row[outputCol] || '';
      const inputPrice = parsePrice(inputText);
      const outputPrice = parsePrice(outputText);

      if (inputPrice == null || outputPrice == null) continue;
      if (inputPrice === 0 && outputPrice === 0) continue;

      // Bedrock prices are often per 1,000 tokens, convert to per 1M
      const multiplier = (headers[inputCol] || '').includes('1,000') ? 1000 : 1;

      models.push({
        provider: 'amazon',
        id: `amazon/${modelName.toLowerCase().replace(/[\s/]+/g, '-').replace(/[()]/g, '')}`,
        name: modelName,
        input_price_per_1m: round(inputPrice * multiplier),
        output_price_per_1m: round(outputPrice * multiplier),
        cached_input_price_per_1m: null,
        context_length: null,
        supports_vision: false,
        supports_function_calling: false,
        supports_streaming: true,
        source: 'official',
      });
    }
  }

  log(`AWS Bedrock: ${models.length} models scraped`);
  return models;
}
