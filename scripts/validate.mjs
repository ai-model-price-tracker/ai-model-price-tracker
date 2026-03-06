import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const cwd = process.cwd();
const latestPath = resolve(cwd, 'outputs', 'latest.json');

if (!existsSync(latestPath)) {
  console.error('outputs/latest.json not found');
  process.exit(1);
}

const data = JSON.parse(readFileSync(latestPath, 'utf-8'));
const errors = [];
const warnings = [];

// Structure checks
if (!data.updated_at) errors.push('Missing updated_at');
if (!Array.isArray(data.sources) || data.sources.length === 0) errors.push('Missing or empty sources');
if (!Array.isArray(data.providers)) errors.push('providers is not an array');
if (!data.summary) errors.push('Missing summary');

if (data.providers) {
  if (data.providers.length < 3) errors.push(`Only ${data.providers.length} providers (expected 3+)`);

  const totalModels = data.providers.reduce((sum, p) => sum + p.models.length, 0);
  if (totalModels < 10) errors.push(`Only ${totalModels} models (expected 10+)`);

  // Check key providers exist
  const slugs = new Set(data.providers.map(p => p.provider));
  for (const required of ['openai', 'anthropic']) {
    if (!slugs.has(required)) warnings.push(`Missing key provider: ${required}`);
  }

  // Check for NaN/null in summary
  if (data.summary) {
    for (const key of ['average_input_price_per_1m', 'average_output_price_per_1m']) {
      const v = data.summary[key];
      if (v == null || typeof v !== 'number' || isNaN(v)) {
        errors.push(`summary.${key} is invalid: ${v}`);
      }
    }
    if (!data.summary.cheapest_model) warnings.push('No cheapest model in summary');
    if (!data.summary.most_expensive_model) warnings.push('No most expensive model in summary');
  }

  // Spot-check: at least some models have valid prices
  let pricedCount = 0;
  for (const p of data.providers) {
    for (const m of p.models) {
      if (m.input_price_per_1m > 0) pricedCount++;
    }
  }
  if (pricedCount < 5) errors.push(`Only ${pricedCount} models with valid prices (expected 5+)`);

  // Check for data quality issues
  for (const p of data.providers) {
    for (const m of p.models) {
      if (m.input_price_per_1m != null && isNaN(m.input_price_per_1m)) {
        errors.push(`NaN price found: ${m.id} input_price_per_1m`);
      }
      if (m.output_price_per_1m != null && isNaN(m.output_price_per_1m)) {
        errors.push(`NaN price found: ${m.id} output_price_per_1m`);
      }
    }
  }
}

// Report
if (warnings.length > 0) {
  console.log('Warnings:');
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length > 0) {
  console.error('Validation FAILED:');
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

const s = data.summary;
console.log('Validation PASSED');
console.log(`  ${s.total_providers} providers, ${s.total_models} models`);
console.log(`  Sources: ${data.sources.join(', ')}`);
console.log(`  Avg input: $${s.average_input_price_per_1m}/1M, Avg output: $${s.average_output_price_per_1m}/1M`);
