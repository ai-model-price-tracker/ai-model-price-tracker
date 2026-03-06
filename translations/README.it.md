# Tracker dei Prezzi dei Modelli AI

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Tracker giornaliero automatizzato per i prezzi dei modelli AI di tutti i principali fornitori. Raccoglie prezzi, capacità e informazioni API tramite GitHub Actions e li visualizza attraverso una dashboard su GitHub Pages.

**[Dashboard Live](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Dati Raccolti

| Campo | Descrizione |
|-------|-------------|
| Prezzo di Input | Costo per 1M di token di input (USD) |
| Prezzo di Output | Costo per 1M di token di output (USD) |
| Prezzo di Input in Cache | Costo scontato per 1M di token di input in cache |
| Lunghezza del Contesto | Dimensione massima della finestra di contesto |
| Visione | Supporto per input di immagini |
| Chiamata di Funzioni (Tools) | Supporto per l'uso di strumenti |

## Avvertenza

> **Questo progetto è solo a scopo informativo.** I dati sui prezzi vengono raccolti da aggregatori di terze parti, non direttamente dall'API ufficiale di ciascun fornitore di IA. Sebbene ci impegniamo per la precisione, **i prezzi mostrati qui potrebbero essere obsoleti, incompleti o errati**. Verificare sempre i prezzi sulla pagina ufficiale dei prezzi di ciascun fornitore prima di prendere decisioni di acquisto. Questo progetto non è affiliato ad alcun fornitore di IA.

## Fonti dei Dati

I dati vengono raccolti da due fonti aggregatrici di terze parti. Il campo `source` di ogni modello indica la sua origine. **Nessun fornitore di IA offre un'API pubblica per i prezzi**, quindi tutti i dati sui prezzi nell'ecosistema (inclusi questi aggregatori) derivano in ultima analisi dalla lettura manuale della documentazione ufficiale.

### 1. OpenRouter API (Primaria)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Ruolo**: Prezzi dei modelli in tempo reale e metadati sulle capacità (Vision, Tools, Lunghezza del Contesto, ecc.)
- **Accuratezza dei prezzi**: OpenRouter trasmette i prezzi ufficiali dei fornitori senza alcun ricarico (prezzi pass-through)
- **Licenza**: Soggetto ai Termini di Servizio di OpenRouter ([ToS](https://openrouter.ai/terms))
- **Nota**: API pubblica, ma i ToS non permettono esplicitamente la ridistribuzione dei dati. Questo progetto attribuisce la fonte e utilizza i dati per scopi informativi non commerciali.

### 2. pydantic/genai-prices (Secondaria)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Ruolo**: Prezzi diretti dei fornitori, prezzi della cache (lettura/scrittura), supplementi di prezzi a livelli
- **Accuratezza dei prezzi**: Mantenuto manualmente dalla documentazione ufficiale con tracciamento delle variazioni di prezzo e rilevamento delle discrepanze
- **Licenza**: **Licenza MIT** - libero da usare, modificare e ridistribuire ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Mantenuto da**: Team [Pydantic](https://github.com/pydantic)

### Perché Non Fare Scraping Direttamente dalle Pagine Ufficiali?
- La maggior parte dei fornitori di IA **non offre un endpoint pubblico per l'API dei prezzi**
- Il web scraping delle pagine ufficiali dei prezzi è fragile (la struttura HTML cambia frequentemente) e potrebbe violare i Termini di Servizio di ciascun fornitore
- Le due fonti aggregatrici sopra indicate sono le fonti programmatiche più affidabili disponibili nell'ecosistema
- Per i prezzi ufficiali, fare sempre riferimento alle pagine ufficiali dei prezzi elencate di seguito

### Accuratezza e Limitazioni
- Entrambe le fonti sono **in ultima analisi derivate dalla documentazione ufficiale dei fornitori**, ma attraverso terze parti
- I prezzi potrebbero essere **obsoleti** - i fornitori possono modificare i prezzi in qualsiasi momento senza preavviso
- Alcuni modelli potrebbero avere **metadati incompleti** (es.: prezzi della cache mancanti, flag delle capacità errati)
- **Limiti del livello gratuito, limiti di frequenza e sconti per volume** generalmente non vengono registrati
- Trovato un errore? Per favore [apri una issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) o [invia una PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Fornitori Tracciati e Pagine Ufficiali dei Prezzi

| Fornitore | URL Ufficiale dei Prezzi |
|-----------|--------------------------|
| OpenAI | https://platform.openai.com/docs/pricing |
| Anthropic (Claude) | https://docs.anthropic.com/en/docs/about-claude/models |
| Google (Gemini) | https://ai.google.dev/gemini-api/docs/pricing |
| Google (Vertex AI) | https://cloud.google.com/vertex-ai/generative-ai/pricing |
| DeepSeek | https://api-docs.deepseek.com/quick_start/pricing |
| Mistral | https://mistral.ai/pricing |
| Cohere | https://cohere.com/pricing |
| Perplexity | https://docs.perplexity.ai/guides/pricing |
| Groq | https://groq.com/pricing |
| Together AI | https://www.together.ai/pricing |
| xAI (Grok) | https://docs.x.ai/docs/models |
| Amazon Bedrock | https://aws.amazon.com/bedrock/pricing/ |
| Azure OpenAI | https://azure.microsoft.com/en-us/pricing/details/azure-openai/ |
| Qwen (Alibaba) | https://help.aliyun.com/zh/model-studio/getting-started/models |
| NVIDIA | https://build.nvidia.com/ |
| AI21 Labs | https://www.ai21.com/pricing |

> Oltre ai fornitori elencati sopra, più di 70 altri vengono raccolti automaticamente tramite OpenRouter e genai-prices.

## Uso Locale

Richiede solo Node.js 20+. Zero dipendenze esterne.

```bash
# Eseguire la raccolta dei prezzi
node scripts/collect-prices.mjs

# Oppure usare lo script npm
npm run collect
```

File di output:
- `outputs/YYYY-MM-DD.json` - Snapshot giornaliero
- `outputs/latest.json` - Dati più recenti
- `docs/latest.json` - Per la dashboard di GitHub Pages

## Schema JSON di Output

```json
{
  "updated_at": "2026-03-07T06:00:00.000Z",
  "sources": ["openrouter", "genai-prices"],
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
          "source": "openrouter"
        }
      ]
    }
  ],
  "summary": {
    "total_providers": 77,
    "total_models": 1317,
    "cheapest_model": { "..." },
    "most_expensive_model": { "..." },
    "average_input_price_per_1m": 1.99,
    "average_output_price_per_1m": 6.68
  }
}
```

## GitHub Actions

- **Pianificazione**: Esegue giornalmente alle 06:00 UTC
- **Trigger manuale**: Disponibile tramite `workflow_dispatch` nella scheda Actions
- I dati raccolti vengono automaticamente committati e pushati

## Self-Hosting (Configurazione Fork)

1. Eseguire il fork di questo repository
2. **Settings > Pages > Source**: Selezionare `Deploy from a branch`, Branch: `main`, Cartella: `/docs`
3. **Settings > Actions > General**: Abilitare `Read and write permissions`
4. Verificare che il workflow sia abilitato nella scheda Actions

## Contribuire

Trovato errori nei prezzi, modelli mancanti o vuoi suggerire un nuovo fornitore? Accogliamo con piacere i contributi:

- **[Apri una Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Segnalazioni di bug, richieste di funzionalità
- **[Invia una Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Correzioni e miglioramenti diretti

Contributi particolarmente graditi:
- Correzioni dei dati sui prezzi
- Aggiunta di fornitori/modelli AI mancanti
- Miglioramenti dell'interfaccia della dashboard
- Suggerimenti per nuove fonti di dati

## Licenza

MIT
