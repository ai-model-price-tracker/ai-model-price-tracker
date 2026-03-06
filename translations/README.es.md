# Rastreador de Precios de Modelos de IA

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Rastreador diario automatizado de precios de modelos de IA de todos los principales proveedores. Recopila precios, capacidades e información de API mediante GitHub Actions y los visualiza a través de un panel de GitHub Pages.

**[Panel en vivo](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Datos recopilados

| Campo | Descripcion |
|-------|-------------|
| Precio de entrada | Costo por 1M de tokens de entrada (USD) |
| Precio de salida | Costo por 1M de tokens de salida (USD) |
| Precio de entrada en cache | Costo con descuento por 1M de tokens de entrada en cache |
| Longitud de contexto | Tamano maximo de la ventana de contexto |
| Vision | Soporte de entrada de imagenes |
| Llamada a funciones (Tools) | Soporte de uso de herramientas |

## Descargo de responsabilidad

> **Este proyecto es solo para fines informativos.** Los datos de precios se recopilan de agregadores de terceros, no directamente de la API oficial de cada proveedor de IA. Aunque nos esforzamos por la precision, **los precios mostrados aqui pueden estar desactualizados, incompletos o ser incorrectos**. Siempre verifique los precios en la pagina oficial de precios de cada proveedor antes de tomar decisiones de compra. Este proyecto no esta afiliado a ningun proveedor de IA.

## Fuentes de datos

Los datos se recopilan de dos fuentes agregadoras de terceros. El campo `source` de cada modelo indica su origen. **Ningun proveedor de IA ofrece una API publica de precios**, por lo que todos los datos de precios en el ecosistema (incluidos estos agregadores) provienen en ultima instancia de la lectura manual de la documentacion oficial.

### 1. OpenRouter API (Principal)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Funcion**: Precios de modelos en tiempo real y metadatos de capacidades (Vision, Tools, Context Length, etc.)
- **Precision de precios**: OpenRouter transmite los precios oficiales del proveedor sin margen (precios de paso directo)
- **Licencia**: Sujeto a los Terminos de Servicio de OpenRouter ([ToS](https://openrouter.ai/terms))
- **Nota**: API publica, pero los ToS no permiten explicitamente la redistribucion de datos. Este proyecto atribuye la fuente y utiliza los datos con fines informativos no comerciales.

### 2. pydantic/genai-prices (Secundario)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Funcion**: Precios directos del proveedor, precios de cache (lectura/escritura), suplementos de precios escalonados
- **Precision de precios**: Mantenido manualmente a partir de documentacion oficial con seguimiento de cambios de precios y deteccion de discrepancias
- **Licencia**: **Licencia MIT** - libre para usar, modificar y redistribuir ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Mantenido por**: Equipo de [Pydantic](https://github.com/pydantic)

### Por que no extraer datos directamente de las paginas oficiales?

- La mayoria de los proveedores de IA **no ofrecen** un endpoint publico de API de precios
- El web scraping de paginas oficiales de precios es fragil (la estructura HTML cambia frecuentemente) y puede violar los Terminos de Servicio de cada proveedor
- Las dos fuentes agregadoras anteriores son las fuentes programaticas mas confiables disponibles en el ecosistema
- Para precios oficiales, consulte siempre las paginas de precios oficiales listadas a continuacion

### Precision y limitaciones

- Ambas fuentes se **derivan en ultima instancia de la documentacion oficial del proveedor**, pero a traves de terceros
- Los precios pueden estar **desactualizados** - los proveedores pueden cambiar los precios en cualquier momento sin previo aviso
- Algunos modelos pueden tener **metadatos incompletos** (por ejemplo, precios de cache faltantes, indicadores de capacidad incorrectos)
- Los **limites de nivel gratuito, limites de tasa y descuentos por volumen** generalmente no se capturan
- Ha encontrado un error? Por favor [abra un issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) o [envie un PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Proveedores rastreados y paginas de precios oficiales

| Proveedor | URL de precios oficiales |
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

> Ademas de los proveedores listados arriba, se recopilan automaticamente mas de 70 proveedores adicionales a traves de OpenRouter y genai-prices.

## Uso local

Solo requiere Node.js 20+. Sin dependencias externas.

```bash
# Ejecutar recopilacion de precios
node scripts/collect-prices.mjs

# O usar el script de npm
npm run collect
```

Archivos de salida:
- `outputs/YYYY-MM-DD.json` - Instantanea diaria
- `outputs/latest.json` - Datos mas recientes
- `docs/latest.json` - Para el panel de GitHub Pages

## Esquema JSON de salida

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

- **Programacion**: Se ejecuta diariamente a las 06:00 UTC
- **Activacion manual**: Disponible mediante `workflow_dispatch` en la pestana de Actions
- Los datos recopilados se confirman y envian automaticamente

## Alojamiento propio (Configuracion de Fork)

1. Haga fork de este repositorio
2. **Settings > Pages > Source**: Seleccione `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: Habilite `Read and write permissions`
4. Verifique que el flujo de trabajo este habilitado en la pestana de Actions

## Contribuir

Ha encontrado errores de precios, modelos faltantes o quiere sugerir un nuevo proveedor? Damos la bienvenida a las contribuciones:

- **[Abrir un Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Reportes de errores, solicitudes de funciones
- **[Enviar un Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Correcciones y mejoras directas

Contribuciones que especialmente valoramos:
- Correcciones de datos de precios
- Adicion de proveedores/modelos de IA faltantes
- Mejoras en la interfaz del panel
- Sugerencias de nuevas fuentes de datos

## Licencia

MIT
