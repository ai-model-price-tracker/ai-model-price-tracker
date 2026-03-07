<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Автоматический ежедневный трекер цен на модели ИИ у более чем 100 провайдеров.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Панель управления »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Сообщить о неверной цене</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Запросить провайдера</a>
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

> **Отказ от ответственности:** Этот проект предназначен только для информационных целей. Данные о ценах собираются из сторонних агрегаторов и официальных страниц с помощью автоматического скрейпинга. Несмотря на наши усилия по обеспечению точности, **цены могут быть устаревшими, неполными или неточными**. Всегда проверяйте информацию на официальной странице цен каждого провайдера перед принятием решений. Этот проект не связан ни с одним провайдером ИИ.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Возможности

- **Более 3 000 моделей** от **более 100 провайдеров** отслеживаются ежедневно
- **4 источника данных** — 3 API сообщества + скрейпинг официальных страниц через Playwright
- **Верификация официальных цен** — скрейпинг OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock напрямую
- **CI без настройки** — работает в Docker-контейнере Playwright, API-ключи не требуются
- **Бесплатный JSON API** — используйте `latest.json` с GitHub Pages в своих проектах
- **Интерактивная панель** — поиск, фильтрация, сортировка, сравнение цен с поддержкой i18n (18 языков)
- **Устойчивость к сбоям** — плавная деградация, предыдущие данные сохраняются, автоматическое создание issue при сбое

## Использование данных

Актуальные данные о ценах свободно доступны в формате JSON — установка не требуется:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Найти все модели OpenAI
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

## Для LLM

Вы можете предоставить LLM доступ к актуальным ценам на модели ИИ, добавив следующее в системный промпт:

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

## Как это работает

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

## Источники данных

| # | Источник | Тип | Модели | Лицензия |
|---|----------|-----|--------|----------|
| 1 | Официальные страницы (Playwright) | Веб-скрейпинг | 200+ | Н/Д |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1 000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1 800+ | MIT |

**Приоритет объединения:** Официально собранные цены имеют приоритет над ценами агрегаторов. OpenRouter является основным источником данных API, genai-prices и LiteLLM дополняют цены кэширования и метаданные возможностей.

### Скрейперы официальных страниц

Каждый скрейпер — это отдельный файл в [`scripts/scrapers/`](scripts/scrapers/) для удобного обслуживания:

| Файл | Провайдер | Статус |
|------|-----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**Добавление нового скрейпера:** Создайте новый файл в `scripts/scrapers/`, экспортирующий `name`, `url` и `scrape(page)`, затем импортируйте его в [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Точность и ограничения

- Все источники **в конечном счёте основаны на официальной документации**, напрямую или через третьи стороны
- Цены могут быть **устаревшими** — провайдеры могут изменить цены в любое время без предупреждения
- Некоторые модели могут иметь **неполные метаданные** (отсутствующие цены кэширования, неверные флаги возможностей)
- **Лимиты бесплатного уровня, ограничения частоты запросов и скидки за объём** обычно не учитываются
- Официальный скрейпинг может перестать работать при редизайне страниц с ценами

Нашли ошибку? Пожалуйста, [создайте issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) или [отправьте PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Глоссарий

| Термин | Описание |
|--------|----------|
| **Токен** | Базовая единица обработки текста в ИИ-моделях. 1 токен ≈ 3/4 слова. Цены указаны за 1 миллион токенов. |
| **Входные токены** | Текст/данные, отправляемые модели (промпт, контекст, инструкции). |
| **Выходные токены** | Текст, генерируемый моделью в ответ. Обычно дороже входных. |
| **Контекстное окно** | Макс. токенов, которые модель может обработать в одном разговоре (вход + выход). |
| **Кешированный вход** | Скидка при повторном использовании одного и того же префикса промпта. |
| **Пакетные цены** | Скидки для массовых несрочных запросов, обрабатываемых асинхронно. |
| **Вызов функций** | Способность модели вызывать внешние инструменты или API во время генерации. |
| **Зрение** | Способность модели обрабатывать и понимать изображения на входе. |

## Собираемые данные

| Поле | Описание |
|------|----------|
| `input_price_per_1m` | Стоимость за 1M входных токенов (USD) |
| `output_price_per_1m` | Стоимость за 1M выходных токенов (USD) |
| `cached_input_price_per_1m` | Льготная стоимость за 1M кэшированных входных токенов |
| `context_length` | Максимальный размер контекстного окна (в токенах) |
| `supports_vision` | Может ли модель обрабатывать изображения на входе |
| `supports_function_calling` | Может ли модель вызывать внешние инструменты/функции |
| `source` | Источник данных (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Отслеживаемые провайдеры

| Провайдер | Официальная страница цен |
|-----------|-------------------------|
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

Плюс **более 100 дополнительных провайдеров**, автоматически собираемых через OpenRouter, genai-prices и LiteLLM.

## GitHub Actions

| Функция | Детали |
|---------|--------|
| **Расписание** | Ежедневно в 06:00 UTC |
| **Ручной запуск** | `workflow_dispatch` во вкладке Actions |
| **Контейнер** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Пайплайн** | `scrape` → `collect` → `validate` → `commit` |
| **При сбое** | Автоматическое создание Issue в GitHub (метка `collection-failure`) |
| **Безопасность данных** | Предыдущие данные сохраняются при сбое всех источников |

## Самостоятельный хостинг

1. **Сделайте форк** этого репозитория
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Папка: `/docs`
3. **Settings > Actions > General** — Включите `Read and write permissions`
4. Убедитесь, что рабочий процесс включён во вкладке **Actions**
5. (Необязательно) Запустите вручную через **Actions > Collect AI Model Prices > Run workflow**

### Локальный запуск

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Скрейпинг официальных страниц с ценами
npm run collect     # Сбор из API + объединение данных скрейпинга
npm run validate    # Валидация результата
```

Результат: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Участие в проекте

Мы приветствуем вклад! Вот как вы можете помочь:

- **Исправление цен** — Нашли неверную цену? [Создайте issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) или отправьте PR
- **Новые скрейперы** — Добавьте скрейпер для ещё не охваченного провайдера ([как добавить](#скрейперы-официальных-страниц))
- **Новые источники данных** — Знаете другой агрегатор цен? Сообщите нам
- **Улучшения панели** — Улучшения UI, новые визуализации, исправления доступности
- **Недостающие провайдеры** — Запросите или добавьте поддержку новых провайдеров ИИ

Смотрите [открытые issues](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) для списка известных задач.

## Лицензия

**Исходный код** этого проекта распространяется под лицензией MIT. Подробнее см. [`LICENSE`](LICENSE).

> **Примечание о данных:** Данные о ценах (JSON-файлы) агрегированы из сторонних источников, включая [OpenRouter](https://openrouter.ai/terms) и официальные страницы провайдеров. Каждый источник подчиняется собственным условиям использования. **Собранные данные не могут использоваться в коммерческих целях** без самостоятельной проверки и соблюдения условий каждого первоисточника. Подробнее см. [`LICENSE`](LICENSE).

---

<p align="center">
  Создано с помощью GitHub Actions · API-ключи не требуются · Обновляется ежедневно
</p>
