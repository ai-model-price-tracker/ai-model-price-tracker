<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Rastreador diario automatizado de precios de modelos de IA en 100+ proveedores.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Panel en vivo »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Reportar precio incorrecto</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Solicitar proveedor</a>
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

> **Aviso legal:** Este proyecto es solo para fines informativos. Los datos de precios se recopilan de agregadores de terceros y paginas oficiales mediante scraping automatizado. Aunque nos esforzamos por la precision, **los precios pueden estar desactualizados, incompletos o ser incorrectos**. Verifique siempre en la pagina oficial de precios de cada proveedor antes de tomar decisiones. Este proyecto no esta afiliado a ningun proveedor de IA.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Caracteristicas

- **3,000+ modelos** de **100+ proveedores** rastreados diariamente
- **4 fuentes de datos** — 3 APIs comunitarias + scraping de paginas oficiales via Playwright
- **Verificacion de precios oficiales** — extrae datos directamente de OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI sin configuracion** — se ejecuta en contenedor Docker de Playwright, sin necesidad de claves API
- **API JSON gratuita** — consume `latest.json` desde GitHub Pages en tus propios proyectos
- **Panel interactivo** — busca, filtra, ordena, compara precios con soporte i18n (18 idiomas)
- **Resistencia a fallos** — degradacion elegante, datos anteriores preservados, creacion automatica de issues en caso de fallo

## Uso de los datos

Los datos de precios mas recientes estan disponibles gratuitamente en formato JSON, sin necesidad de instalacion:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Encontrar todos los modelos de OpenAI
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

## Para LLMs

Puedes dar a un LLM acceso a datos de precios de modelos de IA en tiempo real agregando esto a tu prompt de sistema:

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

## Como funciona

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

## Fuentes de datos

| # | Fuente | Tipo | Modelos | Licencia |
|---|--------|------|---------|----------|
| 1 | Paginas oficiales (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**Prioridad de fusion:** Los precios obtenidos por scraping oficial prevalecen sobre los precios de los agregadores. OpenRouter es la fuente principal para datos de API; genai-prices y LiteLLM enriquecen los precios de cache y los metadatos de capacidades.

### Scrapers de paginas oficiales

Cada scraper es un archivo separado en [`scripts/scrapers/`](scripts/scrapers/) para facilitar el mantenimiento:

| Archivo | Proveedor | Estado |
|---------|-----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**Agregar un nuevo scraper:** Crea un nuevo archivo en `scripts/scrapers/` que exporte `name`, `url` y `scrape(page)`, luego importalo en [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Precision y limitaciones

- Todas las fuentes se **derivan en ultima instancia de la documentacion oficial**, directa o indirectamente a traves de terceros
- Los precios pueden estar **desactualizados** — los proveedores pueden cambiar los precios en cualquier momento sin previo aviso
- Algunos modelos pueden tener **metadatos incompletos** (precios de cache faltantes, indicadores de capacidades incorrectos)
- **Los limites de nivel gratuito, limites de tasa y descuentos por volumen** generalmente no se capturan
- El scraping oficial puede fallar cuando los proveedores redisenan sus paginas de precios

¿Encontraste un error? Por favor [abre un issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) o [envia un PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Glosario

| Termino | Descripcion |
|---------|-------------|
| **Token** | La unidad basica que usan los modelos de IA para procesar texto. 1 token ≈ 3/4 de una palabra. Los precios son por 1 millon de tokens. |
| **Tokens de entrada** | Texto/datos que envias al modelo (prompt, contexto, instrucciones). |
| **Tokens de salida** | Texto que el modelo genera como respuesta. Generalmente mas caro que la entrada. |
| **Ventana de contexto** | Max tokens que un modelo puede procesar en una conversacion (entrada + salida combinados). |
| **Entrada en cache** | Precio con descuento al reutilizar el mismo prefijo de prompt entre solicitudes. |
| **Precio por lotes** | Precios reducidos para solicitudes masivas no urgentes procesadas de forma asincrona. |
| **Llamada a funciones** | Capacidad del modelo de llamar herramientas externas o APIs durante la generacion. |
| **Vision** | Capacidad del modelo de procesar y comprender imagenes como entrada. |

## Datos recopilados

| Campo | Descripcion |
|-------|-------------|
| `input_price_per_1m` | Costo por 1M de tokens de entrada (USD) |
| `output_price_per_1m` | Costo por 1M de tokens de salida (USD) |
| `cached_input_price_per_1m` | Costo con descuento por 1M de tokens de entrada en cache |
| `context_length` | Tamano maximo de la ventana de contexto (en tokens) |
| `supports_vision` | Si el modelo puede procesar imagenes como entrada |
| `supports_function_calling` | Si el modelo puede llamar herramientas/funciones externas |
| `source` | Fuente de datos (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Proveedores rastreados

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

Ademas de **100+ proveedores adicionales** recopilados automaticamente a traves de OpenRouter, genai-prices y LiteLLM.

## GitHub Actions

| Caracteristica | Detalles |
|----------------|----------|
| **Programacion** | Diariamente a las 06:00 UTC |
| **Activacion manual** | `workflow_dispatch` en la pestana de Actions |
| **Contenedor** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **En caso de fallo** | Crea automaticamente un Issue en GitHub (etiqueta `collection-failure`) |
| **Seguridad de datos** | Datos anteriores preservados si todas las fuentes fallan |

## Autoalojamiento

1. **Haz fork** de este repositorio
2. **Settings > Pages** — Fuente: `Deploy from a branch`, Rama: `main`, Carpeta: `/docs`
3. **Settings > Actions > General** — Habilitar `Read and write permissions`
4. Verifica que el workflow este habilitado en la pestana **Actions**
5. (Opcional) Activa manualmente a traves de **Actions > Collect AI Model Prices > Run workflow**

### Ejecucion local

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Extraer datos de paginas de precios oficiales
npm run collect     # Recopilar de APIs + fusionar datos extraidos
npm run validate    # Validar la salida
```

Salida: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Contribuir

¡Las contribuciones son bienvenidas! Asi puedes ayudar:

- **Correcciones de precios** — ¿Encontraste un precio incorrecto? [Abre un issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) o envia un PR
- **Nuevos scrapers** — Agrega un scraper para un proveedor aun no cubierto ([como agregar](#scrapers-de-paginas-oficiales))
- **Nuevas fuentes de datos** — ¿Conoces otro agregador de precios? Haznos saber
- **Mejoras del panel** — Mejoras de UI, nuevas visualizaciones, correcciones de accesibilidad
- **Proveedores faltantes** — Solicita o agrega soporte para nuevos proveedores de IA

Consulta los [issues abiertos](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) para ver la lista de tareas conocidas.

## Licencia

El **codigo fuente** de este proyecto se distribuye bajo la Licencia MIT. Consulta [`LICENSE`](LICENSE) para mas informacion.

> **Aviso sobre los datos:** Los datos de precios (archivos JSON) se agregan de fuentes de terceros, incluyendo [OpenRouter](https://openrouter.ai/terms) y paginas oficiales de proveedores. Cada fuente esta sujeta a sus propios terminos de servicio. **Los datos recopilados no pueden utilizarse con fines comerciales** sin verificar independientemente y cumplir con los terminos de cada fuente original. Consulta [`LICENSE`](LICENSE) para mas detalles.

---

<p align="center">
  Hecho con GitHub Actions · No requiere claves API · Actualizado diariamente
</p>
