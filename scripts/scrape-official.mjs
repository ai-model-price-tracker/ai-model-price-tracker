import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';

// Import per-service scrapers
import * as anthropic from './scrapers/anthropic.mjs';
import * as openai from './scrapers/openai.mjs';
import * as deepseek from './scrapers/deepseek.mjs';
import * as googleGemini from './scrapers/google-gemini.mjs';
import * as mistral from './scrapers/mistral.mjs';
import * as xai from './scrapers/xai.mjs';
import * as awsBedrock from './scrapers/aws-bedrock.mjs';

function log(msg) { console.log(`[${new Date().toISOString()}] ${msg}`); }

const SCRAPERS = [anthropic, openai, deepseek, googleGemini, mistral, xai, awsBedrock];

async function main() {
  log('Starting official pricing page scraping...');
  log(`Scrapers: ${SCRAPERS.map(s => s.name).join(', ')}`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    log(`[ERROR] Failed to launch browser: ${err.message}`);
    log('Playwright not installed? Run: npx playwright install chromium');
    writeResult([]);
    process.exit(0); // Don't fail the pipeline
  }

  const allModels = [];
  const results = { succeeded: [], failed: [] };

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  });

  for (const scraper of SCRAPERS) {
    try {
      const page = await context.newPage();
      const models = await scraper.scrape(page);
      allModels.push(...models);
      results.succeeded.push(`${scraper.name} (${models.length} models)`);
      await page.close();
    } catch (err) {
      log(`[WARN] ${scraper.name} scraping failed: ${err.message}`);
      results.failed.push(scraper.name);
    }
  }

  await browser.close();

  writeResult(allModels);

  log('─── Scraping Summary ───');
  log(`Total: ${allModels.length} models from ${results.succeeded.length} providers`);
  if (results.succeeded.length > 0) log(`Succeeded: ${results.succeeded.join(', ')}`);
  if (results.failed.length > 0) log(`Failed: ${results.failed.join(', ')}`);
}

function writeResult(models) {
  const cwd = process.cwd();
  const outputDir = resolve(cwd, 'outputs');
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'official-prices.json');
  writeFileSync(outputPath, JSON.stringify({
    scraped_at: new Date().toISOString(),
    total: models.length,
    models,
  }, null, 2));
  log(`Written: ${outputPath}`);
}

main();
