<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Geautomatiseerde dagelijkse tracker voor AI-modelprijzen bij 100+ aanbieders.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Live Dashboard »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Onjuiste Prijs Melden</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Aanbieder Aanvragen</a>
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

> **Disclaimer:** Dit project is uitsluitend bedoeld voor informatieve doeleinden. Prijsgegevens worden verzameld van externe aggregators en officiële pagina's via geautomatiseerde scraping. Hoewel we streven naar nauwkeurigheid, **kunnen prijzen verouderd, onvolledig of onjuist zijn**. Verifieer altijd op de officiële prijspagina van elke aanbieder voordat u beslissingen neemt. Dit project is niet gelieerd aan enige AI-aanbieder.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Functies

- **3.000+ modellen** van **100+ aanbieders** dagelijks gevolgd
- **4 gegevensbronnen** — 3 community-API's + scraping van officiële pagina's via Playwright
- **Officiële prijsverificatie** — scrapt rechtstreeks OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **Zero-config CI** — draait in Playwright Docker-container, geen API-sleutels nodig
- **Gratis JSON API** — gebruik `latest.json` van GitHub Pages in uw eigen projecten
- **Interactief dashboard** — zoeken, filteren, sorteren, prijzen vergelijken met i18n-ondersteuning (18 talen)
- **Foutbestendigheid** — graceful degradation, eerdere gegevens bewaard, automatische issue bij fout

## Gegevens Gebruiken

De laatste prijsgegevens zijn gratis beschikbaar als JSON — geen installatie vereist:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Zoek alle OpenAI-modellen
const openai = data.providers.find(p => p.provider === 'openai');
console.log(openai.models.map(m => `${m.name}: $${m.input_price_per_1m}/1M input`));
```

```python
import requests
data = requests.get('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json').json()
for p in data['providers']:
    for m in p['models']:
        if m['input_price_per_1m'] and m['input_price_per_1m'] < 1:
            print(f"{m['name']}: ${m['input_price_per_1m']}/1M input")
```

## Voor LLM's

U kunt een LLM toegang geven tot realtime AI-modelprijsgegevens door dit aan uw system prompt toe te voegen:

```
You have access to AI model pricing data via the following JSON API:
https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json

The JSON structure is:
- providers[]: array of providers, each with display_name and models[]
- models[]: id, name, input_price_per_1m (USD), output_price_per_1m (USD),
  cached_input_price_per_1m, context_length, supports_vision, supports_function_calling, source
- summary: total_providers, total_models, cheapest_model, most_expensive_model,
  average_input_price_per_1m, average_output_price_per_1m

Use this data to answer questions about AI model pricing, compare costs, and recommend models.
```

## Hoe Het Werkt

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

## Gegevensbronnen

| # | Bron | Type | Modellen | Licentie |
|---|------|------|----------|----------|
| 1 | Officiële pagina's (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Samenvoegprioriteit:** Officieel gescrapete prijzen overschrijven aggregatorprijzen. OpenRouter is primair voor API-gegevens, genai-prices en LiteLLM verrijken cacheprijzen en metadata over mogelijkheden.

### Officiële pagina-scrapers
Elke scraper is een apart bestand onder [`scripts/scrapers/`](scripts/scrapers/) voor eenvoudig onderhoud:

| Bestand | Aanbieder | Status |
|---------|-----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | Werkend |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | Werkend |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | Werkend |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | Werkend |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | Werkend |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — fallback naar API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — fallback naar API |

**Een nieuwe scraper toevoegen:** Maak een nieuw bestand in `scripts/scrapers/` dat `name`, `url` en `scrape(page)` exporteert, en importeer het vervolgens in [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Nauwkeurigheid & beperkingen
- Alle bronnen zijn **uiteindelijk afgeleid van officiële documentatie**, direct of via derden
- Prijzen kunnen **verouderd zijn** — aanbieders kunnen prijzen op elk moment zonder kennisgeving wijzigen
- Sommige modellen kunnen **onvolledige metadata** hebben (ontbrekende cacheprijzen, onjuiste mogelijkheidsvlaggen)
- **Gratis-tierlimieten, snelheidslimieten en volumekortingen** worden over het algemeen niet vastgelegd
- Officiële scraping kan falen wanneer aanbieders hun prijspagina's herontwerpen

Een fout gevonden? [Open een issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) of [dien een PR in](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Verzamelde Gegevens

| Veld | Beschrijving |
|------|-------------|
| `input_price_per_1m` | Kosten per 1M invoertokens (USD) |
| `output_price_per_1m` | Kosten per 1M uitvoertokens (USD) |
| `cached_input_price_per_1m` | Gereduceerde kosten per 1M gecachte invoertokens |
| `context_length` | Maximale contextvenstergrootte |
| `supports_vision` | Ondersteuning voor beeldinvoer |
| `supports_function_calling` | Ondersteuning voor toolgebruik |
| `source` | Gegevensbron (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Gevolgde Aanbieders

### 16 grote aanbieders met officiële prijs-URL's
| Aanbieder | Officiële Prijspagina |
|-----------|----------------------|
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

Plus **100+ extra aanbieders** automatisch verzameld via OpenRouter, genai-prices en LiteLLM.

## GitHub Actions

| Functie | Details |
|---------|---------|
| **Planning** | Dagelijks om 06:00 UTC |
| **Handmatige trigger** | `workflow_dispatch` in het tabblad Actions |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **Bij fout** | Maakt automatisch een GitHub Issue aan (label `collection-failure`) |
| **Gegevensbeveiliging** | Eerdere gegevens bewaard als alle bronnen falen |

## Zelf Hosten

1. **Fork** deze repository
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General** — Schakel `Read and write permissions` in
4. Controleer of de workflow is ingeschakeld in het tabblad **Actions**
5. (Optioneel) Start handmatig via **Actions > Collect AI Model Prices > Run workflow**

### Lokaal uitvoeren
```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Scrape officiële prijspagina's
npm run collect     # Verzamel van API's + voeg gescrapete gegevens samen
npm run validate    # Valideer uitvoer
```

Uitvoer: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Bijdragen

Bijdragen zijn welkom! Zo kunt u helpen:

- **Prijscorrecties** — Onjuiste prijs gevonden? [Open een issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) of dien een PR in
- **Nieuwe scrapers** — Voeg een scraper toe voor een nog niet gedekte aanbieder ([hoe toe te voegen](#officiële-pagina-scrapers))
- **Nieuwe gegevensbronnen** — Kent u een andere prijsaggregator? Laat het ons weten
- **Dashboardverbeteringen** — UI-verbeteringen, nieuwe visualisaties, toegankelijkheidsoplossingen
- **Ontbrekende aanbieders** — Vraag ondersteuning aan of voeg deze toe voor nieuwe AI-aanbieders

Zie [openstaande issues](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) voor een lijst met bekende taken.

## Licentie

De **broncode** van dit project wordt gedistribueerd onder de MIT-licentie. Zie [`LICENSE`](LICENSE) voor meer informatie.

> **Gegevensverklaring:** De prijsgegevens (JSON-bestanden) zijn samengesteld uit externe bronnen waaronder [OpenRouter](https://openrouter.ai/terms) en officiële aanbiederpagina's. Elke bron is onderworpen aan zijn eigen servicevoorwaarden. **De verzamelde gegevens mogen niet worden gebruikt voor commerciële doeleinden** zonder onafhankelijk te verifiëren en te voldoen aan de voorwaarden van elke oorspronkelijke bron. Zie [`LICENSE`](LICENSE) voor details.

---

<p align="center">
  Gemaakt met GitHub Actions · Geen API-sleutels nodig · Dagelijks bijgewerkt
</p>
