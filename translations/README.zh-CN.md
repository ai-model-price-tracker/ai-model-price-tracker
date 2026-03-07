<p align="center">
  <h1 align="center">AI 模型价格追踪器</h1>
  <p align="center">
    自动每日追踪100多个提供商的AI模型定价。
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>在线仪表板 »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">报告价格错误</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">请求添加提供商</a>
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

> **免责声明：** 本项目仅供参考。价格数据通过自动抓取第三方聚合器和官方页面收集。虽然我们力求准确，但**价格可能已过时、不完整或不正确**。在做出决策之前，请务必在各提供商的官方定价页面上进行验证。本项目与任何AI提供商无关联。

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## 功能

- 每日追踪来自**100多个提供商**的**3,000多个模型**
- **4个数据源** — 3个社区API + 通过Playwright抓取官方页面
- **官方价格验证** — 直接抓取OpenAI、Anthropic、Google、DeepSeek、AWS Bedrock
- **零配置CI** — 在Playwright Docker容器中运行，无需API密钥
- **免费JSON API** — 在您自己的项目中使用GitHub Pages上的`latest.json`
- **交互式仪表板** — 搜索、筛选、排序、比较价格，支持国际化（18种语言）
- **故障恢复能力** — 优雅降级、保留历史数据、失败时自动创建Issue

## 使用数据

最新的定价数据以JSON格式免费提供，无需安装：

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// 查找所有OpenAI模型
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

## 面向LLM

您可以通过在系统提示词中添加以下内容，让LLM访问实时AI模型定价数据：

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

## 工作原理

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

## 数据来源

| # | 来源 | 类型 | 模型数 | 许可证 |
|---|------|------|--------|--------|
| 1 | 官方页面 (Playwright) | 网页抓取 | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [服务条款](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**合并优先级：** 官方抓取价格覆盖聚合器价格。OpenRouter是API数据的主要来源，genai-prices和LiteLLM补充缓存价格和功能元数据。

### 官方页面抓取器

每个抓取器作为单独文件存放在[`scripts/scrapers/`](scripts/scrapers/)下，便于维护：

| 文件 | 提供商 | 状态 |
|------|--------|------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**添加新抓取器：** 在`scripts/scrapers/`中创建一个导出`name`、`url`和`scrape(page)`的新文件，然后在[`scrape-official.mjs`](scripts/scrape-official.mjs)中导入。

### 准确性与局限性

- 所有来源**最终都源自官方文档**，直接或通过第三方收集
- 价格可能**已过时** — 提供商可能随时更改价格而不另行通知
- 部分模型可能存在**不完整的元数据**（缺少缓存价格、功能标记不正确）
- **免费层限制、速率限制和批量折扣**通常未被包含
- 如果提供商重新设计其定价页面，官方抓取可能会中断

发现错误？请[提交Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)或[提交PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)。

## 术语表

| 术语 | 说明 |
|------|------|
| **Token（令牌）** | AI模型处理文本的基本单位。中文约1个token≈1~2个汉字。价格按每100万个token显示。 |
| **输入token** | 发送给模型的文本/数据（提示词、上下文、指令）。 |
| **输出token** | 模型生成的回复文本。通常比输入更贵。 |
| **上下文窗口** | 模型在一次对话中可处理的最大token数（输入+输出合计）。 |
| **缓存输入** | 重复使用相同提示前缀时的折扣价格。 |
| **批量定价** | 面向非紧急大批量请求的折扣定价。响应可能需要数小时，但成本大幅降低。 |
| **函数调用** | 模型在生成过程中调用外部工具或API的能力。 |
| **视觉** | 模型处理和理解图像输入的能力。 |

## 收集的数据

| 字段 | 描述 |
|------|------|
| `input_price_per_1m` | 每100万输入token的费用（美元） |
| `output_price_per_1m` | 每100万输出token的费用（美元） |
| `cached_input_price_per_1m` | 每100万缓存输入token的折扣费用 |
| `context_length` | 最大上下文窗口大小（token数） |
| `supports_vision` | 模型是否能处理图像输入 |
| `supports_function_calling` | 模型是否能调用外部工具/函数 |
| `source` | 数据来源（`openrouter`、`genai-prices`、`litellm`、`official`） |

## 追踪的提供商

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

通过OpenRouter、genai-prices和LiteLLM自动收集**100多个额外提供商**。

## GitHub Actions

| 项目 | 详情 |
|------|------|
| **计划** | 每天UTC 06:00 |
| **手动触发** | 在Actions选项卡中使用`workflow_dispatch` |
| **容器** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **流水线** | `scrape` → `collect` → `validate` → `commit` |
| **失败时** | 自动创建GitHub Issue（`collection-failure`标签） |
| **数据安全** | 所有来源失败时保留历史数据 |

## 自托管

1. **Fork**此仓库
2. **Settings > Pages** — Source: `Deploy from a branch`，Branch: `main`，Folder: `/docs`
3. **Settings > Actions > General** — 启用`Read and write permissions`
4. 在**Actions**选项卡中确认工作流已启用
5. （可选）通过**Actions > Collect AI Model Prices > Run workflow**手动触发

### 本地运行

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # 抓取官方定价页面
npm run collect     # 从API收集 + 合并抓取数据
npm run validate    # 验证输出
```

输出：`outputs/latest.json`、`outputs/YYYY-MM-DD.json`、`docs/latest.json`

## 贡献

欢迎贡献！您可以通过以下方式帮助：

- **价格纠正** — 发现了错误的价格？[提交Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)或提交PR
- **新抓取器** — 为尚未覆盖的提供商添加抓取器（[如何添加](#官方页面抓取器)）
- **新数据来源** — 知道其他定价聚合器？请告诉我们
- **仪表板改进** — UI增强、新的可视化、无障碍修复
- **缺失的提供商** — 请求或添加对新AI提供商的支持

已知任务列表请查看[开放Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)。

## 许可证

本项目的**源代码**基于MIT许可证分发。详情请参阅[`LICENSE`](LICENSE)。

> **数据声明：** 定价数据（JSON文件）从包括[OpenRouter](https://openrouter.ai/terms)和官方提供商页面在内的第三方来源聚合而成。每个来源受其各自的服务条款约束。**未经独立验证并遵守各原始来源的条款，收集的数据不得用于商业目的。**详情请参阅[`LICENSE`](LICENSE)。

---

<p align="center">
  使用GitHub Actions构建 · 无需API密钥 · 每日更新
</p>
