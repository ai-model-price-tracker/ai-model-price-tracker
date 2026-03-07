<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Tracker giornaliero automatizzato dei prezzi dei modelli AI di oltre 100 fornitori.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Dashboard Live »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Segnala un Prezzo Errato</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Richiedi un Fornitore</a>
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

> **Avvertenza:** Questo progetto è solo a scopo informativo. I dati sui prezzi vengono raccolti da aggregatori di terze parti e pagine ufficiali tramite scraping automatizzato. Sebbene ci impegniamo per la precisione, **i prezzi potrebbero essere obsoleti, incompleti o errati**. Verificare sempre sulla pagina ufficiale dei prezzi di ciascun fornitore prima di prendere decisioni. Questo progetto non è affiliato ad alcun fornitore di IA.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Funzionalità

- **Oltre 3.000 modelli** da **oltre 100 fornitori** monitorati quotidianamente
- **4 fonti dati** — 3 API della community + scraping delle pagine ufficiali tramite Playwright
- **Verifica dei prezzi ufficiali** — scraping diretto da OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI senza configurazione** — esecuzione in container Playwright Docker, nessuna chiave API necessaria
- **API JSON gratuita** — utilizza `latest.json` da GitHub Pages nei tuoi progetti
- **Dashboard interattiva** — cerca, filtra, ordina, confronta i prezzi con supporto i18n (18 lingue)
- **Resilienza ai guasti** — degradazione graduale, dati precedenti preservati, creazione automatica di issue in caso di errore

## Utilizzo dei Dati

I dati sui prezzi più recenti sono disponibili gratuitamente in formato JSON — nessuna installazione richiesta:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Find all OpenAI models
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

## Per gli LLM

Puoi dare a un LLM accesso ai dati sui prezzi dei modelli AI in tempo reale aggiungendo questo al tuo prompt di sistema:

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

## Come Funziona

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

## Fonti dei Dati

| # | Fonte | Tipo | Modelli | Licenza |
|---|-------|------|---------|---------|
| 1 | Pagine ufficiali (Playwright) | Web scraping | 200+ | N/D |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Priorità di unione:** I prezzi estratti dalle pagine ufficiali sovrascrivono i prezzi degli aggregatori. OpenRouter è la fonte primaria per i dati API, genai-prices e LiteLLM arricchiscono i prezzi della cache e i metadati sulle capacità.

### Scraper delle pagine ufficiali

Ogni scraper è un file separato sotto [`scripts/scrapers/`](scripts/scrapers/) per facilitare la manutenzione:

| File | Fornitore | Stato |
|------|-----------|-------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**Aggiungere un nuovo scraper:** Crea un nuovo file in `scripts/scrapers/` che esporti `name`, `url` e `scrape(page)`, poi importalo in [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Accuratezza e limitazioni

- Tutte le fonti sono **in ultima analisi derivate dalla documentazione ufficiale**, direttamente o tramite terze parti
- I prezzi potrebbero essere **obsoleti** — i fornitori possono modificare i prezzi in qualsiasi momento senza preavviso
- Alcuni modelli potrebbero avere **metadati incompleti** (prezzi della cache mancanti, flag delle capacità errati)
- **Limiti del livello gratuito, limiti di frequenza e sconti per volume** generalmente non vengono registrati
- Lo scraping ufficiale potrebbe interrompersi quando i fornitori riprogettano le loro pagine dei prezzi

Trovato un errore? Per favore [apri una issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) o [invia una PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Glossario

| Termine | Descrizione |
|---------|-------------|
| **Token** | L'unita base utilizzata dai modelli di IA per elaborare il testo. 1 token ≈ 3/4 di una parola. I prezzi sono per 1 milione di token. |
| **Token di input** | Testo/dati inviati al modello (prompt, contesto, istruzioni). |
| **Token di output** | Testo generato dal modello in risposta. Generalmente piu costoso dell'input. |
| **Finestra di contesto** | Max token che un modello puo elaborare in una conversazione (input + output combinati). |
| **Input in cache** | Prezzo scontato quando si riutilizza lo stesso prefisso di prompt tra le richieste. |
| **Prezzi batch** | Prezzi ridotti per richieste di massa non urgenti elaborate in modo asincrono. |
| **Chiamata a funzioni** | Capacita del modello di chiamare strumenti esterni o API durante la generazione. |
| **Visione** | Capacita del modello di elaborare e comprendere immagini in input. |

## Dati Raccolti

| Campo | Descrizione |
|-------|-------------|
| `input_price_per_1m` | Costo per 1M di token di input (USD) |
| `output_price_per_1m` | Costo per 1M di token di output (USD) |
| `cached_input_price_per_1m` | Costo scontato per 1M di token di input in cache |
| `context_length` | Dimensione massima della finestra di contesto (in token) |
| `supports_vision` | Se il modello puo elaborare immagini in input |
| `supports_function_calling` | Se il modello puo chiamare strumenti/funzioni esterne |
| `source` | Fonte dei dati (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Fornitori Monitorati

| Fornitore | Prezzi Ufficiali |
|-----------|-----------------|
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

Oltre a **100+ fornitori aggiuntivi** raccolti automaticamente tramite OpenRouter, genai-prices e LiteLLM.

## GitHub Actions

| Funzionalità | Dettagli |
|--------------|----------|
| **Pianificazione** | Giornaliera alle 06:00 UTC |
| **Trigger manuale** | `workflow_dispatch` nella scheda Actions |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **In caso di errore** | Creazione automatica di GitHub Issue (etichetta `collection-failure`) |
| **Sicurezza dei dati** | Dati precedenti preservati se tutte le fonti falliscono |

## Self-Hosting

1. Esegui il **Fork** di questo repository
2. **Settings > Pages** — Sorgente: `Deploy from a branch`, Branch: `main`, Cartella: `/docs`
3. **Settings > Actions > General** — Abilita `Read and write permissions`
4. Verifica che il workflow sia abilitato nella scheda **Actions**
5. (Opzionale) Avvia manualmente tramite **Actions > Collect AI Model Prices > Run workflow**

### Esecuzione in locale

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Scraping delle pagine ufficiali dei prezzi
npm run collect     # Raccolta dalle API + unione dei dati estratti
npm run validate    # Validazione dell'output
```

Output: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Contribuire

I contributi sono benvenuti! Ecco come puoi aiutare:

- **Correzioni dei prezzi** — Trovato un prezzo errato? [Apri una issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) o invia una PR
- **Nuovi scraper** — Aggiungi uno scraper per un fornitore non ancora coperto ([come aggiungere](#scraper-delle-pagine-ufficiali))
- **Nuove fonti dati** — Conosci un altro aggregatore di prezzi? Faccelo sapere
- **Miglioramenti della dashboard** — Miglioramenti dell'interfaccia, nuove visualizzazioni, correzioni di accessibilità
- **Fornitori mancanti** — Richiedi o aggiungi supporto per nuovi fornitori di IA

Consulta le [issue aperte](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) per un elenco delle attività note.

## Licenza

Il **codice sorgente** di questo progetto è distribuito sotto la Licenza MIT. Consulta [`LICENSE`](LICENSE) per maggiori informazioni.

> **Avviso sui dati:** I dati sui prezzi (file JSON) sono aggregati da fonti di terze parti tra cui [OpenRouter](https://openrouter.ai/terms) e le pagine ufficiali dei fornitori. Ogni fonte è soggetta ai propri termini di servizio. **I dati raccolti non possono essere utilizzati per scopi commerciali** senza verificare e rispettare in modo indipendente i termini di ciascuna fonte originale. Consulta [`LICENSE`](LICENSE) per i dettagli.

---

<p align="center">
  Realizzato con GitHub Actions · Nessuna chiave API necessaria · Aggiornato quotidianamente
</p>
