<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Automatyczny codzienny tracker cen modeli AI u ponad 100 dostawców.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Dashboard na żywo »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Zgłoś nieprawidłową cenę</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Poproś o dostawcę</a>
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

> **Zastrzeżenie:** Ten projekt służy wyłącznie celom informacyjnym. Dane cenowe są zbierane z agregatorów zewnętrznych i oficjalnych stron poprzez automatyczny scraping. Choć dążymy do dokładności, **ceny mogą być nieaktualne, niekompletne lub nieprawidłowe**. Zawsze weryfikuj na oficjalnej stronie cenowej każdego dostawcy przed podjęciem decyzji. Ten projekt nie jest powiązany z żadnym dostawcą AI.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Funkcje

- **3000+ modeli** od **100+ dostawców** śledzonych codziennie
- **4 źródła danych** — 3 API społecznościowe + scraping oficjalnych stron przez Playwright
- **Weryfikacja cen oficjalnych** — scrapuje bezpośrednio OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI bez konfiguracji** — działa w kontenerze Docker Playwright, nie wymaga kluczy API
- **Darmowe JSON API** — użyj `latest.json` z GitHub Pages w swoich projektach
- **Interaktywny dashboard** — wyszukuj, filtruj, sortuj, porównuj ceny z obsługą i18n (18 języków)
- **Odporność na awarie** — łagodna degradacja, poprzednie dane zachowane, automatyczne issue przy awarii

## Korzystanie z Danych

Najnowsze dane cenowe są dostępne bezpłatnie jako JSON — bez potrzeby instalacji:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Znajdź wszystkie modele OpenAI
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

## Dla LLM-ów

Możesz dać LLM-owi dostęp do danych cenowych modeli AI w czasie rzeczywistym, dodając to do swojego system prompt:

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

## Jak To Działa

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

## Źródła Danych

| # | Źródło | Typ | Modele | Licencja |
|---|--------|-----|--------|----------|
| 1 | Oficjalne strony (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1800+ | MIT |

**Priorytet scalania:** Ceny pobrane ze stron oficjalnych nadpisują ceny z agregatorów. OpenRouter jest głównym źródłem danych API, genai-prices i LiteLLM wzbogacają ceny cache i metadane dotyczące możliwości.

### Scrapery oficjalnych stron
Każdy scraper to osobny plik w katalogu [`scripts/scrapers/`](scripts/scrapers/) dla łatwej konserwacji:

| Plik | Dostawca | Status |
|------|----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | Działa |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | Działa |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | Działa |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | Działa |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | Działa |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — fallback do API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — fallback do API |

**Dodawanie nowego scrapera:** Utwórz nowy plik w `scripts/scrapers/` eksportujący `name`, `url` i `scrape(page)`, a następnie zaimportuj go w [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Dokładność i ograniczenia
- Wszystkie źródła **ostatecznie pochodzą z oficjalnej dokumentacji**, bezpośrednio lub przez strony trzecie
- Ceny mogą być **nieaktualne** — dostawcy mogą zmieniać ceny w dowolnym momencie bez uprzedzenia
- Niektóre modele mogą mieć **niekompletne metadane** (brak cen cache, nieprawidłowe flagi możliwości)
- **Limity darmowego planu, limity szybkości i rabaty ilościowe** zazwyczaj nie są uwzględniane
- Scraping oficjalny może przestać działać, gdy dostawcy przeprojektują swoje strony cenowe

Znalazłeś błąd? [Otwórz issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) lub [wyślij PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Slownik pojec

| Pojecie | Opis |
|---------|------|
| **Token** | Podstawowa jednostka przetwarzania tekstu przez modele AI. 1 token ≈ 3/4 slowa. Ceny sa podawane za 1 milion tokenow. |
| **Tokeny wejsciowe** | Tekst/dane wysylane do modelu (prompt, kontekst, instrukcje). |
| **Tokeny wyjsciowe** | Tekst generowany przez model w odpowiedzi. Zazwyczaj drozsze niz wejsciowe. |
| **Okno kontekstowe** | Maks. tokenow, ktore model moze przetworzyc w jednej rozmowie (wejscie + wyjscie lacznie). |
| **Wejscie z cache** | Obnizzona cena przy ponownym uzyciu tego samego prefiksu promptu miedzy zapytaniami. |
| **Ceny hurtowe** | Obnizione ceny dla niepionych zapytan masowych przetwarzanych asynchronicznie. |
| **Wywolywanie funkcji** | Zdolnosc modelu do wywolywania zewnetrznych narzedzi lub API podczas generowania. |
| **Wizja** | Zdolnosc modelu do przetwarzania i rozumienia obrazow na wejsciu. |

## Zbierane Dane

| Pole | Opis |
|------|------|
| `input_price_per_1m` | Koszt za 1M tokenów wejściowych (USD) |
| `output_price_per_1m` | Koszt za 1M tokenów wyjściowych (USD) |
| `cached_input_price_per_1m` | Obniżony koszt za 1M tokenów wejściowych z cache |
| `context_length` | Maksymalny rozmiar okna kontekstu (w tokenach) |
| `supports_vision` | Czy model może przetwarzać obrazy jako dane wejściowe |
| `supports_function_calling` | Czy model może wywoływać zewnętrzne narzędzia/funkcje |
| `source` | Źródło danych (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Śledzeni Dostawcy

### 16 głównych dostawców z oficjalnymi adresami URL cenników
| Dostawca | Oficjalny Cennik |
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

Plus **100+ dodatkowych dostawców** automatycznie zbieranych przez OpenRouter, genai-prices i LiteLLM.

## GitHub Actions

| Funkcja | Szczegóły |
|---------|-----------|
| **Harmonogram** | Codziennie o 06:00 UTC |
| **Ręczne wyzwalanie** | `workflow_dispatch` w zakładce Actions |
| **Kontener** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **Przy awarii** | Automatycznie tworzy GitHub Issue (etykieta `collection-failure`) |
| **Bezpieczeństwo danych** | Poprzednie dane zachowane, jeśli wszystkie źródła zawiodą |

## Samodzielny Hosting

1. **Forkuj** to repozytorium
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General** — Włącz `Read and write permissions`
4. Zweryfikuj, że workflow jest włączony w zakładce **Actions**
5. (Opcjonalnie) Uruchom ręcznie przez **Actions > Collect AI Model Prices > Run workflow**

### Uruchamianie lokalnie
```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Scrapuj oficjalne strony cenowe
npm run collect     # Zbierz z API + scal dane ze scrapingu
npm run validate    # Zwaliduj dane wyjściowe
```

Dane wyjściowe: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Współtworzenie

Współtworzenie jest mile widziane! Oto jak możesz pomóc:

- **Korekty cen** — Znalazłeś nieprawidłową cenę? [Otwórz issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) lub wyślij PR
- **Nowe scrapery** — Dodaj scraper dla dostawcy, który nie jest jeszcze obsługiwany ([jak dodać](#scrapery-oficjalnych-stron))
- **Nowe źródła danych** — Znasz inny agregator cenowy? Daj nam znać
- **Ulepszenia dashboardu** — Ulepszenia UI, nowe wizualizacje, poprawki dostępności
- **Brakujący dostawcy** — Poproś o dodanie lub dodaj obsługę nowych dostawców AI

Zobacz [otwarte issues](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues), aby poznać listę znanych zadań.

## Licencja

**Kod źródłowy** tego projektu jest dystrybuowany na licencji MIT. Zobacz [`LICENSE`](LICENSE), aby uzyskać więcej informacji.

> **Informacja o danych:** Dane cenowe (pliki JSON) są agregowane ze źródeł zewnętrznych, w tym [OpenRouter](https://openrouter.ai/terms) i oficjalnych stron dostawców. Każde źródło podlega własnym warunkom korzystania z usług. **Zebrane dane nie mogą być wykorzystywane w celach komercyjnych** bez niezależnej weryfikacji i przestrzegania warunków każdego oryginalnego źródła. Zobacz [`LICENSE`](LICENSE), aby poznać szczegóły.

---

<p align="center">
  Stworzone z GitHub Actions · Nie wymaga kluczy API · Aktualizowane codziennie
</p>
