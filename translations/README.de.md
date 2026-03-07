<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Automatisierter täglicher Tracker für KI-Modellpreise bei über 100 Anbietern.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Live-Dashboard »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Falschen Preis melden</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Anbieter anfragen</a>
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

> **Haftungsausschluss:** Dieses Projekt dient ausschließlich Informationszwecken. Preisdaten werden von Drittanbieter-Aggregatoren und offiziellen Seiten mittels automatisiertem Scraping gesammelt. Obwohl wir uns um Genauigkeit bemühen, **können Preise veraltet, unvollständig oder fehlerhaft sein**. Überprüfen Sie die Preise immer auf der offiziellen Preisseite des jeweiligen Anbieters, bevor Sie Entscheidungen treffen. Dieses Projekt ist mit keinem KI-Anbieter verbunden.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Funktionen

- **Über 3.000 Modelle** von **über 100 Anbietern** werden täglich erfasst
- **4 Datenquellen** — 3 Community-APIs + offizielles Seiten-Scraping via Playwright
- **Offizielle Preisverifizierung** — scrapt OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock direkt
- **Konfigurationsfreie CI** — läuft im Playwright-Docker-Container, keine API-Schlüssel erforderlich
- **Kostenlose JSON-API** — nutzen Sie `latest.json` von GitHub Pages in Ihren eigenen Projekten
- **Interaktives Dashboard** — suchen, filtern, sortieren, Preise vergleichen mit i18n-Unterstützung (18 Sprachen)
- **Ausfallresistenz** — graceful Degradation, vorherige Daten bleiben erhalten, automatisches Issue bei Fehler

## Daten verwenden

Die aktuellen Preisdaten sind frei als JSON verfügbar — keine Installation erforderlich:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Alle OpenAI-Modelle finden
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

## Für LLMs

Sie können einem LLM Zugang zu Echtzeit-KI-Modellpreisen geben, indem Sie Folgendes zu Ihrem System-Prompt hinzufügen:

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

## Funktionsweise

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

## Datenquellen

| # | Quelle | Typ | Modelle | Lizenz |
|---|--------|-----|---------|--------|
| 1 | Offizielle Seiten (Playwright) | Web-Scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Zusammenführungspriorität:** Offiziell gescrapte Preise überschreiben Aggregator-Preise. OpenRouter ist die Hauptquelle für API-Daten, genai-prices und LiteLLM ergänzen Cache-Preise und Fähigkeitsmetadaten.

### Offizielle Seiten-Scraper

Jeder Scraper ist eine separate Datei unter [`scripts/scrapers/`](scripts/scrapers/) zur einfachen Wartung:

| Datei | Anbieter | Status |
|-------|----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**Neuen Scraper hinzufügen:** Erstellen Sie eine neue Datei in `scripts/scrapers/`, die `name`, `url` und `scrape(page)` exportiert, und importieren Sie sie in [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Genauigkeit & Einschränkungen

- Alle Quellen sind **letztlich aus der offiziellen Dokumentation abgeleitet**, direkt oder über Dritte
- Preise können **veraltet** sein — Anbieter können Preise jederzeit ohne Vorankündigung ändern
- Einige Modelle haben möglicherweise **unvollständige Metadaten** (fehlende Cache-Preise, falsche Fähigkeitsangaben)
- **Kostenlose Kontingente, Ratenbegrenzungen und Mengenrabatte** werden in der Regel nicht erfasst
- Offizielles Scraping kann fehlschlagen, wenn Anbieter ihre Preisseiten neu gestalten

Einen Fehler gefunden? Bitte [erstellen Sie ein Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) oder [reichen Sie einen PR ein](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Glossar

| Begriff | Beschreibung |
|---------|-------------|
| **Token** | Die Grundeinheit, mit der KI-Modelle Text verarbeiten. 1 Token ≈ 3/4 eines Wortes. Preise werden pro 1 Million Tokens angezeigt. |
| **Eingabe-Tokens** | Text/Daten, die Sie an das Modell senden (Prompt, Kontext, Anweisungen). |
| **Ausgabe-Tokens** | Vom Modell generierter Antworttext. In der Regel teurer als Eingabe. |
| **Kontextfenster** | Max Tokens, die ein Modell in einer Konversation verarbeiten kann (Eingabe + Ausgabe kombiniert). |
| **Gecachte Eingabe** | Ermassigter Preis bei Wiederverwendung desselben Prompt-Prafixes. |
| **Batch-Preise** | Ermasstigte Preise fur nicht dringende Massenanfragen, die asynchron verarbeitet werden. |
| **Funktionsaufruf** | Die Fahigkeit des Modells, wahrend der Generierung externe Tools oder APIs aufzurufen. |
| **Vision** | Die Fahigkeit des Modells, Bildeingaben zu verarbeiten und zu verstehen. |

## Erfasste Daten

| Feld | Beschreibung |
|------|-------------|
| `input_price_per_1m` | Kosten pro 1M Eingabe-Token (USD) |
| `output_price_per_1m` | Kosten pro 1M Ausgabe-Token (USD) |
| `cached_input_price_per_1m` | Ermäßigte Kosten pro 1M zwischengespeicherter Eingabe-Token |
| `context_length` | Maximale Kontextfenstergröße (in Tokens) |
| `supports_vision` | Ob das Modell Bildeingaben verarbeiten kann |
| `supports_function_calling` | Ob das Modell externe Tools/Funktionen aufrufen kann |
| `source` | Datenquelle (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Verfolgte Anbieter

| Provider | Models | Official Pricing |
|----------|--------|-----------------|
| Amazon Bedrock | 455 | [aws.amazon.com/bedrock/pricing](https://aws.amazon.com/bedrock/pricing/) |
| OpenAI | 295 | [platform.openai.com/docs/pricing](https://platform.openai.com/docs/pricing) |
| Fireworks AI | 244 | [fireworks.ai/pricing](https://fireworks.ai/pricing) |
| Azure OpenAI | 137 | [azure.microsoft.com/en-us/pricing/details/azure-openai](https://azure.microsoft.com/en-us/pricing/details/azure-openai/) |
| Google | 126 | [ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| Mistral | 109 | [mistral.ai/pricing](https://mistral.ai/pricing) |
| Together AI | 104 | [www.together.ai/pricing](https://www.together.ai/pricing) |
| Anthropic | 85 | [docs.anthropic.com/en/docs/about-claude/models](https://docs.anthropic.com/en/docs/about-claude/models) |
| DeepInfra | 67 | [deepinfra.com/pricing](https://deepinfra.com/pricing) |
| Qwen (Alibaba) | 54 | [help.aliyun.com/zh/model-studio/getting-started/models](https://help.aliyun.com/zh/model-studio/getting-started/models) |
| xAI (Grok) | 52 | [docs.x.ai/docs/models](https://docs.x.ai/docs/models) |
| Groq | 40 | [groq.com/pricing](https://groq.com/pricing) |
| Replicate | 40 | [replicate.com/pricing](https://replicate.com/pricing) |
| Perplexity | 38 | [docs.perplexity.ai/guides/pricing](https://docs.perplexity.ai/guides/pricing) |
| DeepSeek | 27 | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing) |
| Cohere | 17 | [cohere.com/pricing](https://cohere.com/pricing) |
| Meta (Llama) | 17 | [llama.meta.com](https://llama.meta.com/) |
| SambaNova | 16 | [sambanova.ai](https://sambanova.ai/) |
| AI21 Labs | 15 | [www.ai21.com/pricing](https://www.ai21.com/pricing) |
| Cerebras | 11 | [cerebras.ai/pricing](https://cerebras.ai/pricing) |
| NVIDIA | 8 | [build.nvidia.com](https://build.nvidia.com/) |

Plus **über 100 weitere Anbieter**, die automatisch über OpenRouter, genai-prices und LiteLLM erfasst werden.

## GitHub Actions

| Funktion | Details |
|----------|---------|
| **Zeitplan** | Täglich um 06:00 UTC |
| **Manueller Trigger** | `workflow_dispatch` im Actions-Tab |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **Bei Fehler** | Erstellt automatisch ein GitHub Issue (Label `collection-failure`) |
| **Datensicherheit** | Vorherige Daten bleiben erhalten, wenn alle Quellen fehlschlagen |

## Selbst-Hosting

1. **Forken** Sie dieses Repository
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Ordner: `/docs`
3. **Settings > Actions > General** — `Read and write permissions` aktivieren
4. Überprüfen Sie, ob der Workflow im **Actions**-Tab aktiviert ist
5. (Optional) Manuell auslösen über **Actions > Collect AI Model Prices > Run workflow**

### Lokal ausführen

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Offizielle Preisseiten scrapen
npm run collect     # Von APIs sammeln + gescrapte Daten zusammenführen
npm run validate    # Ausgabe validieren
```

Ausgabe: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Mitwirken

Beiträge sind willkommen! So können Sie helfen:

- **Preiskorrekturen** — Falschen Preis gefunden? [Erstellen Sie ein Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) oder reichen Sie einen PR ein
- **Neue Scraper** — Fügen Sie einen Scraper für einen noch nicht abgedeckten Anbieter hinzu ([So fügen Sie einen hinzu](#offizielle-seiten-scraper))
- **Neue Datenquellen** — Kennen Sie einen weiteren Preisaggregator? Lassen Sie es uns wissen
- **Dashboard-Verbesserungen** — UI-Verbesserungen, neue Visualisierungen, Barrierefreiheit
- **Fehlende Anbieter** — Anfrage oder Unterstützung für neue KI-Anbieter hinzufügen

Siehe [offene Issues](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) für eine Liste bekannter Aufgaben.

## Lizenz

Der **Quellcode** dieses Projekts wird unter der MIT-Lizenz verteilt. Siehe [`LICENSE`](LICENSE) für weitere Informationen.

> **Datenhinweis:** Die Preisdaten (JSON-Dateien) werden aus Drittquellen aggregiert, darunter [OpenRouter](https://openrouter.ai/terms) und offizielle Anbieterseiten. Jede Quelle unterliegt ihren eigenen Nutzungsbedingungen. **Die gesammelten Daten dürfen nicht für kommerzielle Zwecke verwendet werden**, ohne die Bedingungen jeder Originalquelle unabhängig zu überprüfen und einzuhalten. Siehe [`LICENSE`](LICENSE) für Details.

---

<p align="center">
  Erstellt mit GitHub Actions · Keine API-Schlüssel erforderlich · Täglich aktualisiert
</p>
