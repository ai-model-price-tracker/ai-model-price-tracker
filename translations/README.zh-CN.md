# AI模型价格追踪器

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

自动每日追踪所有主要提供商的AI模型定价。通过GitHub Actions收集定价、功能和API信息，并通过GitHub Pages仪表板进行可视化展示。

**[在线仪表板](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## 收集的数据

| 字段 | 描述 |
|------|------|
| 输入价格 | 每100万输入token的费用（美元） |
| 输出价格 | 每100万输出token的费用（美元） |
| 缓存输入价格 | 每100万缓存输入token的折扣费用 |
| 上下文长度 | 最大上下文窗口大小 |
| 视觉 | 图像输入支持 |
| 函数调用（Tools） | 工具使用支持 |

## 免责声明

> **本项目仅供参考。** 价格数据是从第三方聚合器收集的，而非直接来自各AI提供商的官方API。虽然我们努力确保准确性，但**此处显示的价格可能已过时、不完整或不正确**。在做出购买决策之前，请务必在各提供商的官方定价页面上进行验证。本项目与任何AI提供商无关联。

## 数据来源

数据从两个第三方聚合器来源收集。每个模型的 `source` 字段标明其来源。**没有任何AI提供商提供公开的定价API**，因此生态系统中的所有定价数据（包括这些聚合器）最终都源于手动阅读官方文档。

### 1. OpenRouter API（主要）

- **端点**: `GET https://openrouter.ai/api/v1/models`
- **作用**: 实时模型定价和功能元数据（Vision、Tools、Context Length等）
- **价格准确性**: OpenRouter以无加价方式直接传递官方提供商价格（透传定价）
- **许可证**: 受OpenRouter服务条款约束（[ToS](https://openrouter.ai/terms)）
- **说明**: 公开API，但服务条款未明确允许数据再分发。本项目标注了数据来源，并将数据用于非商业信息目的。

### 2. pydantic/genai-prices（辅助）

- **端点**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **作用**: 直接提供商定价、缓存定价（读/写）、分级定价补充
- **价格准确性**: 根据官方文档手动维护，具有价格变动追踪和差异检测功能
- **许可证**: **MIT许可证** - 可自由使用、修改和再分发（[LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE)）
- **维护者**: [Pydantic](https://github.com/pydantic) 团队

### 为什么不直接抓取官方页面？

- 大多数AI提供商**不提供**公开的定价API端点
- 抓取官方定价页面非常脆弱（HTML结构经常变化），且可能违反各提供商的服务条款
- 上述两个聚合器来源是生态系统中最可靠的程序化数据来源
- 如需权威定价信息，请始终参考下方列出的官方定价页面

### 准确性与局限性

- 两个来源**最终都源自官方提供商文档**，但通过第三方收集
- 价格可能**已过时** - 提供商可能随时更改价格而不另行通知
- 部分模型可能存在**不完整的元数据**（例如：缺少缓存定价、功能标记不正确）
- **免费层限制、速率限制和批量折扣**通常未被包含
- 发现错误？请[提交Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)或[提交PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## 追踪的提供商及官方定价页面

| 提供商 | 官方定价URL |
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

> 除上述提供商外，还通过OpenRouter和genai-prices自动收集了70多个提供商的数据。

## 本地使用

仅需Node.js 20+。零外部依赖。

```bash
# 运行价格收集
node scripts/collect-prices.mjs

# 或使用npm脚本
npm run collect
```

输出文件：
- `outputs/YYYY-MM-DD.json` - 每日快照
- `outputs/latest.json` - 最新数据
- `docs/latest.json` - 用于GitHub Pages仪表板

## 输出JSON模式

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

- **计划**: 每天UTC 06:00运行
- **手动触发**: 可在Actions选项卡通过 `workflow_dispatch` 触发
- 收集的数据会自动提交并推送

## 自托管（Fork设置）

1. Fork此仓库
2. **Settings > Pages > Source**: 选择 `Deploy from a branch`，Branch: `main`，Folder: `/docs`
3. **Settings > Actions > General**: 启用 `Read and write permissions`
4. 在Actions选项卡中确认工作流已启用

## 贡献

发现定价错误、缺失的模型，或想建议新的提供商？欢迎贡献：

- **[提交Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - 错误报告、功能请求
- **[提交Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - 直接修复和改进

我们特别欢迎以下贡献：
- 定价数据纠正
- 添加缺失的AI提供商/模型
- 仪表板UI改进
- 新数据来源建议

## 许可证

MIT
