import { log, round, extractTables, parsePrice } from './utils.mjs';

export const name = 'OpenAI';
export const url = 'https://platform.openai.com/docs/pricing';

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(5000);

  const models = [];
  const tables = await extractTables(page);

  // OpenAI pricing page has tables with columns: Model | Input | Cached input | Output
  // First table (index 0) is the main "per 1M tokens" pricing
  for (const table of tables) {
    const headers = table[0]?.map(h => h.toLowerCase()) || [];
    const modelCol = headers.findIndex(h => h.includes('model'));
    const inputCol = headers.findIndex(h => h.includes('input') && !h.includes('cached'));
    const cachedCol = headers.findIndex(h => h.includes('cached'));
    const outputCol = headers.findIndex(h => h.includes('output'));

    if (modelCol < 0 || inputCol < 0 || outputCol < 0) continue;

    // Skip tables that have "Training" column (fine-tuning tables)
    if (headers.some(h => h.includes('training'))) continue;
    // Skip non-text model tables (image, audio, video, tools)
    if (headers.some(h => h.includes('resolution') || h.includes('per second'))) continue;

    for (let i = 1; i < table.length; i++) {
      const row = table[i];
      let modelName = (row[modelCol] || '').trim();
      if (!modelName) continue;

      // Skip realtime/image/audio models
      if (/realtime|image|audio|tts|whisper|sora/i.test(modelName)) continue;

      const inputPrice = parsePrice(row[inputCol]);
      const outputPrice = parsePrice(row[outputCol]);
      const cachedPrice = cachedCol >= 0 ? parsePrice(row[cachedCol]) : null;

      if (inputPrice == null || outputPrice == null) continue;

      // Clean up model name: "gpt-5.4 (<272K context length)" → "gpt-5.4"
      const cleanName = modelName.replace(/\s*\(.*?\)\s*/g, '').replace(/with data sharing/i, '').trim();
      if (!cleanName) continue;

      // Skip duplicates (some models appear in multiple tables with different tiers)
      if (models.some(m => m.name === cleanName)) continue;

      models.push({
        provider: 'openai',
        id: `openai/${cleanName}`,
        name: cleanName,
        input_price_per_1m: round(inputPrice),
        output_price_per_1m: round(outputPrice),
        cached_input_price_per_1m: cachedPrice != null ? round(cachedPrice) : null,
        context_length: null,
        supports_vision: true,
        supports_function_calling: true,
        supports_streaming: true,
        source: 'official',
      });
    }
  }

  log(`OpenAI: ${models.length} models scraped`);
  return models;
}
