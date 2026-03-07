<p align="center">
  <h1 align="center">AI 模型價格追蹤器</h1>
  <p align="center">
    自動每日追蹤 100+ 供應商的 AI 模型定價。
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>線上儀表板 »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">回報價格錯誤</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">請求新增供應商</a>
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

> **免責聲明：** 本專案僅供資訊參考之用。定價資料透過自動化爬蟲從第三方聚合器及官方頁面收集。雖然我們力求準確，但**價格可能已過時、不完整或不正確**。在做出決策之前，請務必在各供應商的官方定價頁面上進行驗證。本專案與任何 AI 供應商無關聯。

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## 功能特色

- **3,000+ 模型**，來自 **100+ 供應商**，每日追蹤
- **4 個資料來源** — 3 個社群 API + 透過 Playwright 進行官方頁面爬蟲
- **官方價格驗證** — 直接爬取 OpenAI、Anthropic、Google、DeepSeek、AWS Bedrock
- **零配置 CI** — 在 Playwright Docker 容器中執行，無需 API 金鑰
- **免費 JSON API** — 在您的專案中使用 GitHub Pages 上的 `latest.json`
- **互動式儀表板** — 搜尋、篩選、排序、比較價格，支援國際化（18 種語言）
- **故障韌性** — 優雅降級，保留先前資料，失敗時自動建立 Issue

## 使用資料

最新的定價資料以 JSON 格式免費提供，無需安裝：

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// 尋找所有 OpenAI 模型
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

## 供 LLM 使用

您可以透過在系統提示詞中加入以下內容，讓 LLM 存取即時的 AI 模型定價資料：

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

## 運作方式

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

## 資料來源

| # | 來源 | 類型 | 模型數量 | 授權 |
|---|------|------|----------|------|
| 1 | 官方頁面 (Playwright) | 網頁爬蟲 | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**合併優先順序：** 官方爬取的價格優先於聚合器價格。OpenRouter 為 API 資料的主要來源，genai-prices 和 LiteLLM 補充快取定價及功能中繼資料。

### 官方頁面爬蟲

每個爬蟲都是 [`scripts/scrapers/`](scripts/scrapers/) 下的獨立檔案，方便維護：

| 檔案 | 供應商 | 狀態 |
|------|--------|------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | 運作中 |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | 運作中 |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | 運作中 |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | 運作中 |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | 運作中 |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — 回退至 API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — 回退至 API |

**新增爬蟲：** 在 `scripts/scrapers/` 中建立新檔案，匯出 `name`、`url` 和 `scrape(page)`，然後在 [`scrape-official.mjs`](scripts/scrape-official.mjs) 中匯入。

### 準確性與限制

- 所有來源**最終都源自官方文件**，無論是直接取得或透過第三方
- 價格可能**已過時** — 供應商可能隨時更改價格而不另行通知
- 部分模型可能存在**不完整的中繼資料**（缺少快取定價、功能標記不正確）
- **免費層限制、速率限制和批量折扣**通常未被包含
- 官方爬蟲可能在供應商重新設計定價頁面時失效

發現錯誤？請[提交 Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) 或[提交 PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)。

## 術語表

| 術語 | 說明 |
|------|------|
| **Token（令牌）** | AI模型處理文字的基本單位。中文約1個token≈1~2個字。價格按每100萬個token顯示。 |
| **輸入token** | 傳送給模型的文字/資料（提示詞、上下文、指令）。 |
| **輸出token** | 模型生成的回覆文字。通常比輸入更貴。 |
| **上下文視窗** | 模型在一次對話中可處理的最大token數（輸入+輸出合計）。 |
| **快取輸入** | 重複使用相同提示前綴時的折扣價格。 |
| **批次定價** | 面向非緊急大批量請求的折扣定價。回應可能需要數小時，但成本大幅降低。 |
| **函數呼叫** | 模型在生成過程中呼叫外部工具或API的能力。 |
| **視覺** | 模型處理和理解圖片輸入的能力。 |

## 收集的資料

| 欄位 | 說明 |
|------|------|
| `input_price_per_1m` | 每 100 萬輸入 token 的費用（美元） |
| `output_price_per_1m` | 每 100 萬輸出 token 的費用（美元） |
| `cached_input_price_per_1m` | 每 100 萬快取輸入 token 的折扣費用 |
| `context_length` | 最大上下文視窗大小（token數） |
| `supports_vision` | 模型是否能處理圖片輸入 |
| `supports_function_calling` | 模型是否能呼叫外部工具/函數 |
| `source` | 資料來源（`openrouter`、`genai-prices`、`litellm`、`official`） |

## 追蹤的供應商

| 供應商 | 官方定價 |
|--------|----------|
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

另外還有 **100+ 供應商**透過 OpenRouter、genai-prices 和 LiteLLM 自動收集。

## GitHub Actions

| 功能 | 詳情 |
|------|------|
| **排程** | 每日 UTC 06:00 |
| **手動觸發** | 在 Actions 分頁使用 `workflow_dispatch` |
| **容器** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **流程** | `scrape` → `collect` → `validate` → `commit` |
| **失敗時** | 自動建立 GitHub Issue（`collection-failure` 標籤） |
| **資料安全** | 當所有來源失敗時保留先前資料 |

## 自行託管

1. **Fork** 此儲存庫
2. **Settings > Pages** — 來源：`Deploy from a branch`，分支：`main`，資料夾：`/docs`
3. **Settings > Actions > General** — 啟用 `Read and write permissions`
4. 在 **Actions** 分頁確認工作流程已啟用
5. （選擇性）透過 **Actions > Collect AI Model Prices > Run workflow** 手動觸發

### 本地執行

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # 爬取官方定價頁面
npm run collect     # 從 API 收集 + 合併爬取的資料
npm run validate    # 驗證輸出
```

輸出：`outputs/latest.json`、`outputs/YYYY-MM-DD.json`、`docs/latest.json`

## 貢獻

歡迎貢獻！以下是您可以幫忙的方式：

- **價格修正** — 發現錯誤的價格？[提交 Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) 或提交 PR
- **新增爬蟲** — 為尚未涵蓋的供應商新增爬蟲（[如何新增](#官方頁面爬蟲)）
- **新增資料來源** — 知道其他定價聚合器？請告訴我們
- **儀表板改進** — UI 強化、新的視覺化功能、無障礙修復
- **缺少的供應商** — 請求或新增對新 AI 供應商的支援

查看[開放的 Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) 以瞭解已知任務清單。

## 授權

本專案的**原始碼**以 MIT 授權條款發佈。詳情請參閱 [`LICENSE`](LICENSE)。

> **資料聲明：** 定價資料（JSON 檔案）彙整自第三方來源，包括 [OpenRouter](https://openrouter.ai/terms) 和官方供應商頁面。每個來源均受其各自的服務條款約束。**未經獨立驗證並遵守各原始來源的條款，收集的資料不得用於商業目的。** 詳情請參閱 [`LICENSE`](LICENSE)。

---

<p align="center">
  使用 GitHub Actions 建置 · 無需 API 金鑰 · 每日更新
</p>
