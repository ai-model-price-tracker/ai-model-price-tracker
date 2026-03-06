# AI Model Prijstracker

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Geautomatiseerde dagelijkse tracker voor AI-modelprijzen bij alle grote aanbieders. Verzamelt prijzen, mogelijkheden en API-informatie via GitHub Actions en visualiseert dit via een GitHub Pages-dashboard.

**[Live Dashboard](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Verzamelde Gegevens

| Veld | Beschrijving |
|------|-------------|
| Invoerprijs | Kosten per 1M invoertokens (USD) |
| Uitvoerprijs | Kosten per 1M uitvoertokens (USD) |
| Gecachte Invoerprijs | Gereduceerde kosten per 1M gecachte invoertokens |
| Contextlengte | Maximale contextvenstergrootte |
| Visie | Ondersteuning voor beeldinvoer |
| Functieaanroepen (Tools) | Ondersteuning voor toolgebruik |

## Disclaimer

> **Dit project is uitsluitend bedoeld voor informatieve doeleinden.** Prijsgegevens worden verzameld van externe aggregators, niet rechtstreeks van de officiële API van elke AI-aanbieder. Hoewel we streven naar nauwkeurigheid, **kunnen de hier getoonde prijzen verouderd, onvolledig of onjuist zijn**. Verifieer prijzen altijd op de officiële prijspagina van elke aanbieder voordat u aankoopbeslissingen neemt. Dit project is niet gelieerd aan enige AI-aanbieder.

## Gegevensbronnen

Gegevens worden verzameld uit twee externe aggregatorbronnen. Het `source`-veld van elk model geeft de herkomst aan. **Geen enkele AI-aanbieder biedt een openbare prijs-API aan**, dus alle prijsgegevens in het ecosysteem (inclusief deze aggregators) zijn uiteindelijk afkomstig van het handmatig lezen van officiële documentatie.

### 1. OpenRouter API (Primair)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Rol**: Realtime modelprijzen en metadata over mogelijkheden (Visie, Tools, Contextlengte, enz.)
- **Prijsnauwkeurigheid**: OpenRouter geeft officiële aanbiedersprijzen door zonder opslag (doorgeefprijzen)
- **Licentie**: Onderworpen aan de Servicevoorwaarden van OpenRouter ([ToS](https://openrouter.ai/terms))
- **Opmerking**: Openbare API, maar de Servicevoorwaarden staan gegevensherdistributie niet expliciet toe. Dit project vermeldt de bron en gebruikt gegevens voor niet-commerciële informatieve doeleinden.

### 2. pydantic/genai-prices (Secundair)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Rol**: Directe aanbiedersprijzen, cacheprijzen (lezen/schrijven), aanvullingen voor gestaffelde prijzen
- **Prijsnauwkeurigheid**: Handmatig onderhouden vanuit officiële documentatie met prijswijzigingsregistratie en afwijkingsdetectie
- **Licentie**: **MIT-licentie** - vrij te gebruiken, wijzigen en herdistribueren ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Onderhouden door**: [Pydantic](https://github.com/pydantic)-team

### Waarom Niet Rechtstreeks van Officiële Pagina's Scrapen?
- De meeste AI-aanbieders bieden **geen** openbaar prijs-API-endpoint aan
- Het scrapen van officiële prijspagina's is fragiel (HTML-structuur verandert vaak) en kan in strijd zijn met de Servicevoorwaarden van elke aanbieder
- De twee bovengenoemde aggregatorbronnen zijn de meest betrouwbare programmatische bronnen die beschikbaar zijn in het ecosysteem
- Raadpleeg voor gezaghebbende prijzen altijd de hieronder vermelde officiële prijspagina's

### Nauwkeurigheid & Beperkingen
- Beide bronnen zijn **uiteindelijk afgeleid van officiële aanbiederdocumentatie**, maar via derden
- Prijzen kunnen **verouderd zijn** - aanbieders kunnen prijzen op elk moment zonder kennisgeving wijzigen
- Sommige modellen kunnen **onvolledige metadata** hebben (bijv. ontbrekende cacheprijzen, onjuiste mogelijkheidsvlaggen)
- **Gratis-tierlimieten, snelheidslimieten en volumekortingen** worden over het algemeen niet vastgelegd
- Een fout gevonden? [Open een issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) of [dien een PR in](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Gevolgde Aanbieders & Officiële Prijspagina's

| Aanbieder | Officiële Prijs-URL |
|-----------|---------------------|
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

> Naast de hierboven vermelde aanbieders worden er automatisch 70+ extra aanbieders verzameld via OpenRouter en genai-prices.

## Lokaal Gebruik

Vereist alleen Node.js 20+. Geen externe afhankelijkheden.

```bash
# Prijsverzameling uitvoeren
node scripts/collect-prices.mjs

# Of gebruik het npm-script
npm run collect
```

Uitvoerbestanden:
- `outputs/YYYY-MM-DD.json` - Dagelijkse momentopname
- `outputs/latest.json` - Meest recente gegevens
- `docs/latest.json` - Voor het GitHub Pages-dashboard

## Uitvoer JSON-schema

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

- **Planning**: Draait dagelijks om 06:00 UTC
- **Handmatige trigger**: Beschikbaar via `workflow_dispatch` in het tabblad Actions
- Verzamelde gegevens worden automatisch gecommit en gepusht

## Zelf Hosten (Fork-instelling)

1. Fork deze repository
2. **Settings > Pages > Source**: Selecteer `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: Schakel `Read and write permissions` in
4. Controleer of de workflow is ingeschakeld in het tabblad Actions

## Bijdragen

Prijsfouten gevonden, ontbrekende modellen, of wilt u een nieuwe aanbieder voorstellen? Bijdragen zijn welkom:

- **[Open een Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Bugrapporten, functieverzoeken
- **[Dien een Pull Request in](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Directe fixes en verbeteringen

Bijdragen die we bijzonder verwelkomen:
- Correcties van prijsgegevens
- Toevoegingen van ontbrekende AI-aanbieders/modellen
- Verbeteringen aan de dashboard-UI
- Suggesties voor nieuwe gegevensbronnen

## Licentie

MIT
