# AIモデル価格トラッカー

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

主要なAIプロバイダーのモデル価格を毎日自動で追跡します。GitHub Actionsを通じて価格、機能、API情報を収集し、GitHub Pagesダッシュボードで可視化します。

**[ライブダッシュボード](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## 収集データ

| フィールド | 説明 |
|-----------|------|
| 入力価格 | 100万入力トークンあたりのコスト（USD） |
| 出力価格 | 100万出力トークンあたりのコスト（USD） |
| キャッシュ入力価格 | 100万キャッシュ入力トークンあたりの割引コスト |
| コンテキスト長 | 最大コンテキストウィンドウサイズ |
| ビジョン | 画像入力サポート |
| 関数呼び出し（Tools） | ツール使用サポート |

## 免責事項

> **本プロジェクトは情報提供のみを目的としています。** 価格データは各AIプロバイダーの公式APIからではなく、サードパーティのアグリゲーターから収集されています。正確性に努めていますが、**ここに表示されている価格は古い、不完全、または不正確な場合があります。** 購入を決定する前に、必ず各プロバイダーの公式価格ページでご確認ください。本プロジェクトはいかなるAIプロバイダーとも提携していません。

## データソース

データは2つのサードパーティアグリゲーターソースから収集されます。各モデルの`source`フィールドがその出典を示します。**どのAIプロバイダーも公開価格APIを提供していないため**、エコシステム内のすべての価格データ（これらのアグリゲーターを含む）は、最終的に公式ドキュメントを手動で読むことに由来しています。

### 1. OpenRouter API（プライマリ）

- **エンドポイント**: `GET https://openrouter.ai/api/v1/models`
- **役割**: リアルタイムのモデル価格と機能メタデータ（Vision、Tools、Context Lengthなど）
- **価格精度**: OpenRouterは公式プロバイダー価格をマークアップなしでそのまま転送（パススルー価格）
- **ライセンス**: OpenRouter利用規約に準拠（[ToS](https://openrouter.ai/terms)）
- **注記**: 公開APIですが、利用規約ではデータの再配布を明示的に許可していません。本プロジェクトはソースを帰属表示し、非商業的な情報目的でデータを使用しています。

### 2. pydantic/genai-prices（セカンダリ）

- **エンドポイント**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **役割**: プロバイダー直接価格、キャッシュ価格（読み取り/書き込み）、階層別価格の補足
- **価格精度**: 公式ドキュメントから手動で管理され、価格変更の追跡と不一致の検出機能を含む
- **ライセンス**: **MITライセンス** - 自由に使用、変更、再配布可能（[LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE)）
- **管理者**: [Pydantic](https://github.com/pydantic)チーム

### なぜ公式ページを直接スクレイピングしないのか？

- ほとんどのAIプロバイダーは公開価格APIエンドポイントを**提供していません**
- 公式価格ページのWebスクレイピングは脆弱であり（HTML構造が頻繁に変更される）、各プロバイダーの利用規約に違反する可能性があります
- 上記の2つのアグリゲーターソースは、エコシステムで利用可能な最も信頼性の高いプログラマティックソースです
- 正式な価格情報については、常に以下にリストされている公式価格ページを参照してください

### 精度と制限事項

- 両方のソースは**最終的に公式プロバイダードキュメントに由来**しますが、サードパーティを介して収集されています
- 価格が**古くなっている**可能性があります - プロバイダーは事前通知なしにいつでも価格を変更できます
- 一部のモデルの**メタデータが不完全**な場合があります（例：キャッシュ価格の欠落、不正確な機能フラグ）
- **無料ティアの制限、レート制限、ボリュームディスカウント**は一般的にキャプチャされていません
- エラーを見つけましたか？[イシューを開く](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)か[PRを提出](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)してください

## 追跡プロバイダーと公式価格ページ

| プロバイダー | 公式価格URL |
|-------------|------------|
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

> 上記のプロバイダーに加え、OpenRouterとgenai-pricesを通じて70以上のプロバイダーが自動的に収集されます。

## ローカル使用方法

Node.js 20+のみ必要です。外部依存関係はありません。

```bash
# 価格収集を実行
node scripts/collect-prices.mjs

# またはnpmスクリプトを使用
npm run collect
```

出力ファイル:
- `outputs/YYYY-MM-DD.json` - 日次スナップショット
- `outputs/latest.json` - 最新データ
- `docs/latest.json` - GitHub Pagesダッシュボード用

## 出力JSONスキーマ

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

- **スケジュール**: 毎日UTC 06:00に実行
- **手動トリガー**: Actionsタブの`workflow_dispatch`から利用可能
- 収集されたデータは自動的にコミットおよびプッシュされます

## セルフホスティング（フォーク設定）

1. このリポジトリをフォークします
2. **Settings > Pages > Source**: `Deploy from a branch`を選択、Branch: `main`、Folder: `/docs`
3. **Settings > Actions > General**: `Read and write permissions`を有効化
4. Actionsタブでワークフローが有効になっていることを確認します

## コントリビュート

価格エラー、不足しているモデル、または新しいプロバイダーの提案がありますか？コントリビューションを歓迎します：

- **[イシューを開く](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - バグ報告、機能リクエスト
- **[Pull Requestを提出](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - 直接の修正と改善

特に歓迎するコントリビューション：
- 価格データの修正
- 不足しているAIプロバイダー/モデルの追加
- ダッシュボードUIの改善
- 新しいデータソースの提案

## ライセンス

MIT
