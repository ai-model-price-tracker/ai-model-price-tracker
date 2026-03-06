export function log(msg) { console.log(`[${new Date().toISOString()}] ${msg}`); }
export function round(n) { return Math.round(n * 1_000_000) / 1_000_000; }

/**
 * Extract all tables from a Playwright page as arrays of row arrays.
 */
export async function extractTables(page) {
  return page.$$eval('table', tables => tables.map(t => {
    const rows = [];
    for (const tr of t.querySelectorAll('tr')) {
      const cells = [];
      for (const td of tr.querySelectorAll('th, td')) {
        cells.push(td.textContent.trim());
      }
      rows.push(cells);
    }
    return rows;
  }));
}

/**
 * Parse a price string like "$2.50" → 2.5, or "2.50" → 2.5
 */
export function parsePrice(str) {
  if (!str) return null;
  const m = str.match(/\$?([0-9.]+)/);
  return m ? parseFloat(m[1]) : null;
}
