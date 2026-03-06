# Suivi des Prix des Modeles d'IA

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Suivi quotidien automatise des prix des modeles d'IA de tous les principaux fournisseurs. Collecte les prix, les capacites et les informations API via GitHub Actions et les visualise a travers un tableau de bord GitHub Pages.

**[Tableau de bord en direct](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Donnees collectees

| Champ | Description |
|-------|-------------|
| Prix d'entree | Cout pour 1M de tokens d'entree (USD) |
| Prix de sortie | Cout pour 1M de tokens de sortie (USD) |
| Prix d'entree en cache | Cout reduit pour 1M de tokens d'entree en cache |
| Longueur de contexte | Taille maximale de la fenetre de contexte |
| Vision | Support d'entree d'images |
| Appel de fonctions (Tools) | Support d'utilisation d'outils |

## Avertissement

> **Ce projet est fourni a titre informatif uniquement.** Les donnees de prix sont collectees aupres d'agregateurs tiers, et non directement depuis l'API officielle de chaque fournisseur d'IA. Bien que nous nous efforcions d'etre precis, **les prix affiches ici peuvent etre obsoletes, incomplets ou incorrects**. Verifiez toujours les prix sur la page officielle de tarification de chaque fournisseur avant de prendre des decisions d'achat. Ce projet n'est affilie a aucun fournisseur d'IA.

## Sources de donnees

Les donnees sont collectees a partir de deux sources d'agregateurs tiers. Le champ `source` de chaque modele indique son origine. **Aucun fournisseur d'IA ne propose d'API publique de tarification**, de sorte que toutes les donnees de prix dans l'ecosysteme (y compris ces agregateurs) proviennent en fin de compte de la lecture manuelle de la documentation officielle.

### 1. OpenRouter API (Principal)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Role**: Prix des modeles en temps reel et metadonnees de capacites (Vision, Tools, Context Length, etc.)
- **Precision des prix**: OpenRouter transmet les prix officiels des fournisseurs sans marge (tarification directe)
- **Licence**: Soumis aux Conditions d'Utilisation d'OpenRouter ([ToS](https://openrouter.ai/terms))
- **Note**: API publique, mais les conditions d'utilisation n'autorisent pas explicitement la redistribution des donnees. Ce projet attribue la source et utilise les donnees a des fins informatives non commerciales.

### 2. pydantic/genai-prices (Secondaire)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Role**: Prix directs des fournisseurs, prix de cache (lecture/ecriture), supplements de tarification echelonnee
- **Precision des prix**: Maintenu manuellement a partir de la documentation officielle avec suivi des changements de prix et detection des ecarts
- **Licence**: **Licence MIT** - libre d'utilisation, de modification et de redistribution ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Maintenu par**: Equipe [Pydantic](https://github.com/pydantic)

### Pourquoi ne pas extraire directement les pages officielles ?

- La plupart des fournisseurs d'IA **ne proposent pas** d'endpoint d'API publique de tarification
- Le web scraping des pages officielles de tarification est fragile (la structure HTML change frequemment) et peut violer les Conditions d'Utilisation de chaque fournisseur
- Les deux sources d'agregateurs ci-dessus sont les sources programmatiques les plus fiables disponibles dans l'ecosysteme
- Pour des tarifs faisant autorite, consultez toujours les pages de tarification officielles listees ci-dessous

### Precision et limitations

- Les deux sources sont **en fin de compte derivees de la documentation officielle des fournisseurs**, mais via des tiers
- Les prix peuvent etre **obsoletes** - les fournisseurs peuvent modifier les prix a tout moment sans preavis
- Certains modeles peuvent avoir des **metadonnees incompletes** (par exemple, tarification de cache manquante, indicateurs de capacite incorrects)
- Les **limites de niveau gratuit, limites de debit et remises sur volume** ne sont generalement pas prises en compte
- Vous avez trouve une erreur ? Veuillez [ouvrir un issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) ou [soumettre un PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Fournisseurs suivis et pages de tarification officielles

| Fournisseur | URL de tarification officielle |
|-------------|-------------------------------|
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

> En plus des fournisseurs listes ci-dessus, plus de 70 fournisseurs supplementaires sont automatiquement collectes via OpenRouter et genai-prices.

## Utilisation locale

Necessite uniquement Node.js 20+. Zero dependances externes.

```bash
# Executer la collecte de prix
node scripts/collect-prices.mjs

# Ou utiliser le script npm
npm run collect
```

Fichiers de sortie :
- `outputs/YYYY-MM-DD.json` - Instantane quotidien
- `outputs/latest.json` - Donnees les plus recentes
- `docs/latest.json` - Pour le tableau de bord GitHub Pages

## Schema JSON de sortie

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

- **Programmation**: S'execute quotidiennement a 06:00 UTC
- **Declenchement manuel**: Disponible via `workflow_dispatch` dans l'onglet Actions
- Les donnees collectees sont automatiquement validees et poussees

## Auto-hebergement (Configuration du Fork)

1. Forkez ce depot
2. **Settings > Pages > Source**: Selectionnez `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: Activez `Read and write permissions`
4. Verifiez que le workflow est active dans l'onglet Actions

## Contribuer

Vous avez trouve des erreurs de prix, des modeles manquants ou souhaitez suggerer un nouveau fournisseur ? Les contributions sont les bienvenues :

- **[Ouvrir un Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Rapports de bugs, demandes de fonctionnalites
- **[Soumettre un Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Corrections et ameliorations directes

Contributions particulierement appreciees :
- Corrections de donnees de prix
- Ajout de fournisseurs/modeles d'IA manquants
- Ameliorations de l'interface du tableau de bord
- Suggestions de nouvelles sources de donnees

## Licence

MIT
