<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Rastreador diario automatizado de precos de modelos de IA em mais de 100 provedores.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Painel ao Vivo »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Reportar Preco Incorreto</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Solicitar Provedor</a>
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

> **Aviso Legal:** Este projeto e apenas para fins informativos. Os dados de precos sao coletados de agregadores de terceiros e paginas oficiais via scraping automatizado. Embora nos esforcemos pela precisao, **os precos podem estar desatualizados, incompletos ou incorretos**. Sempre verifique na pagina oficial de precos de cada provedor antes de tomar decisoes. Este projeto nao e afiliado a nenhum provedor de IA.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Funcionalidades

- **Mais de 3.000 modelos** de **mais de 100 provedores** rastreados diariamente
- **4 fontes de dados** — 3 APIs da comunidade + scraping de paginas oficiais via Playwright
- **Verificacao de precos oficiais** — faz scraping direto de OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI sem configuracao** — executa em container Docker do Playwright, sem necessidade de chaves de API
- **API JSON gratuita** — consuma `latest.json` do GitHub Pages em seus proprios projetos
- **Painel interativo** — pesquise, filtre, ordene, compare precos com suporte a i18n (18 idiomas)
- **Resiliencia a falhas** — degradacao graciosa, dados anteriores preservados, issue automatica em caso de falha

## Usando os Dados

Os dados de precos mais recentes estao disponíveis gratuitamente em JSON — sem necessidade de instalacao:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Encontrar todos os modelos da OpenAI
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

Voce pode dar a um LLM acesso a precos de modelos de IA em tempo real adicionando isto ao seu system prompt:

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

## Como Funciona

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

## Fontes de Dados

| # | Fonte | Tipo | Modelos | Licenca |
|---|-------|------|---------|---------|
| 1 | Paginas oficiais (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Prioridade de mesclagem:** Precos obtidos via scraping oficial substituem precos de agregadores. OpenRouter e a fonte primaria para dados de API, genai-prices e LiteLLM complementam precos de cache e metadados de capacidades.

### Scrapers de paginas oficiais

Cada scraper e um arquivo separado em [`scripts/scrapers/`](scripts/scrapers/) para facil manutencao:

| Arquivo | Provedor | Status |
|---------|----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**Adicionando um novo scraper:** Crie um novo arquivo em `scripts/scrapers/` exportando `name`, `url` e `scrape(page)`, depois importe-o em [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Precisao e limitacoes

- Todas as fontes sao **derivadas da documentacao oficial**, diretamente ou por meio de terceiros
- Os precos podem estar **desatualizados** — provedores podem alterar precos a qualquer momento sem aviso
- Alguns modelos podem ter **metadados incompletos** (precos de cache ausentes, flags de capacidade incorretas)
- **Limites de nivel gratuito, limites de taxa e descontos por volume** geralmente nao sao capturados
- O scraping oficial pode falhar quando provedores redesenham suas paginas de precos

Encontrou um erro? Por favor, [abra uma issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) ou [envie um PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Glossario

| Termo | Descricao |
|-------|-----------|
| **Token** | A unidade basica que modelos de IA usam para processar texto. 1 token ≈ 3/4 de uma palavra. Precos sao por 1 milhao de tokens. |
| **Tokens de entrada** | Texto/dados enviados ao modelo (prompt, contexto, instrucoes). |
| **Tokens de saida** | Texto gerado pelo modelo em resposta. Geralmente mais caro que a entrada. |
| **Janela de contexto** | Max de tokens que um modelo pode processar em uma conversa (entrada + saida combinados). |
| **Entrada em cache** | Preco com desconto ao reutilizar o mesmo prefixo de prompt entre solicitacoes. |
| **Preco por lote** | Precos reduzidos para solicitacoes em massa nao urgentes processadas de forma assincrona. |
| **Chamada de funcoes** | Capacidade do modelo de chamar ferramentas externas ou APIs durante a geracao. |
| **Visao** | Capacidade do modelo de processar e compreender imagens como entrada. |

## Dados Coletados

| Campo | Descricao |
|-------|-----------|
| `input_price_per_1m` | Custo por 1M de tokens de entrada (USD) |
| `output_price_per_1m` | Custo por 1M de tokens de saida (USD) |
| `cached_input_price_per_1m` | Custo com desconto por 1M de tokens de entrada em cache |
| `context_length` | Tamanho maximo da janela de contexto (em tokens) |
| `supports_vision` | Se o modelo pode processar imagens como entrada |
| `supports_function_calling` | Se o modelo pode chamar ferramentas/funcoes externas |
| `source` | Fonte dos dados (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Provedores Rastreados

| Provedor | Precos Oficiais |
|----------|----------------|
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

Alem de **mais de 100 provedores adicionais** coletados automaticamente via OpenRouter, genai-prices e LiteLLM.

## GitHub Actions

| Recurso | Detalhes |
|---------|---------|
| **Agendamento** | Diariamente as 06:00 UTC |
| **Gatilho manual** | `workflow_dispatch` na aba Actions |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **Em caso de falha** | Cria automaticamente uma Issue no GitHub (label `collection-failure`) |
| **Seguranca dos dados** | Dados anteriores preservados se todas as fontes falharem |

## Auto-Hospedagem

1. **Faca um fork** deste repositorio
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Pasta: `/docs`
3. **Settings > Actions > General** — Habilite `Read and write permissions`
4. Verifique se o workflow esta habilitado na aba **Actions**
5. (Opcional) Acione manualmente via **Actions > Collect AI Model Prices > Run workflow**

### Executando localmente

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Fazer scraping das paginas oficiais de precos
npm run collect     # Coletar das APIs + mesclar dados obtidos por scraping
npm run validate    # Validar a saida
```

Saida: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Contribuindo

Contribuicoes sao bem-vindas! Veja como voce pode ajudar:

- **Correcoes de precos** — Encontrou um preco errado? [Abra uma issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) ou envie um PR
- **Novos scrapers** — Adicione um scraper para um provedor ainda nao coberto ([como adicionar](#scrapers-de-paginas-oficiais))
- **Novas fontes de dados** — Conhece outro agregador de precos? Nos informe
- **Melhorias no painel** — Melhorias de UI, novas visualizacoes, correcoes de acessibilidade
- **Provedores ausentes** — Solicite ou adicione suporte para novos provedores de IA

Veja as [issues abertas](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) para uma lista de tarefas conhecidas.

## Licenca

O **codigo-fonte** deste projeto e distribuido sob a Licenca MIT. Veja [`LICENSE`](LICENSE) para mais informacoes.

> **Aviso sobre os Dados:** Os dados de precos (arquivos JSON) sao agregados de fontes de terceiros, incluindo [OpenRouter](https://openrouter.ai/terms) e paginas oficiais de provedores. Cada fonte esta sujeita aos seus proprios termos de servico. **Os dados coletados nao podem ser usados para fins comerciais** sem verificar e cumprir independentemente os termos de cada fonte original. Veja [`LICENSE`](LICENSE) para detalhes.

---

<p align="center">
  Feito com GitHub Actions · Sem necessidade de chaves de API · Atualizado diariamente
</p>
