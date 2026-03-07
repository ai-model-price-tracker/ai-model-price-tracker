<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Suivi quotidien automatisé des prix des modèles d'IA chez 100+ fournisseurs.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Tableau de bord en direct »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Signaler un prix incorrect</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Demander un fournisseur</a>
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

> **Avertissement :** Ce projet est fourni à titre informatif uniquement. Les données de prix sont collectées auprès d'agrégateurs tiers et de pages officielles via un scraping automatisé. Bien que nous nous efforcions d'être précis, **les prix peuvent être obsolètes, incomplets ou incorrects**. Vérifiez toujours sur la page officielle de tarification de chaque fournisseur avant de prendre des décisions. Ce projet n'est affilié à aucun fournisseur d'IA.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Fonctionnalités

- **3 000+ modèles** de **100+ fournisseurs** suivis quotidiennement
- **4 sources de données** — 3 APIs communautaires + scraping de pages officielles via Playwright
- **Vérification des prix officiels** — extraction directe depuis OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI sans configuration** — s'exécute dans un conteneur Docker Playwright, aucune clé API requise
- **API JSON gratuite** — consommez `latest.json` depuis GitHub Pages dans vos propres projets
- **Tableau de bord interactif** — recherche, filtrage, tri, comparaison de prix avec support i18n (18 langues)
- **Résilience aux pannes** — dégradation élégante, données précédentes préservées, création automatique d'issues en cas d'échec

## Utilisation des données

Les dernières données de tarification sont disponibles gratuitement en JSON — aucune installation requise :

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Find all OpenAI models
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

## Pour les LLMs

Vous pouvez donner à un LLM l'accès aux données de tarification des modèles d'IA en temps réel en ajoutant ceci à votre prompt système :

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

## Comment ça fonctionne

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

## Sources de données

| # | Source | Type | Modèles | Licence |
|---|--------|------|---------|---------|
| 1 | Pages officielles (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1 000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1 800+ | MIT |

**Priorité de fusion :** Les prix obtenus par scraping officiel priment sur les prix des agrégateurs. OpenRouter est la source principale pour les données API ; genai-prices et LiteLLM enrichissent les prix de cache et les métadonnées de capacités.

### Scrapers de pages officielles

Chaque scraper est un fichier séparé dans [`scripts/scrapers/`](scripts/scrapers/) pour faciliter la maintenance :

| Fichier | Fournisseur | Statut |
|---------|-------------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**Ajouter un nouveau scraper :** Créez un nouveau fichier dans `scripts/scrapers/` exportant `name`, `url` et `scrape(page)`, puis importez-le dans [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Précision et limitations

- Toutes les sources sont **en fin de compte dérivées de la documentation officielle**, directement ou via des tiers
- Les prix peuvent être **obsolètes** — les fournisseurs peuvent modifier leurs prix à tout moment sans préavis
- Certains modèles peuvent avoir des **métadonnées incomplètes** (prix de cache manquants, indicateurs de capacités incorrects)
- **Les limites de niveau gratuit, limites de débit et remises sur volume** ne sont généralement pas prises en compte
- Le scraping officiel peut échouer lorsque les fournisseurs remanient leurs pages de tarification

Vous avez trouvé une erreur ? Veuillez [ouvrir un issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) ou [soumettre un PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Glossaire

| Terme | Description |
|-------|-------------|
| **Token** | L'unite de base utilisee par les modeles d'IA pour traiter le texte. 1 token ≈ 3/4 d'un mot. Les prix sont par million de tokens. |
| **Tokens d'entree** | Texte/donnees envoyes au modele (prompt, contexte, instructions). |
| **Tokens de sortie** | Texte genere par le modele en reponse. Generalement plus cher que l'entree. |
| **Fenetre de contexte** | Max de tokens qu'un modele peut traiter dans une conversation (entree + sortie combines). |
| **Entree en cache** | Prix reduit lors de la reutilisation du meme prefixe de prompt entre les requetes. |
| **Tarification par lots** | Prix reduits pour les requetes en masse non urgentes traitees de maniere asynchrone. |
| **Appel de fonctions** | Capacite du modele a appeler des outils externes ou des APIs pendant la generation. |
| **Vision** | Capacite du modele a traiter et comprendre les images en entree. |

## Données collectées

| Champ | Description |
|-------|-------------|
| `input_price_per_1m` | Coût pour 1M de tokens d'entrée (USD) |
| `output_price_per_1m` | Coût pour 1M de tokens de sortie (USD) |
| `cached_input_price_per_1m` | Coût réduit pour 1M de tokens d'entrée en cache |
| `context_length` | Taille max de la fenetre de contexte (en tokens) |
| `supports_vision` | Si le modele peut traiter des images en entree |
| `supports_function_calling` | Si le modele peut appeler des outils/fonctions externes |
| `source` | Source des données (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Fournisseurs suivis

| Fournisseur | Tarification officielle |
|-------------|------------------------|
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

Plus **100+ fournisseurs supplémentaires** collectés automatiquement via OpenRouter, genai-prices et LiteLLM.

## GitHub Actions

| Fonctionnalité | Détails |
|----------------|---------|
| **Programmation** | Quotidiennement à 06:00 UTC |
| **Déclenchement manuel** | `workflow_dispatch` dans l'onglet Actions |
| **Conteneur** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **En cas d'échec** | Création automatique d'un Issue GitHub (étiquette `collection-failure`) |
| **Sécurité des données** | Données précédentes préservées si toutes les sources échouent |

## Auto-hébergement

1. **Forkez** ce dépôt
2. **Settings > Pages** — Source : `Deploy from a branch`, Branche : `main`, Dossier : `/docs`
3. **Settings > Actions > General** — Activer `Read and write permissions`
4. Vérifiez que le workflow est activé dans l'onglet **Actions**
5. (Optionnel) Déclenchez manuellement via **Actions > Collect AI Model Prices > Run workflow**

### Exécution en local

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Extraire les données des pages de tarification officielles
npm run collect     # Collecter depuis les APIs + fusionner les données extraites
npm run validate    # Valider la sortie
```

Sortie : `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

- **Corrections de prix** — Vous avez trouvé un prix incorrect ? [Ouvrez un issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) ou soumettez un PR
- **Nouveaux scrapers** — Ajoutez un scraper pour un fournisseur non encore couvert ([comment ajouter](#scrapers-de-pages-officielles))
- **Nouvelles sources de données** — Vous connaissez un autre agrégateur de prix ? Faites-le nous savoir
- **Améliorations du tableau de bord** — Améliorations de l'UI, nouvelles visualisations, corrections d'accessibilité
- **Fournisseurs manquants** — Demandez ou ajoutez le support pour de nouveaux fournisseurs d'IA

Consultez les [issues ouverts](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) pour voir la liste des tâches connues.

## Licence

Le **code source** de ce projet est distribué sous la Licence MIT. Voir [`LICENSE`](LICENSE) pour plus d'informations.

> **Avis sur les données :** Les données de tarification (fichiers JSON) sont agrégées à partir de sources tierces, notamment [OpenRouter](https://openrouter.ai/terms) et les pages officielles des fournisseurs. Chaque source est soumise à ses propres conditions d'utilisation. **Les données collectées ne peuvent pas être utilisées à des fins commerciales** sans vérification indépendante et conformité aux conditions de chaque source originale. Voir [`LICENSE`](LICENSE) pour plus de détails.

---

<p align="center">
  Réalisé avec GitHub Actions · Aucune clé API requise · Mis à jour quotidiennement
</p>
