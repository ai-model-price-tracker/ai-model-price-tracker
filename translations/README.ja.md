<p align="center">
  <h1 align="center">AI モデル価格トラッカー</h1>
  <p align="center">
    100以上のプロバイダーにわたるAIモデルの価格を毎日自動追跡します。
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>ライブダッシュボード »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">価格の誤りを報告</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">プロバイダーの追加をリクエスト</a>
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

> **免責事項:** このプロジェクトは情報提供のみを目的としています。価格データはサードパーティのアグリゲーターおよび公式ページから自動スクレイピングにより収集されています。正確性に努めていますが、**価格が古くなっている、不完全である、または不正確である可能性があります**。判断を下す前に、必ず各プロバイダーの公式価格ページでご確認ください。このプロジェクトはいかなるAIプロバイダーとも提携していません。

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## 機能

- **3,000以上のモデル**を**100以上のプロバイダー**から毎日追跡
- **4つのデータソース** — 3つのコミュニティAPI + Playwrightによる公式ページスクレイピング
- **公式価格の検証** — OpenAI、Anthropic、Google、DeepSeek、AWS Bedrockを直接スクレイピング
- **設定不要のCI** — Playwright Dockerコンテナで実行、APIキー不要
- **無料JSON API** — GitHub Pagesの`latest.json`を自身のプロジェクトで利用可能
- **インタラクティブダッシュボード** — 検索、フィルター、ソート、価格比較、多言語対応（18言語）
- **障害耐性** — グレースフルデグラデーション、既存データの保持、障害時の自動Issue作成

## データの使用方法

最新の価格データはJSONとして無料で利用可能です。インストール不要：

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// すべてのOpenAIモデルを検索
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

## LLM向け

システムプロンプトに以下を追加することで、LLMにリアルタイムのAIモデル価格データへのアクセスを付与できます：

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

## 仕組み

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

## データソース

| # | ソース | タイプ | モデル数 | ライセンス |
|---|--------|--------|----------|------------|
| 1 | 公式ページ (Playwright) | ウェブスクレイピング | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [利用規約](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**マージ優先順位:** 公式スクレイピング価格がアグリゲーター価格を上書きします。OpenRouterがAPIデータの主要ソースであり、genai-pricesとLiteLLMがキャッシュ価格と機能メタデータを補完します。

### 公式ページスクレイパー

各スクレイパーはメンテナンスの容易さのため、[`scripts/scrapers/`](scripts/scrapers/)配下に個別ファイルとして管理されています：

| ファイル | プロバイダー | 状態 |
|----------|--------------|------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**新しいスクレイパーの追加方法:** `scripts/scrapers/`に`name`、`url`、`scrape(page)`をエクスポートする新しいファイルを作成し、[`scrape-official.mjs`](scripts/scrape-official.mjs)でインポートしてください。

### 正確性と制限事項

- すべてのソースは**最終的に公式ドキュメントから派生**しており、直接またはサードパーティを通じて収集されています
- 価格は**古くなっている**可能性があります — プロバイダーは予告なくいつでも価格を変更できます
- 一部のモデルは**メタデータが不完全**な場合があります（キャッシュ価格の欠落、機能フラグの誤り）
- **無料枠の制限、レート制限、ボリュームディスカウント**は一般的に含まれていません
- プロバイダーが価格ページをリデザインすると、公式スクレイピングが中断する可能性があります

エラーを見つけましたか？[Issueを作成](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)するか、[PRを提出](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)してください。

## 用語集

| 用語 | 説明 |
|------|------|
| **トークン** | AIモデルがテキストを処理する基本単位。日本語では1トークン≈1〜2文字。価格は100万トークンあたりで表示されます。 |
| **入力トークン** | モデルに送るテキスト/データ（プロンプト、文脈、指示）。 |
| **出力トークン** | モデルが生成する応答テキスト。通常、入力より高価です。 |
| **コンテキストウィンドウ** | 1回の会話でモデルが処理できる最大トークン数（入力＋出力の合計）。 |
| **キャッシュ入力** | 同じプロンプトの先頭部分を再利用する際の割引価格。 |
| **バッチ料金** | 緊急でない大量リクエスト向けの割引料金。応答に数時間かかりますが、大幅にコスト削減できます。 |
| **関数呼び出し** | モデルが生成過程で外部ツールやAPIを呼び出す機能。 |
| **ビジョン** | モデルが画像入力を処理・理解する機能。 |

## 収集データ

| フィールド | 説明 |
|------------|------|
| `input_price_per_1m` | 100万入力トークンあたりのコスト（USD） |
| `output_price_per_1m` | 100万出力トークンあたりのコスト（USD） |
| `cached_input_price_per_1m` | 100万キャッシュ入力トークンあたりの割引コスト |
| `context_length` | 最大コンテキストウィンドウサイズ（トークン単位） |
| `supports_vision` | モデルが画像入力を処理できるかどうか |
| `supports_function_calling` | モデルが外部ツール/関数を呼び出せるかどうか |
| `source` | データソース（`openrouter`、`genai-prices`、`litellm`、`official`） |

## 追跡プロバイダー

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

OpenRouter、genai-prices、LiteLLMを通じて**100以上の追加プロバイダー**が自動的に収集されます。

## GitHub Actions

| 項目 | 詳細 |
|------|------|
| **スケジュール** | 毎日UTC 06:00 |
| **手動トリガー** | Actionsタブで`workflow_dispatch` |
| **コンテナ** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **パイプライン** | `scrape` → `collect` → `validate` → `commit` |
| **障害時** | GitHub Issueを自動作成（`collection-failure`ラベル） |
| **データ安全性** | すべてのソースが失敗した場合、以前のデータを保持 |

## セルフホスティング

1. このリポジトリを**フォーク**します
2. **Settings > Pages** — Source: `Deploy from a branch`、Branch: `main`、Folder: `/docs`
3. **Settings > Actions > General** — `Read and write permissions`を有効化
4. **Actions**タブでワークフローが有効になっていることを確認します
5. （オプション）**Actions > Collect AI Model Prices > Run workflow**から手動で実行

### ローカルで実行

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # 公式価格ページをスクレイピング
npm run collect     # APIから収集 + スクレイピングデータをマージ
npm run validate    # 出力を検証
```

出力: `outputs/latest.json`、`outputs/YYYY-MM-DD.json`、`docs/latest.json`

## コントリビューション

コントリビューションを歓迎します！以下の方法でご協力いただけます：

- **価格の修正** — 誤った価格を見つけましたか？[Issueを作成](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)するかPRを提出してください
- **新しいスクレイパー** — まだカバーされていないプロバイダーのスクレイパーを追加（[追加方法](#公式ページスクレイパー)）
- **新しいデータソース** — 他の価格アグリゲーターをご存知ですか？お知らせください
- **ダッシュボードの改善** — UIの改善、新しいビジュアライゼーション、アクセシビリティの修正
- **不足しているプロバイダー** — 新しいAIプロバイダーのサポートをリクエストまたは追加

既知のタスクの一覧は[オープンIssue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)をご確認ください。

## ライセンス

このプロジェクトの**ソースコード**はMITライセンスに基づいて配布されています。詳細は[`LICENSE`](LICENSE)をご覧ください。

> **データに関する注意事項:** 価格データ（JSONファイル）は、[OpenRouter](https://openrouter.ai/terms)や公式プロバイダーページを含むサードパーティのソースから集約されています。各ソースはそれぞれの利用規約が適用されます。**収集されたデータは、各原本ソースの利用規約を独自に確認し遵守しない限り、商業目的で使用することはできません。**詳細は[`LICENSE`](LICENSE)をご覧ください。

---

<p align="center">
  GitHub Actionsで構築 · APIキー不要 · 毎日更新
</p>
