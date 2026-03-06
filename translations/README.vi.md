# Theo Doi Gia Mo Hinh AI

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Tự động theo dõi giá mô hình AI hàng ngày trên tất cả các nhà cung cấp lớn. Thu thập thông tin giá cả, khả năng và API thông qua GitHub Actions và trực quan hóa qua bảng điều khiển GitHub Pages.

**[Bảng Điều Khiển Trực Tiếp](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Dữ Liệu Thu Thập

| Trường | Mô tả |
|--------|--------|
| Giá Đầu Vào | Chi phí cho 1M token đầu vào (USD) |
| Giá Đầu Ra | Chi phí cho 1M token đầu ra (USD) |
| Giá Đầu Vào Đã Lưu Cache | Chi phí giảm giá cho 1M token đầu vào đã lưu cache |
| Độ Dài Ngữ Cảnh | Kích thước cửa sổ ngữ cảnh tối đa |
| Thị Giác | Hỗ trợ đầu vào hình ảnh |
| Gọi Hàm (Công Cụ) | Hỗ trợ sử dụng công cụ |

## Tuyên Bố Miễn Trừ Trách Nhiệm

> **Dự án này chỉ nhằm mục đích thông tin.** Dữ liệu giá được thu thập từ các bên tổng hợp bên thứ ba, không phải trực tiếp từ API chính thức của mỗi nhà cung cấp AI. Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, **giá hiển thị ở đây có thể đã lỗi thời, không đầy đủ hoặc không chính xác**. Luôn xác minh giá trên trang giá chính thức của mỗi nhà cung cấp trước khi đưa ra quyết định mua hàng. Dự án này không liên kết với bất kỳ nhà cung cấp AI nào.

## Nguồn Dữ Liệu

Dữ liệu được thu thập từ hai nguồn tổng hợp bên thứ ba. Trường `source` của mỗi mô hình cho biết nguồn gốc của nó. **Không có nhà cung cấp AI nào cung cấp API giá công khai**, vì vậy tất cả dữ liệu giá trong hệ sinh thái (bao gồm các bên tổng hợp này) cuối cùng đều bắt nguồn từ việc đọc thủ công tài liệu chính thức.

### 1. OpenRouter API (Chính)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Vai trò**: Siêu dữ liệu giá và khả năng mô hình theo thời gian thực (Thị Giác, Công Cụ, Độ Dài Ngữ Cảnh, v.v.)
- **Độ chính xác giá**: OpenRouter chuyển tiếp giá chính thức của nhà cung cấp không tính phí phụ (giá chuyển tiếp)
- **Giấy phép**: Tuân theo Điều khoản Dịch vụ của OpenRouter ([ToS](https://openrouter.ai/terms))
- **Lưu ý**: API công khai, nhưng Điều khoản Dịch vụ không cho phép rõ ràng việc phân phối lại dữ liệu. Dự án này ghi nhận nguồn và sử dụng dữ liệu cho mục đích thông tin phi thương mại.

### 2. pydantic/genai-prices (Phụ)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Vai trò**: Giá trực tiếp từ nhà cung cấp, giá cache (đọc/ghi), bổ sung giá theo bậc
- **Độ chính xác giá**: Được duy trì thủ công từ tài liệu chính thức với theo dõi thay đổi giá và phát hiện sai lệch
- **Giấy phép**: **Giấy phép MIT** - miễn phí sử dụng, chỉnh sửa và phân phối lại ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Duy trì bởi**: Đội ngũ [Pydantic](https://github.com/pydantic)

### Tại Sao Không Thu Thập Trực Tiếp Từ Trang Chính Thức?
- Hầu hết các nhà cung cấp AI **không** cung cấp endpoint API giá công khai
- Thu thập dữ liệu từ trang giá chính thức bằng web scraping rất dễ hỏng (cấu trúc HTML thay đổi thường xuyên) và có thể vi phạm Điều khoản Dịch vụ của mỗi nhà cung cấp
- Hai nguồn tổng hợp trên là các nguồn lập trình đáng tin cậy nhất hiện có trong hệ sinh thái
- Để có giá chính xác nhất, luôn tham khảo các trang giá chính thức được liệt kê bên dưới

### Độ Chính Xác & Hạn Chế
- Cả hai nguồn đều **cuối cùng được lấy từ tài liệu chính thức của nhà cung cấp**, nhưng thông qua bên thứ ba
- Giá có thể **đã lỗi thời** - các nhà cung cấp có thể thay đổi giá bất cứ lúc nào mà không cần thông báo
- Một số mô hình có thể có **siêu dữ liệu không đầy đủ** (ví dụ: thiếu giá cache, cờ khả năng không chính xác)
- **Giới hạn gói miễn phí, giới hạn tốc độ và giảm giá theo khối lượng** thường không được ghi nhận
- Phát hiện lỗi? Vui lòng [mở một issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) hoặc [gửi một PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Nhà Cung Cấp Được Theo Dõi & Trang Giá Chính Thức

| Nhà Cung Cấp | URL Giá Chính Thức |
|---------------|-------------------|
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

> Ngoài các nhà cung cấp được liệt kê ở trên, hơn 70 nhà cung cấp khác được tự động thu thập qua OpenRouter và genai-prices.

## Sử Dụng Cục Bộ

Chỉ yêu cầu Node.js 20+. Không có phụ thuộc bên ngoài.

```bash
# Chạy thu thập giá
node scripts/collect-prices.mjs

# Hoặc sử dụng lệnh npm
npm run collect
```

Tệp đầu ra:
- `outputs/YYYY-MM-DD.json` - Ảnh chụp hàng ngày
- `outputs/latest.json` - Dữ liệu mới nhất
- `docs/latest.json` - Cho bảng điều khiển GitHub Pages

## Lược Đồ JSON Đầu Ra

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

- **Lịch trình**: Chạy hàng ngày lúc 06:00 UTC
- **Kích hoạt thủ công**: Có sẵn qua `workflow_dispatch` trong tab Actions
- Dữ liệu thu thập được tự động commit và push

## Tự Lưu Trữ (Thiết Lập Fork)

1. Fork kho lưu trữ này
2. **Settings > Pages > Source**: Chọn `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: Bật `Read and write permissions`
4. Xác minh workflow đã được bật trong tab Actions

## Đóng Góp

Phát hiện lỗi giá, mô hình bị thiếu, hoặc muốn đề xuất nhà cung cấp mới? Chúng tôi hoan nghênh đóng góp:

- **[Mở một Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Báo cáo lỗi, yêu cầu tính năng
- **[Gửi Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Sửa lỗi và cải tiến trực tiếp

Các đóng góp chúng tôi đặc biệt hoan nghênh:
- Sửa lỗi dữ liệu giá
- Bổ sung nhà cung cấp/mô hình AI còn thiếu
- Cải tiến giao diện bảng điều khiển
- Đề xuất nguồn dữ liệu mới

## Giấy Phép

MIT
