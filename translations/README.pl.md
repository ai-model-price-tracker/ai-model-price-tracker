# Tracker Cen Modeli AI

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Automatyczny codzienny tracker cen modeli AI u wszystkich głównych dostawców. Zbiera informacje o cenach, możliwościach i API za pomocą GitHub Actions i wizualizuje je na dashboardzie GitHub Pages.

**[Dashboard na żywo](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Zbierane dane

| Pole | Opis |
|------|------|
| Cena wejściowa | Koszt za 1M tokenów wejściowych (USD) |
| Cena wyjściowa | Koszt za 1M tokenów wyjściowych (USD) |
| Cena wejściowa z cache | Obniżony koszt za 1M tokenów wejściowych z cache |
| Długość kontekstu | Maksymalny rozmiar okna kontekstu |
| Wizja | Obsługa wejścia obrazowego |
| Wywoływanie funkcji (Narzędzia) | Obsługa użycia narzędzi |

## Zastrzeżenie

> **Ten projekt służy wyłącznie celom informacyjnym.** Dane cenowe są zbierane z agregatorów zewnętrznych, a nie bezpośrednio z oficjalnego API każdego dostawcy AI. Choć dążymy do dokładności, **ceny przedstawione tutaj mogą być nieaktualne, niekompletne lub nieprawidłowe**. Zawsze weryfikuj ceny na oficjalnej stronie cenowej każdego dostawcy przed podjęciem decyzji zakupowych. Ten projekt nie jest powiązany z żadnym dostawcą AI.

## Źródła danych

Dane są zbierane z dwóch zewnętrznych źródeł agregatorów. Pole `source` każdego modelu wskazuje jego pochodzenie. **Żaden dostawca AI nie oferuje publicznego API cenowego**, więc wszystkie dane cenowe w ekosystemie (w tym te agregatory) ostatecznie pochodzą z ręcznego czytania oficjalnej dokumentacji.

### 1. OpenRouter API (Główne)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Rola**: Metadane cen i możliwości modeli w czasie rzeczywistym (Wizja, Narzędzia, Długość kontekstu itp.)
- **Dokładność cen**: OpenRouter przekazuje oficjalne ceny dostawców bez narzutu (ceny pass-through)
- **Licencja**: Podlega Warunkom korzystania z usług OpenRouter ([ToS](https://openrouter.ai/terms))
- **Uwaga**: Publiczne API, ale Warunki korzystania nie zezwalają wyraźnie na redystrybucję danych. Ten projekt podaje źródło i wykorzystuje dane w celach informacyjnych niekomercyjnych.

### 2. pydantic/genai-prices (Pomocnicze)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Rola**: Bezpośrednie ceny dostawców, ceny cache (odczyt/zapis), uzupełnienia cen progowych
- **Dokładność cen**: Ręcznie utrzymywane z oficjalnej dokumentacji ze śledzeniem zmian cen i wykrywaniem rozbieżności
- **Licencja**: **Licencja MIT** - wolna do użytku, modyfikacji i redystrybucji ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Utrzymywane przez**: Zespół [Pydantic](https://github.com/pydantic)

### Dlaczego nie pobieramy danych bezpośrednio ze stron oficjalnych?
- Większość dostawców AI **nie** oferuje publicznego endpointu API cenowego
- Scraping oficjalnych stron cenowych jest kruchy (struktura HTML zmienia się często) i może naruszać Warunki korzystania z usług każdego dostawcy
- Dwa powyższe źródła agregatorów to najbardziej niezawodne programistyczne źródła dostępne w ekosystemie
- W celu uzyskania miarodajnych cen zawsze odwołuj się do oficjalnych stron cenowych wymienionych poniżej

### Dokładność i ograniczenia
- Oba źródła są **ostatecznie oparte na oficjalnej dokumentacji dostawców**, ale za pośrednictwem stron trzecich
- Ceny mogą być **nieaktualne** - dostawcy mogą zmieniać ceny w dowolnym momencie bez uprzedzenia
- Niektóre modele mogą mieć **niekompletne metadane** (np. brak cen cache, nieprawidłowe flagi możliwości)
- **Limity darmowego planu, limity szybkości i rabaty ilościowe** zazwyczaj nie są uwzględniane
- Znalazłeś błąd? Proszę [otwórz issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) lub [wyślij PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Śledzeni dostawcy i oficjalne strony cenowe

| Dostawca | Oficjalny URL cennika |
|----------|----------------------|
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

> Oprócz dostawców wymienionych powyżej, ponad 70 kolejnych jest automatycznie zbieranych za pośrednictwem OpenRouter i genai-prices.

## Lokalne użycie

Wymaga jedynie Node.js 20+. Zero zewnętrznych zależności.

```bash
# Uruchom zbieranie cen
node scripts/collect-prices.mjs

# Lub użyj skryptu npm
npm run collect
```

Pliki wyjściowe:
- `outputs/YYYY-MM-DD.json` - Codzienny snapshot
- `outputs/latest.json` - Najnowsze dane
- `docs/latest.json` - Dla dashboardu GitHub Pages

## Schemat JSON wyjścia

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

- **Harmonogram**: Uruchamiane codziennie o 06:00 UTC
- **Ręczne wyzwalanie**: Dostępne przez `workflow_dispatch` w zakładce Actions
- Zebrane dane są automatycznie commitowane i pushowane

## Samodzielny hosting (Konfiguracja forka)

1. Forkuj to repozytorium
2. **Settings > Pages > Source**: Wybierz `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: Włącz `Read and write permissions`
4. Zweryfikuj, że workflow jest włączony w zakładce Actions

## Współtworzenie

Znalazłeś błędy cenowe, brakujące modele lub chcesz zasugerować nowego dostawcę? Zapraszamy do współtworzenia:

- **[Otwórz Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Raporty błędów, prośby o funkcje
- **[Wyślij Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Bezpośrednie poprawki i ulepszenia

Szczególnie mile widziane wkłady:
- Korekty danych cenowych
- Dodanie brakujących dostawców/modeli AI
- Ulepszenia interfejsu dashboardu
- Sugestie nowych źródeł danych

## Licencja

MIT
