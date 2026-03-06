# KI-Modell-Preistracker

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Automatisierter täglicher Tracker für KI-Modellpreise bei allen großen Anbietern. Sammelt Preise, Funktionen und API-Informationen über GitHub Actions und visualisiert sie über ein GitHub Pages-Dashboard.

**[Live-Dashboard](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Erfasste Daten

| Feld | Beschreibung |
|------|-------------|
| Eingabepreis | Kosten pro 1M Eingabe-Token (USD) |
| Ausgabepreis | Kosten pro 1M Ausgabe-Token (USD) |
| Zwischengespeicherter Eingabepreis | Ermäßigte Kosten pro 1M zwischengespeicherter Eingabe-Token |
| Kontextlänge | Maximale Kontextfenstergröße |
| Vision | Bildeingabe-Unterstützung |
| Funktionsaufrufe (Tools) | Tool-Nutzungs-Unterstützung |

## Haftungsausschluss

> **Dieses Projekt dient nur zu Informationszwecken.** Preisdaten werden von Drittanbieter-Aggregatoren gesammelt, nicht direkt von der offiziellen API jedes KI-Anbieters. Obwohl wir uns um Genauigkeit bemühen, **können die hier angezeigten Preise veraltet, unvollständig oder fehlerhaft sein**. Überprüfen Sie die Preise immer auf der offiziellen Preisseite des jeweiligen Anbieters, bevor Sie Kaufentscheidungen treffen. Dieses Projekt ist mit keinem KI-Anbieter verbunden.

## Datenquellen

Daten werden aus zwei Drittanbieter-Aggregator-Quellen gesammelt. Das Feld `source` jedes Modells gibt seinen Ursprung an. **Kein KI-Anbieter bietet eine öffentliche Preis-API an**, daher stammen alle Preisdaten im Ökosystem (einschließlich dieser Aggregatoren) letztlich aus dem manuellen Lesen offizieller Dokumentation.

### 1. OpenRouter API (Primär)

- **Endpunkt**: `GET https://openrouter.ai/api/v1/models`
- **Rolle**: Echtzeit-Modellpreise und Fähigkeits-Metadaten (Vision, Tools, Kontextlänge usw.)
- **Preisgenauigkeit**: OpenRouter gibt die offiziellen Anbieterpreise ohne Aufschlag weiter (Pass-Through-Preisgestaltung)
- **Lizenz**: Unterliegt den OpenRouter-Nutzungsbedingungen ([ToS](https://openrouter.ai/terms))
- **Hinweis**: Öffentliche API, aber die Nutzungsbedingungen erlauben die Weiterverbreitung von Daten nicht ausdrücklich. Dieses Projekt benennt die Quelle und verwendet die Daten für nicht-kommerzielle Informationszwecke.

### 2. pydantic/genai-prices (Sekundär)

- **Endpunkt**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Rolle**: Direkte Anbieterpreise, Cache-Preise (Lesen/Schreiben), gestaffelte Preisergänzungen
- **Preisgenauigkeit**: Manuell aus offizieller Dokumentation gepflegt, mit Preisverfolgung und Abweichungserkennung
- **Lizenz**: **MIT-Lizenz** - frei nutzbar, modifizierbar und weiterverteilbar ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Gepflegt von**: [Pydantic](https://github.com/pydantic)-Team

### Warum nicht offizielle Seiten direkt scrapen?
- Die meisten KI-Anbieter bieten **keine öffentliche Preis-API** an
- Web-Scraping offizieller Preisseiten ist fragil (HTML-Strukturen ändern sich häufig) und kann gegen die Nutzungsbedingungen der jeweiligen Anbieter verstoßen
- Die beiden oben genannten Aggregator-Quellen sind die zuverlässigsten programmatischen Quellen im Ökosystem
- Für verbindliche Preisinformationen beziehen Sie sich immer auf die unten aufgeführten offiziellen Preisseiten

### Genauigkeit & Einschränkungen
- Beide Quellen sind **letztlich aus der offiziellen Anbieterdokumentation abgeleitet**, jedoch über Drittanbieter
- Preise können **veraltet** sein – Anbieter können Preise jederzeit ohne Vorankündigung ändern
- Einige Modelle haben möglicherweise **unvollständige Metadaten** (z. B. fehlende Cache-Preise, falsche Fähigkeitsangaben)
- **Kostenlose Kontingente, Ratenbegrenzungen und Mengenrabatte** werden in der Regel nicht erfasst
- Einen Fehler gefunden? Bitte [erstellen Sie ein Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) oder [reichen Sie einen PR ein](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Verfolgte Anbieter & Offizielle Preisseiten

| Anbieter | Offizielle Preis-URL |
|----------|---------------------|
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

> Zusätzlich zu den oben aufgeführten Anbietern werden über 70 weitere automatisch über OpenRouter und genai-prices erfasst.

## Lokale Nutzung

Erfordert nur Node.js 20+. Keine externen Abhängigkeiten.

```bash
# Preiserfassung ausführen
node scripts/collect-prices.mjs

# Oder npm-Skript verwenden
npm run collect
```

Ausgabedateien:
- `outputs/YYYY-MM-DD.json` - Tägliche Momentaufnahme
- `outputs/latest.json` - Neueste Daten
- `docs/latest.json` - Für das GitHub Pages-Dashboard

## Ausgabe-JSON-Schema

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

- **Zeitplan**: Läuft täglich um 06:00 UTC
- **Manueller Trigger**: Verfügbar über `workflow_dispatch` im Actions-Tab
- Gesammelte Daten werden automatisch committet und gepusht

## Selbst-Hosting (Fork-Einrichtung)

1. Forken Sie dieses Repository
2. **Settings > Pages > Source**: Wählen Sie `Deploy from a branch`, Branch: `main`, Ordner: `/docs`
3. **Settings > Actions > General**: Aktivieren Sie `Read and write permissions`
4. Überprüfen Sie, ob der Workflow im Actions-Tab aktiviert ist

## Mitwirken

Preisfehler gefunden, fehlende Modelle oder möchten Sie einen neuen Anbieter vorschlagen? Wir freuen uns über Beiträge:

- **[Issue erstellen](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Fehlerberichte, Feature-Anfragen
- **[Pull Request einreichen](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Direkte Korrekturen und Verbesserungen

Besonders willkommene Beiträge:
- Korrekturen von Preisdaten
- Ergänzung fehlender KI-Anbieter/Modelle
- Verbesserungen der Dashboard-Benutzeroberfläche
- Vorschläge für neue Datenquellen

## Lizenz

MIT
