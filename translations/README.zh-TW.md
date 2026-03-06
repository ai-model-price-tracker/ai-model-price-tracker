# AI模型價格追蹤器

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

自動每日追蹤所有主要供應商的AI模型定價。透過GitHub Actions收集定價、功能和API資訊，並透過GitHub Pages儀表板進行視覺化展示。

**[線上儀表板](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## 收集的資料

| 欄位 | 說明 |
|------|------|
| 輸入價格 | 每100萬輸入token的費用（美元） |
| 輸出價格 | 每100萬輸出token的費用（美元） |
| 快取輸入價格 | 每100萬快取輸入token的折扣費用 |
| 上下文長度 | 最大上下文視窗大小 |
| 視覺 | 圖片輸入支援 |
| 函式呼叫（Tools） | 工具使用支援 |

## 免責聲明

> **本專案僅供參考。** 價格資料是從第三方聚合器收集的，而非直接來自各AI供應商的官方API。雖然我們努力確保準確性，但**此處顯示的價格可能已過時、不完整或不正確**。在做出購買決策之前，請務必在各供應商的官方定價頁面上進行驗證。本專案與任何AI供應商無關聯。

## 資料來源

資料從兩個第三方聚合器來源收集。每個模型的 `source` 欄位標明其來源。**沒有任何AI供應商提供公開的定價API**，因此生態系統中的所有定價資料（包括這些聚合器）最終都源於手動閱讀官方文件。

### 1. OpenRouter API（主要）

- **端點**: `GET https://openrouter.ai/api/v1/models`
- **角色**: 即時模型定價和功能中繼資料（Vision、Tools、Context Length等）
- **價格準確性**: OpenRouter以無加價方式直接傳遞官方供應商價格（透傳定價）
- **授權**: 受OpenRouter服務條款約束（[ToS](https://openrouter.ai/terms)）
- **說明**: 公開API，但服務條款未明確允許資料再分發。本專案標註了資料來源，並將資料用於非商業資訊目的。

### 2. pydantic/genai-prices（輔助）

- **端點**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **角色**: 直接供應商定價、快取定價（讀/寫）、分級定價補充
- **價格準確性**: 根據官方文件手動維護，具有價格變動追蹤和差異偵測功能
- **授權**: **MIT授權** - 可自由使用、修改和再分發（[LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE)）
- **維護者**: [Pydantic](https://github.com/pydantic) 團隊

### 為什麼不直接抓取官方頁面？

- 大多數AI供應商**不提供**公開的定價API端點
- 抓取官方定價頁面非常脆弱（HTML結構經常變化），且可能違反各供應商的服務條款
- 上述兩個聚合器來源是生態系統中最可靠的程式化資料來源
- 如需權威定價資訊，請務必參考下方列出的官方定價頁面

### 準確性與限制

- 兩個來源**最終都源自官方供應商文件**，但透過第三方收集
- 價格可能**已過時** - 供應商可能隨時更改價格而不另行通知
- 部分模型可能存在**不完整的中繼資料**（例如：缺少快取定價、功能標記不正確）
- **免費層限制、速率限制和批量折扣**通常未被包含
- 發現錯誤？請[提交Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)或[提交PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## 追蹤的供應商及官方定價頁面

| 供應商 | 官方定價URL |
|--------|------------|
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

> 除上述供應商外，還透過OpenRouter和genai-prices自動收集了70多個供應商的資料。

## 本地使用

僅需Node.js 20+。零外部相依性。

```bash
# 執行價格收集
node scripts/collect-prices.mjs

# 或使用npm腳本
npm run collect
```

輸出檔案：
- `outputs/YYYY-MM-DD.json` - 每日快照
- `outputs/latest.json` - 最新資料
- `docs/latest.json` - 用於GitHub Pages儀表板

## 輸出JSON結構

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

- **排程**: 每天UTC 06:00執行
- **手動觸發**: 可在Actions分頁透過 `workflow_dispatch` 觸發
- 收集的資料會自動提交並推送

## 自行託管（Fork設定）

1. Fork此儲存庫
2. **Settings > Pages > Source**: 選擇 `Deploy from a branch`，Branch: `main`，Folder: `/docs`
3. **Settings > Actions > General**: 啟用 `Read and write permissions`
4. 在Actions分頁中確認工作流程已啟用

## 貢獻

發現定價錯誤、缺失的模型，或想建議新的供應商？歡迎貢獻：

- **[提交Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - 錯誤回報、功能請求
- **[提交Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - 直接修復和改進

我們特別歡迎以下貢獻：
- 定價資料修正
- 新增缺失的AI供應商/模型
- 儀表板UI改進
- 新資料來源建議

## 授權

MIT
