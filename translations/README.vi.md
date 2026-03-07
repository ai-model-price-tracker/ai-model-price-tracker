<p align="center">
  <h1 align="center">Theo Dõi Giá Mô Hình AI</h1>
  <p align="center">
    Tự động theo dõi giá mô hình AI hàng ngày trên hơn 100 nhà cung cấp.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Bảng Điều Khiển Trực Tiếp »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Báo Cáo Giá Sai</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Yêu Cầu Nhà Cung Cấp</a>
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

> **Tuyên bố miễn trừ trách nhiệm:** Dự án này chỉ nhằm mục đích cung cấp thông tin. Dữ liệu giá được thu thập từ các bên tổng hợp bên thứ ba và các trang chính thức thông qua scraping tự động. Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, **giá có thể đã lỗi thời, không đầy đủ hoặc không chính xác**. Luôn xác minh trên trang giá chính thức của từng nhà cung cấp trước khi đưa ra quyết định. Dự án này không liên kết với bất kỳ nhà cung cấp AI nào.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Tính Năng

- **Hơn 3.000 mô hình** từ **hơn 100 nhà cung cấp** được theo dõi hàng ngày
- **4 nguồn dữ liệu** — 3 API cộng đồng + scraping trang chính thức qua Playwright
- **Xác minh giá chính thức** — scrape trực tiếp OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI không cần cấu hình** — chạy trong container Docker Playwright, không cần API key
- **JSON API miễn phí** — sử dụng `latest.json` từ GitHub Pages trong dự án của bạn
- **Bảng điều khiển tương tác** — tìm kiếm, lọc, sắp xếp, so sánh giá với hỗ trợ i18n (18 ngôn ngữ)
- **Khả năng chịu lỗi** — suy giảm duyên dáng, dữ liệu trước đó được bảo toàn, tự động tạo issue khi thất bại

## Sử Dụng Dữ Liệu

Dữ liệu giá mới nhất có sẵn miễn phí dưới dạng JSON — không cần cài đặt:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Tìm tất cả mô hình OpenAI
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

## Dành Cho LLM

Bạn có thể cấp cho LLM quyền truy cập dữ liệu giá mô hình AI thời gian thực bằng cách thêm nội dung sau vào system prompt:

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

## Cách Hoạt Động

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

## Nguồn Dữ Liệu

| # | Nguồn | Loại | Mô hình | Giấy phép |
|---|-------|------|---------|-----------|
| 1 | Trang chính thức (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ĐKDv](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Ưu tiên hợp nhất:** Giá scrape chính thức ghi đè giá từ bên tổng hợp. OpenRouter là nguồn chính cho dữ liệu API, genai-prices và LiteLLM bổ sung giá cache và metadata khả năng.

### Scraper trang chính thức
Mỗi scraper là một tệp riêng biệt trong [`scripts/scrapers/`](scripts/scrapers/) để dễ bảo trì:

| Tệp | Nhà cung cấp | Trạng thái |
|-----|--------------|------------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | Hoạt động |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | Hoạt động |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | Hoạt động |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | Hoạt động |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | Hoạt động |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — fallback sang API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — fallback sang API |

**Thêm scraper mới:** Tạo tệp mới trong `scripts/scrapers/` export `name`, `url`, và `scrape(page)`, sau đó import vào [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Độ chính xác và hạn chế
- Tất cả các nguồn đều **được lấy từ tài liệu chính thức**, trực tiếp hoặc thông qua bên thứ ba
- Giá có thể **đã lỗi thời** — các nhà cung cấp có thể thay đổi giá bất cứ lúc nào mà không cần thông báo
- Một số mô hình có thể có **metadata không đầy đủ** (thiếu giá cache, cờ khả năng không chính xác)
- **Giới hạn gói miễn phí, giới hạn tốc độ và giảm giá theo khối lượng** thường không được ghi nhận
- Scraping chính thức có thể bị hỏng khi nhà cung cấp thiết kế lại trang giá

Phát hiện lỗi? Vui lòng [mở một issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) hoặc [gửi một PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Thuật Ngữ

| Thuật ngữ | Mô tả |
|-----------|-------|
| **Token** | Đơn vị cơ bản mà mô hình AI sử dụng để xử lý văn bản. 1 token ≈ 3/4 một từ. Giá được hiển thị theo 1 triệu token. |
| **Token đầu vào** | Văn bản/dữ liệu gửi đến mô hình (prompt, ngữ cảnh, hướng dẫn). |
| **Token đầu ra** | Văn bản mô hình tạo ra để phản hồi. Thường đắt hơn đầu vào. |
| **Cửa sổ ngữ cảnh** | Số token tối đa mà mô hình có thể xử lý trong một cuộc hội thoại (đầu vào + đầu ra). |
| **Đầu vào được cache** | Giá chiết khấu khi tái sử dụng cùng tiền tố prompt giữa các yêu cầu. |
| **Giá theo lô** | Giá chiết khấu cho các yêu cầu hàng loạt không khẩn cấp được xử lý bất đồng bộ. |
| **Gọi hàm** | Khả năng của mô hình gọi công cụ bên ngoài hoặc API trong quá trình tạo. |
| **Thị giác** | Khả năng của mô hình xử lý và hiểu hình ảnh đầu vào. |

## Dữ Liệu Thu Thập

| Trường | Mô tả |
|--------|-------|
| `input_price_per_1m` | Chi phí cho 1M token đầu vào (USD) |
| `output_price_per_1m` | Chi phí cho 1M token đầu ra (USD) |
| `cached_input_price_per_1m` | Chi phí giảm giá cho 1M token đầu vào đã cache |
| `context_length` | Kích thước cửa sổ ngữ cảnh tối đa (tính bằng token) |
| `supports_vision` | Mô hình có thể xử lý đầu vào hình ảnh hay không |
| `supports_function_calling` | Mô hình có thể gọi công cụ/hàm bên ngoài hay không |
| `source` | Nguồn dữ liệu (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Nhà Cung Cấp Được Theo Dõi

### 16 nhà cung cấp lớn với URL giá chính thức
| Nhà cung cấp | Giá chính thức |
|--------------|----------------|
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

Cùng với **hơn 100 nhà cung cấp bổ sung** được thu thập tự động qua OpenRouter, genai-prices và LiteLLM.

## GitHub Actions

| Tính năng | Chi tiết |
|-----------|----------|
| **Lịch trình** | Hàng ngày lúc 06:00 UTC |
| **Kích hoạt thủ công** | `workflow_dispatch` trong tab Actions |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **Khi thất bại** | Tự động tạo GitHub Issue (nhãn `collection-failure`) |
| **An toàn dữ liệu** | Dữ liệu trước đó được bảo toàn nếu tất cả nguồn thất bại |

## Tự Lưu Trữ

1. **Fork** kho lưu trữ này
2. **Settings > Pages** — Nguồn: `Deploy from a branch`, Nhánh: `main`, Thư mục: `/docs`
3. **Settings > Actions > General** — Bật `Read and write permissions`
4. Xác minh workflow đã được bật trong tab **Actions**
5. (Tùy chọn) Kích hoạt thủ công qua **Actions > Collect AI Model Prices > Run workflow**

### Chạy cục bộ
```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Scrape các trang giá chính thức
npm run collect     # Thu thập từ API + hợp nhất dữ liệu scrape
npm run validate    # Xác thực đầu ra
```

Đầu ra: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Đóng Góp

Chúng tôi hoan nghênh đóng góp! Dưới đây là cách bạn có thể giúp:

- **Sửa giá** — Phát hiện giá sai? [Mở một issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) hoặc gửi PR
- **Scraper mới** — Thêm scraper cho nhà cung cấp chưa được hỗ trợ ([cách thêm](#scraper-trang-chính-thức))
- **Nguồn dữ liệu mới** — Biết thêm bên tổng hợp giá nào khác? Hãy cho chúng tôi biết
- **Cải tiến bảng điều khiển** — Nâng cao giao diện, trực quan hóa mới, sửa lỗi trợ năng
- **Nhà cung cấp còn thiếu** — Yêu cầu hoặc thêm hỗ trợ cho nhà cung cấp AI mới

Xem [các issue đang mở](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) để biết danh sách các tác vụ đã biết.

## Giấy Phép

**Mã nguồn** của dự án này được phân phối theo Giấy phép MIT. Xem [`LICENSE`](LICENSE) để biết thêm thông tin.

> **Thông báo về dữ liệu:** Dữ liệu giá (tệp JSON) được tổng hợp từ các nguồn bên thứ ba bao gồm [OpenRouter](https://openrouter.ai/terms) và các trang chính thức của nhà cung cấp. Mỗi nguồn tuân theo điều khoản dịch vụ riêng. **Dữ liệu thu thập không được sử dụng cho mục đích thương mại** mà không xác minh và tuân thủ độc lập các điều khoản của từng nguồn gốc. Xem [`LICENSE`](LICENSE) để biết chi tiết.

---

<p align="center">
  Được tạo với GitHub Actions · Không cần API key · Cập nhật hàng ngày
</p>
