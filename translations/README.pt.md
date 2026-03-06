# Rastreador de Precos de Modelos de IA

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Rastreador diário automatizado de preços de modelos de IA de todos os principais provedores. Coleta preços, capacidades e informações de API via GitHub Actions e os visualiza através de um painel no GitHub Pages.

**[Painel ao Vivo](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Dados Coletados

| Campo | Descrição |
|-------|-----------|
| Preço de Entrada | Custo por 1M de tokens de entrada (USD) |
| Preço de Saída | Custo por 1M de tokens de saída (USD) |
| Preço de Entrada em Cache | Custo com desconto por 1M de tokens de entrada em cache |
| Comprimento do Contexto | Tamanho máximo da janela de contexto |
| Visão | Suporte a entrada de imagem |
| Chamada de Funções (Tools) | Suporte ao uso de ferramentas |

## Aviso Legal

> **Este projeto é apenas para fins informativos.** Os dados de preços são coletados de agregadores de terceiros, não diretamente da API oficial de cada provedor de IA. Embora nos esforcemos pela precisão, **os preços mostrados aqui podem estar desatualizados, incompletos ou incorretos**. Sempre verifique os preços na página oficial de preços de cada provedor antes de tomar decisões de compra. Este projeto não é afiliado a nenhum provedor de IA.

## Fontes de Dados

Os dados são coletados de duas fontes agregadoras de terceiros. O campo `source` de cada modelo indica sua origem. **Nenhum provedor de IA oferece uma API pública de preços**, portanto todos os dados de preços no ecossistema (incluindo esses agregadores) originam-se, em última análise, da leitura manual da documentação oficial.

### 1. OpenRouter API (Primária)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Função**: Preços de modelos em tempo real e metadados de capacidades (Vision, Tools, Comprimento do Contexto, etc.)
- **Precisão de preços**: O OpenRouter repassa os preços oficiais dos provedores sem margem adicional (preços de repasse)
- **Licença**: Sujeito aos Termos de Serviço do OpenRouter ([ToS](https://openrouter.ai/terms))
- **Nota**: API pública, mas os ToS não permitem explicitamente a redistribuição de dados. Este projeto atribui a fonte e usa os dados para fins informativos não comerciais.

### 2. pydantic/genai-prices (Secundária)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Função**: Preços diretos de provedores, preços de cache (leitura/escrita), suplementos de preços em camadas
- **Precisão de preços**: Mantido manualmente a partir da documentação oficial com rastreamento de alterações de preços e detecção de discrepâncias
- **Licença**: **Licença MIT** - livre para usar, modificar e redistribuir ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Mantido por**: Equipe [Pydantic](https://github.com/pydantic)

### Por Que Não Fazer Scraping Diretamente das Páginas Oficiais?
- A maioria dos provedores de IA **não oferece um endpoint público de API de preços**
- O web scraping de páginas oficiais de preços é frágil (a estrutura HTML muda frequentemente) e pode violar os Termos de Serviço de cada provedor
- As duas fontes agregadoras acima são as fontes programáticas mais confiáveis disponíveis no ecossistema
- Para preços oficiais, consulte sempre as páginas oficiais de preços listadas abaixo

### Precisão e Limitações
- Ambas as fontes são **derivadas da documentação oficial dos provedores**, mas através de terceiros
- Os preços podem estar **desatualizados** - os provedores podem alterar preços a qualquer momento sem aviso prévio
- Alguns modelos podem ter **metadados incompletos** (ex.: preços de cache ausentes, flags de capacidade incorretas)
- **Limites de nível gratuito, limites de taxa e descontos por volume** geralmente não são capturados
- Encontrou um erro? Por favor, [abra uma issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) ou [envie um PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Provedores Rastreados & Páginas Oficiais de Preços

| Provedor | URL Oficial de Preços |
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

> Além dos provedores listados acima, mais de 70 outros são coletados automaticamente via OpenRouter e genai-prices.

## Uso Local

Requer apenas Node.js 20+. Zero dependências externas.

```bash
# Executar coleta de preços
node scripts/collect-prices.mjs

# Ou usar script npm
npm run collect
```

Arquivos de saída:
- `outputs/YYYY-MM-DD.json` - Captura diária
- `outputs/latest.json` - Dados mais recentes
- `docs/latest.json` - Para o painel do GitHub Pages

## Schema JSON de Saída

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

- **Agendamento**: Executa diariamente às 06:00 UTC
- **Gatilho manual**: Disponível via `workflow_dispatch` na aba Actions
- Os dados coletados são automaticamente commitados e enviados

## Auto-Hospedagem (Configuração de Fork)

1. Faça um fork deste repositório
2. **Settings > Pages > Source**: Selecione `Deploy from a branch`, Branch: `main`, Pasta: `/docs`
3. **Settings > Actions > General**: Habilite `Read and write permissions`
4. Verifique se o workflow está habilitado na aba Actions

## Contribuindo

Encontrou erros de preço, modelos faltando ou quer sugerir um novo provedor? Contribuições são bem-vindas:

- **[Abrir uma Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Relatórios de bugs, solicitações de funcionalidades
- **[Enviar um Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Correções e melhorias diretas

Contribuições especialmente bem-vindas:
- Correções de dados de preços
- Adição de provedores/modelos de IA faltantes
- Melhorias na interface do painel
- Sugestões de novas fontes de dados

## Licença

MIT
