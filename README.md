<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Automated daily tracker for AI model pricing across 100+ providers.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Live Dashboard »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Report Incorrect Price</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Request Provider</a>
  </p>
</p>

<p align="center">
  <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml"><img src="https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg" alt="Collect AI Model Prices"></a>
  <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><img src="https://img.shields.io/website?url=https%3A%2F%2Fai-model-price-tracker.github.io%2Fai-model-price-tracker%2F&label=dashboard" alt="Dashboard"></a>
  <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ai-model-price-tracker/ai-model-price-tracker" alt="License"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" alt="Node.js 20+">
  <img src="https://img.shields.io/badge/dependencies-1%20(playwright)-blue" alt="Dependencies">
  <br>
  <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/stargazers"><img src="https://img.shields.io/github/stars/ai-model-price-tracker/ai-model-price-tracker" alt="Stars"></a>
  <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues"><img src="https://img.shields.io/github/issues/ai-model-price-tracker/ai-model-price-tracker" alt="Issues"></a>
  <img src="https://img.shields.io/github/last-commit/ai-model-price-tracker/ai-model-price-tracker" alt="Last Commit">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fai-model-price-tracker.github.io%2Fai-model-price-tracker%2Flatest.json&query=%24.summary.total_models&label=models%20tracked&color=brightgreen" alt="Models Tracked">
</p>

> **Disclaimer:** This project is for informational purposes only. Pricing data is collected from third-party aggregators and official pages via automated scraping. While we strive for accuracy, **prices may be outdated, incomplete, or incorrect**. Always verify on each provider's official pricing page before making decisions. This project is not affiliated with any AI provider.

<details>
<summary><strong>Translations</strong></summary>

[한국어](translations/README.ko.md) | [日本語](translations/README.ja.md) | [中文(简体)](translations/README.zh-CN.md) | [中文(繁體)](translations/README.zh-TW.md) | [Español](translations/README.es.md) | [Français](translations/README.fr.md) | [Deutsch](translations/README.de.md) | [Português](translations/README.pt.md) | [Русский](translations/README.ru.md) | [العربية](translations/README.ar.md) | [हिन्दी](translations/README.hi.md) | [Italiano](translations/README.it.md) | [Türkçe](translations/README.tr.md) | [Tiếng Việt](translations/README.vi.md) | [ไทย](translations/README.th.md) | [Bahasa Indonesia](translations/README.id.md) | [Nederlands](translations/README.nl.md) | [Polski](translations/README.pl.md)

</details>

---

## Features

- **3,000+ models** from **100+ providers** tracked daily
- **4 data sources** — 3 community APIs + official page scraping via Playwright
- **Official price verification** — scrapes OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock directly
- **Zero-config CI** — runs in Playwright Docker container, no API keys needed
- **Free JSON API** — consume `latest.json` from GitHub Pages in your own projects
- **Interactive dashboard** — search, filter, sort, compare prices with i18n support (18 languages)
- **Failure resilience** — graceful degradation, previous data preserved, auto-issue on failure

## Quick Start

```bash
# Clone and install
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

# Run the full pipeline
npm run scrape      # Scrape official pricing pages
npm run collect     # Collect from APIs + merge scraped data
npm run validate    # Validate output

# Or just the API sources (no Playwright needed)
node scripts/collect-prices.mjs
```

Output files:
| File | Description |
|------|-------------|
| `outputs/YYYY-MM-DD.json` | Daily snapshot |
| `outputs/latest.json` | Latest data |
| `docs/latest.json` | Served via GitHub Pages |

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                   GitHub Actions (Daily)                 │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Playwright  │  │  3 API       │  │                │  │
│  │  Scraping    │──│  Sources     │──│  Merge + Validate │
│  │  (Official)  │  │  (Community) │  │                │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
│         │                │                  │           │
│         ▼                ▼                  ▼           │
│  official-prices.json    ┌──────────┐    latest.json    │
│                          │  Merge   │    YYYY-MM-DD.json│
│                          │ Priority:│    docs/latest.json│
│                          │ Official │                   │
│                          │ > OpenRouter                 │
│                          │ > genai-prices               │
│                          │ > LiteLLM │                  │
│                          └──────────┘                   │
└─────────────────────────────────────────────────────────┘
```

## Data Sources

| # | Source | Type | Models | License |
|---|--------|------|--------|---------|
| 1 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 2 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 3 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |
| 4 | Official pages (Playwright) | Web scraping | 200+ | N/A |

**Merge priority:** Official scraped prices override aggregator prices. OpenRouter is primary for API data, genai-prices and LiteLLM enrich cache pricing and capability metadata.

<details>
<summary><strong>Official page scrapers</strong></summary>

Each scraper is a separate file under [`scripts/scrapers/`](scripts/scrapers/) for easy maintenance:

| File | Provider | Status |
|------|----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | Working |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | Working |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | Working |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | Working |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | Working |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — fallback to API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — fallback to API |

**Adding a new scraper:** Create a new file in `scripts/scrapers/` exporting `name`, `url`, and `scrape(page)`, then import it in [`scrape-official.mjs`](scripts/scrape-official.mjs).

</details>

<details>
<summary><strong>Accuracy & limitations</strong></summary>

- All sources are **ultimately derived from official documentation**, directly or through third parties
- Prices may be **outdated** — providers can change prices at any time without notice
- Some models may have **incomplete metadata** (missing cache pricing, incorrect capability flags)
- **Free-tier limits, rate limits, and volume discounts** are generally not captured
- Official scraping may break when providers redesign their pricing pages

Found an error? Please [open an issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) or [submit a PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

</details>

## Collected Data

| Field | Description |
|-------|-------------|
| `input_price_per_1m` | Cost per 1M input tokens (USD) |
| `output_price_per_1m` | Cost per 1M output tokens (USD) |
| `cached_input_price_per_1m` | Discounted cost per 1M cached input tokens |
| `context_length` | Maximum context window size |
| `supports_vision` | Image input support |
| `supports_function_calling` | Tool use support |
| `source` | Data source (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Using the Data (JSON API)

The latest data is freely available via GitHub Pages:

```bash
curl https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Find all OpenAI models
const openai = data.providers.find(p => p.provider === 'openai');
console.log(openai.models.map(m => `${m.name}: $${m.input_price_per_1m}/1M input`));

// Find cheapest model
console.log(data.summary.cheapest_model);
```

```python
import requests
data = requests.get('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json').json()
for p in data['providers']:
    for m in p['models']:
        if m['input_price_per_1m'] and m['input_price_per_1m'] < 1:
            print(f"{m['name']}: ${m['input_price_per_1m']}/1M input")
```

<details>
<summary><strong>Output JSON schema</strong></summary>

```json
{
  "updated_at": "2026-03-07T06:00:00.000Z",
  "sources": ["openrouter", "genai-prices", "litellm", "official"],
  "providers": [
    {
      "provider": "openai",
      "display_name": "OpenAI",
      "official_pricing_url": "https://platform.openai.com/docs/pricing",
      "models": [
        {
          "id": "openai/gpt-4o",
          "name": "GPT-4o",
          "input_price_per_1m": 2.5,
          "output_price_per_1m": 10,
          "cached_input_price_per_1m": 1.25,
          "context_length": 128000,
          "supports_vision": true,
          "supports_function_calling": true,
          "supports_streaming": true,
          "source": "official"
        }
      ]
    }
  ],
  "summary": {
    "total_providers": 116,
    "total_models": 3176,
    "cheapest_model": { "..." },
    "most_expensive_model": { "..." },
    "average_input_price_per_1m": 1.99,
    "average_output_price_per_1m": 6.68
  }
}
```

</details>

## Tracked Providers

<details>
<summary><strong>16 major providers with official pricing URLs</strong></summary>

| Provider | Official Pricing |
|----------|-----------------|
| OpenAI | [platform.openai.com/docs/pricing](https://platform.openai.com/docs/pricing) |
| Anthropic | [docs.anthropic.com/en/docs/about-claude/models](https://docs.anthropic.com/en/docs/about-claude/models) |
| Google Gemini | [ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| Google Vertex AI | [cloud.google.com/vertex-ai/generative-ai/pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) |
| DeepSeek | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing) |
| Mistral | [mistral.ai/pricing](https://mistral.ai/pricing) |
| Cohere | [cohere.com/pricing](https://cohere.com/pricing) |
| Perplexity | [docs.perplexity.ai/guides/pricing](https://docs.perplexity.ai/guides/pricing) |
| Groq | [groq.com/pricing](https://groq.com/pricing) |
| Together AI | [together.ai/pricing](https://www.together.ai/pricing) |
| xAI (Grok) | [docs.x.ai/docs/models](https://docs.x.ai/docs/models) |
| Amazon Bedrock | [aws.amazon.com/bedrock/pricing](https://aws.amazon.com/bedrock/pricing/) |
| Azure OpenAI | [azure.microsoft.com/pricing/details/azure-openai](https://azure.microsoft.com/en-us/pricing/details/azure-openai/) |
| Qwen (Alibaba) | [help.aliyun.com/model-studio](https://help.aliyun.com/zh/model-studio/getting-started/models) |
| NVIDIA | [build.nvidia.com](https://build.nvidia.com/) |
| AI21 Labs | [ai21.com/pricing](https://www.ai21.com/pricing) |

Plus **100+ additional providers** automatically collected via OpenRouter, genai-prices, and LiteLLM.

</details>

## GitHub Actions

| Feature | Details |
|---------|---------|
| **Schedule** | Daily at 06:00 UTC |
| **Manual trigger** | `workflow_dispatch` in Actions tab |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **On failure** | Auto-creates GitHub Issue (`collection-failure` label) |
| **Data safety** | Previous data preserved if all sources fail |

## Self-Hosting

1. **Fork** this repository
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General** — Enable `Read and write permissions`
4. Verify the workflow is enabled in the **Actions** tab
5. (Optional) Trigger manually via **Actions > Collect AI Model Prices > Run workflow**

## Contributing

Contributions are welcome! Here's how you can help:

- **Pricing corrections** — Found a wrong price? [Open an issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) or submit a PR
- **New scrapers** — Add a scraper for a provider not yet covered ([how to add](#official-page-scrapers))
- **New data sources** — Know of another pricing aggregator? Let us know
- **Dashboard improvements** — UI enhancements, new visualizations, accessibility fixes
- **Missing providers** — Request or add support for new AI providers

See [open issues](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) for a list of known tasks.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<p align="center">
  Made with GitHub Actions · No API keys required · Updated daily
</p>
