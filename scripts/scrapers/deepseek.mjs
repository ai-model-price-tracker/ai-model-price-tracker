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
    if (table.length < 2) continue;
    const headerRow = table[0];

    // Find model names from header row (e.g. "deepseek-chat", "deepseek-reasoner")
    const modelCols = [];
    for (let i = 1; i < headerRow.length; i++) {
      const match = headerRow[i].match(/(deepseek[-\w]*)/i);
      if (match) modelCols.push({ col: i, name: match[1] });
    }
    if (modelCols.length === 0) continue;

    // Collect pricing from rows
    let cacheHitPrices = {};
    let cacheMissPrices = {};
    let outputPrices = {};

    for (const row of table) {
      // Pricing rows may span columns — check label across all cells
      const rowText = row.join(' ').toLowerCase();
      const priceMatch = row.join(' ').match(/\$([0-9.]+)/);
      if (!priceMatch) continue;
      const price = parseFloat(priceMatch[1]);

      for (const mc of modelCols) {
        if (rowText.includes('cache hit')) cacheHitPrices[mc.name] = price;
        else if (rowText.includes('cache miss')) cacheMissPrices[mc.name] = price;
        else if (rowText.includes('input') && !rowText.includes('cache')) cacheMissPrices[mc.name] = price;
        if (rowText.includes('output')) outputPrices[mc.name] = price;
      }
    }

    for (const mc of modelCols) {
      const input = cacheMissPrices[mc.name];
      const output = outputPrices[mc.name];
      if (input == null || output == null) continue;
      if (models.some(m => m.name === mc.name)) continue;
      models.push({
        provider: 'deepseek',
        id: `deepseek/${mc.name.toLowerCase()}`,
        name: mc.name,
        input_price_per_1m: round(input),
        output_price_per_1m: round(output),
        cached_input_price_per_1m: cacheHitPrices[mc.name] != null ? round(cacheHitPrices[mc.name]) : null,
        context_length: 128000,
        supports_vision: false,
        supports_function_calling: true,
        supports_streaming: true,
        source: 'official',
      });
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
