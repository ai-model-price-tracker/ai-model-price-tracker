# Трекер цен на модели ИИ

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Автоматический ежедневный трекер цен на модели ИИ у всех основных провайдеров. Собирает информацию о ценах, возможностях и API через GitHub Actions и визуализирует её на панели управления GitHub Pages.

**[Панель управления](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Собираемые данные

| Поле | Описание |
|------|----------|
| Цена ввода | Стоимость за 1M входных токенов (USD) |
| Цена вывода | Стоимость за 1M выходных токенов (USD) |
| Цена кэшированного ввода | Льготная стоимость за 1M кэшированных входных токенов |
| Длина контекста | Максимальный размер контекстного окна |
| Зрение | Поддержка ввода изображений |
| Вызов функций (Tools) | Поддержка использования инструментов |

## Отказ от ответственности

> **Этот проект предназначен только для информационных целей.** Данные о ценах собираются из сторонних агрегаторов, а не напрямую из официального API каждого провайдера ИИ. Несмотря на наши усилия по обеспечению точности, **указанные здесь цены могут быть устаревшими, неполными или неточными**. Всегда проверяйте цены на официальной странице каждого провайдера перед принятием решений о покупке. Этот проект не связан ни с одним провайдером ИИ.

## Источники данных

Данные собираются из двух сторонних агрегаторов. Поле `source` каждой модели указывает на её происхождение. **Ни один провайдер ИИ не предоставляет публичный API для получения цен**, поэтому все данные о ценах в экосистеме (включая эти агрегаторы) в конечном счёте получены путём ручного чтения официальной документации.

### 1. OpenRouter API (Основной)

- **Конечная точка**: `GET https://openrouter.ai/api/v1/models`
- **Роль**: Цены на модели в реальном времени и метаданные о возможностях (Vision, Tools, длина контекста и т.д.)
- **Точность цен**: OpenRouter передаёт официальные цены провайдеров без наценки (сквозное ценообразование)
- **Лицензия**: Подчиняется Условиям использования OpenRouter ([ToS](https://openrouter.ai/terms))
- **Примечание**: Публичный API, но Условия использования не разрешают явно перераспространение данных. Этот проект указывает источник и использует данные в некоммерческих информационных целях.

### 2. pydantic/genai-prices (Дополнительный)

- **Конечная точка**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Роль**: Прямые цены провайдеров, цены кэширования (чтение/запись), дополнения многоуровневых цен
- **Точность цен**: Поддерживается вручную из официальной документации с отслеживанием изменений цен и обнаружением расхождений
- **Лицензия**: **Лицензия MIT** — свободное использование, модификация и распространение ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Поддерживается**: Командой [Pydantic](https://github.com/pydantic)

### Почему бы не парсить официальные страницы напрямую?
- Большинство провайдеров ИИ **не предоставляют публичную API для получения цен**
- Веб-скрейпинг официальных страниц с ценами ненадёжен (структура HTML часто меняется) и может нарушать Условия использования каждого провайдера
- Два указанных выше агрегатора являются наиболее надёжными программными источниками в экосистеме
- Для получения авторитетных цен всегда обращайтесь к официальным страницам цен, перечисленным ниже

### Точность и ограничения
- Оба источника **в конечном счёте основаны на официальной документации провайдеров**, но через третьи стороны
- Цены могут быть **устаревшими** — провайдеры могут изменить цены в любое время без предупреждения
- Некоторые модели могут иметь **неполные метаданные** (например, отсутствующие цены кэширования, неверные флаги возможностей)
- **Лимиты бесплатного уровня, ограничения частоты запросов и скидки за объём** обычно не учитываются
- Нашли ошибку? Пожалуйста, [создайте issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) или [отправьте PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Отслеживаемые провайдеры и официальные страницы цен

| Провайдер | Официальная страница цен |
|-----------|-------------------------|
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

> Помимо перечисленных выше провайдеров, более 70 дополнительных автоматически собираются через OpenRouter и genai-prices.

## Локальное использование

Требуется только Node.js 20+. Нулевые внешние зависимости.

```bash
# Запустить сбор цен
node scripts/collect-prices.mjs

# Или использовать npm-скрипт
npm run collect
```

Выходные файлы:
- `outputs/YYYY-MM-DD.json` — Ежедневный снимок
- `outputs/latest.json` — Последние данные
- `docs/latest.json` — Для панели управления GitHub Pages

## Схема выходного JSON

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

- **Расписание**: Запускается ежедневно в 06:00 UTC
- **Ручной запуск**: Доступен через `workflow_dispatch` во вкладке Actions
- Собранные данные автоматически коммитятся и отправляются

## Самостоятельный хостинг (настройка форка)

1. Сделайте форк этого репозитория
2. **Settings > Pages > Source**: Выберите `Deploy from a branch`, Branch: `main`, Папка: `/docs`
3. **Settings > Actions > General**: Включите `Read and write permissions`
4. Убедитесь, что рабочий процесс включён во вкладке Actions

## Участие в проекте

Нашли ошибки в ценах, отсутствующие модели или хотите предложить нового провайдера? Мы приветствуем вклад:

- **[Создать Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** — Сообщения об ошибках, запросы функций
- **[Отправить Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** — Прямые исправления и улучшения

Особенно приветствуются:
- Исправления данных о ценах
- Добавление отсутствующих провайдеров/моделей ИИ
- Улучшения интерфейса панели управления
- Предложения новых источников данных

## Лицензия

MIT
