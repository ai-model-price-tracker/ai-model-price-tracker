import { log, round, extractTables } from './utils.mjs';

export const name = 'Anthropic';
export const url = 'https://docs.anthropic.com/en/docs/about-claude/models';

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  const models = [];
  const tables = await extractTables(page);

  for (const table of tables) {
    if (table.length < 2) continue;
    const headers = table[0];

    let pricingRow = null;
    let idRow = null;
    let contextRow = null;
    let cacheRow = null;
    for (const row of table) {
      if (!row[0]) continue;
      const label = row[0].toLowerCase();
      if (label.includes('pricing')) pricingRow = row;
      if (label.includes('claude api id') || label.includes('api id')) idRow = row;
      if (label.includes('context window')) contextRow = row;
      if (label.includes('cach')) cacheRow = row;
    }

    if (!pricingRow || !idRow) continue;

    for (let i = 1; i < headers.length; i++) {
      const name = headers[i];
      const apiId = idRow[i];
      const priceText = pricingRow[i] || '';
      const contextText = contextRow?.[i] || '';

      const inputMatch = priceText.match(/\$([0-9.]+)\s*\/?\s*input\s*MTok/i);
      const outputMatch = priceText.match(/\$([0-9.]+)\s*\/?\s*output\s*MTok/i);
      const contextMatch = contextText.match(/([\d,]+)K?\s*tokens/i);

      // Try to find cache read price from pricing text or dedicated cache row
      const cacheText = cacheRow?.[i] || priceText;
      const cacheReadMatch = cacheText.match(/cache[d]?\s*read[:\s]*\$([0-9.]+)\s*\/?\s*MTok/i)
        || cacheText.match(/\$([0-9.]+)\s*\/?\s*cache[d]?\s*read\s*MTok/i)
        || cacheText.match(/read[:\s]*\$([0-9.]+)/i);

      if (inputMatch && outputMatch) {
        const contextLen = contextMatch
          ? parseInt(contextMatch[1].replace(/,/g, '')) * (contextText.includes('K') || parseInt(contextMatch[1]) < 1000 ? 1000 : 1)
          : null;
        const cachedPrice = cacheReadMatch ? round(parseFloat(cacheReadMatch[1])) : null;

        models.push({
          provider: 'anthropic',
          id: `anthropic/${apiId || name.toLowerCase().replace(/\s+/g, '-')}`,
          name,
          input_price_per_1m: round(parseFloat(inputMatch[1])),
          output_price_per_1m: round(parseFloat(outputMatch[1])),
          cached_input_price_per_1m: cachedPrice,
          context_length: contextLen,
          supports_vision: true,
          supports_function_calling: true,
          supports_streaming: true,
          source: 'official',
        });
      }
    }
  }

  log(`Anthropic: ${models.length} models scraped`);
  return models;
}
