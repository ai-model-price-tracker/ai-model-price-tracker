import { log, round } from './utils.mjs';

export const name = 'Google Gemini';
export const url = 'https://ai.google.dev/gemini-api/docs/pricing';

export async function scrape(page) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  const models = [];

  // Strategy: get all H2 headings and all tables in order,
  // then pair each Gemini/Gemma heading with the next table
  const elements = await page.$$eval('h2, table', els => {
    const results = [];
    for (const el of els) {
      if (el.tagName === 'H2') {
        results.push({ type: 'heading', text: el.textContent.trim() });
      } else if (el.tagName === 'TABLE') {
        const rows = [];
        for (const tr of el.querySelectorAll('tr')) {
          const cells = [];
          for (const td of tr.querySelectorAll('th, td')) {
            cells.push(td.textContent.trim());
          }
          rows.push(cells);
        }
        results.push({ type: 'table', rows });
      }
    }
    return results;
  });

  // Pair headings with their following table
  let currentHeading = null;
  for (const el of elements) {
    if (el.type === 'heading') {
      currentHeading = el.text;
    } else if (el.type === 'table' && currentHeading) {
      // Only process Gemini/Gemma model headings
      if (!currentHeading.includes('Gemini') && !currentHeading.includes('Gemma')) {
        currentHeading = null;
        continue;
      }
      // Skip non-model sections
      if (/^Pricing for|Imagen|Veo/i.test(currentHeading)) {
        currentHeading = null;
        continue;
      }

      let inputPrice = null;
      let outputPrice = null;
      let cachedPrice = null;

      for (const row of el.rows) {
        const label = (row[0] || '').toLowerCase();
        const paidCell = row[row.length - 1] || '';

        if (label.includes('input price') && !label.includes('cach')) {
          const match = paidCell.match(/\$([0-9.]+)/);
          if (match) inputPrice = parseFloat(match[1]);
        }
        if (label.includes('output price')) {
          const match = paidCell.match(/\$([0-9.]+)/);
          if (match) outputPrice = parseFloat(match[1]);
        }
        if (label.includes('cach') && label.includes('price')) {
          const match = paidCell.match(/\$([0-9.]+)/);
          if (match) cachedPrice = parseFloat(match[1]);
        }
      }

      if (inputPrice != null && outputPrice != null) {
        const id = currentHeading.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.-]/g, '');

        models.push({
          provider: 'google',
          id: `google/${id}`,
          name: currentHeading,
          input_price_per_1m: round(inputPrice),
          output_price_per_1m: round(outputPrice),
          cached_input_price_per_1m: cachedPrice != null ? round(cachedPrice) : null,
          context_length: null,
          supports_vision: true,
          supports_function_calling: !currentHeading.toLowerCase().includes('embedding'),
          supports_streaming: true,
          source: 'official',
        });
      }

      currentHeading = null; // Reset after pairing
    }
  }

  log(`Google Gemini: ${models.length} models scraped`);
  return models;
}
