# ตัวติดตามราคาโมเดล AI

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

ระบบติดตามราคาโมเดล AI รายวันอัตโนมัติจากผู้ให้บริการรายใหญ่ทั้งหมด รวบรวมข้อมูลราคา ความสามารถ และข้อมูล API ผ่าน GitHub Actions และแสดงผลผ่านแดชบอร์ด GitHub Pages

**[แดชบอร์ดแบบเรียลไทม์](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## ข้อมูลที่รวบรวม

| ฟิลด์ | คำอธิบาย |
|-------|----------|
| ราคาอินพุต | ค่าใช้จ่ายต่อ 1M อินพุตโทเคน (USD) |
| ราคาเอาต์พุต | ค่าใช้จ่ายต่อ 1M เอาต์พุตโทเคน (USD) |
| ราคาอินพุตที่แคช | ค่าใช้จ่ายส่วนลดต่อ 1M อินพุตโทเคนที่แคช |
| ความยาวบริบท | ขนาดหน้าต่างบริบทสูงสุด |
| การมองเห็น | รองรับอินพุตรูปภาพ |
| การเรียกฟังก์ชัน (เครื่องมือ) | รองรับการใช้เครื่องมือ |

## ข้อจำกัดความรับผิดชอบ

> **โปรเจกต์นี้มีวัตถุประสงค์เพื่อให้ข้อมูลเท่านั้น** ข้อมูลราคาถูกรวบรวมจากผู้รวบรวมข้อมูลบุคคลที่สาม ไม่ได้มาจาก API อย่างเป็นทางการของผู้ให้บริการ AI โดยตรง แม้เราจะพยายามให้ข้อมูลถูกต้อง แต่ **ราคาที่แสดงที่นี่อาจล้าสมัย ไม่สมบูรณ์ หรือไม่ถูกต้อง** กรุณาตรวจสอบราคาที่หน้าราคาอย่างเป็นทางการของผู้ให้บริการแต่ละรายก่อนตัดสินใจซื้อ โปรเจกต์นี้ไม่มีความเกี่ยวข้องกับผู้ให้บริการ AI ใดๆ

## แหล่งข้อมูล

ข้อมูลถูกรวบรวมจากแหล่งรวบรวมข้อมูลบุคคลที่สามสองแหล่ง ฟิลด์ `source` ของแต่ละโมเดลระบุแหล่งที่มา **ไม่มีผู้ให้บริการ AI รายใดเสนอ API ราคาสาธารณะ** ดังนั้นข้อมูลราคาทั้งหมดในระบบนิเวศ (รวมถึงผู้รวบรวมข้อมูลเหล่านี้) มาจากการอ่านเอกสารอย่างเป็นทางการด้วยตนเองในท้ายที่สุด

### 1. OpenRouter API (หลัก)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **บทบาท**: ข้อมูลเมตาราคาและความสามารถของโมเดลแบบเรียลไทม์ (การมองเห็น, เครื่องมือ, ความยาวบริบท ฯลฯ)
- **ความแม่นยำของราคา**: OpenRouter ส่งต่อราคาอย่างเป็นทางการจากผู้ให้บริการโดยไม่มีค่าธรรมเนียมเพิ่ม (ราคาส่งต่อ)
- **สัญญาอนุญาต**: อยู่ภายใต้ข้อกำหนดการให้บริการของ OpenRouter ([ToS](https://openrouter.ai/terms))
- **หมายเหตุ**: API สาธารณะ แต่ข้อกำหนดการให้บริการไม่ได้อนุญาตการแจกจ่ายข้อมูลซ้ำอย่างชัดเจน โปรเจกต์นี้ระบุแหล่งที่มาและใช้ข้อมูลเพื่อวัตถุประสงค์ด้านข้อมูลที่ไม่ใช่เชิงพาณิชย์

### 2. pydantic/genai-prices (รอง)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **บทบาท**: ราคาโดยตรงจากผู้ให้บริการ ราคาแคช (อ่าน/เขียน) ส่วนเสริมราคาแบบขั้นบันได
- **ความแม่นยำของราคา**: ดูแลด้วยตนเองจากเอกสารอย่างเป็นทางการพร้อมการติดตามการเปลี่ยนแปลงราคาและการตรวจจับความคลาดเคลื่อน
- **สัญญาอนุญาต**: **สัญญาอนุญาต MIT** - ใช้งานฟรี แก้ไข และแจกจ่ายซ้ำได้ ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **ดูแลโดย**: ทีม [Pydantic](https://github.com/pydantic)

### ทำไมไม่ดึงข้อมูลจากหน้าเว็บอย่างเป็นทางการโดยตรง?
- ผู้ให้บริการ AI ส่วนใหญ่ **ไม่มี** endpoint API ราคาสาธารณะ
- การ scrape หน้าราคาอย่างเป็นทางการนั้นเปราะบาง (โครงสร้าง HTML เปลี่ยนแปลงบ่อย) และอาจละเมิดข้อกำหนดการให้บริการของผู้ให้บริการแต่ละราย
- แหล่งรวบรวมข้อมูลสองแหล่งข้างต้นเป็นแหล่งข้อมูลเชิงโปรแกรมที่น่าเชื่อถือที่สุดในระบบนิเวศ
- สำหรับราคาที่เป็นทางการ กรุณาอ้างอิงจากหน้าราคาอย่างเป็นทางการที่ระบุด้านล่างเสมอ

### ความแม่นยำและข้อจำกัด
- ทั้งสองแหล่ง **มาจากเอกสารอย่างเป็นทางการของผู้ให้บริการในท้ายที่สุด** แต่ผ่านบุคคลที่สาม
- ราคาอาจ **ล้าสมัย** - ผู้ให้บริการสามารถเปลี่ยนแปลงราคาได้ตลอดเวลาโดยไม่ต้องแจ้งล่วงหน้า
- บางโมเดลอาจมี **ข้อมูลเมตาที่ไม่สมบูรณ์** (เช่น ราคาแคชที่ขาดหาย ค่าสถานะความสามารถที่ไม่ถูกต้อง)
- **ขีดจำกัดของแพ็กเกจฟรี ขีดจำกัดอัตรา และส่วนลดตามปริมาณ** โดยทั่วไปจะไม่ถูกบันทึก
- พบข้อผิดพลาด? กรุณา [เปิด issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) หรือ [ส่ง PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## ผู้ให้บริการที่ติดตามและหน้าราคาอย่างเป็นทางการ

| ผู้ให้บริการ | URL ราคาอย่างเป็นทางการ |
|-------------|------------------------|
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

> นอกเหนือจากผู้ให้บริการที่ระบุข้างต้น มีผู้ให้บริการอีกกว่า 70 รายที่ถูกรวบรวมโดยอัตโนมัติผ่าน OpenRouter และ genai-prices

## การใช้งานในเครื่อง

ต้องการเพียง Node.js 20+ ไม่มีการพึ่งพาภายนอก

```bash
# เรียกใช้การรวบรวมราคา
node scripts/collect-prices.mjs

# หรือใช้สคริปต์ npm
npm run collect
```

ไฟล์เอาต์พุต:
- `outputs/YYYY-MM-DD.json` - สแนปช็อตรายวัน
- `outputs/latest.json` - ข้อมูลล่าสุด
- `docs/latest.json` - สำหรับแดชบอร์ด GitHub Pages

## สคีมา JSON เอาต์พุต

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

- **กำหนดการ**: ทำงานทุกวันเวลา 06:00 UTC
- **ทริกเกอร์ด้วยตนเอง**: ใช้งานได้ผ่าน `workflow_dispatch` ในแท็บ Actions
- ข้อมูลที่รวบรวมจะถูก commit และ push โดยอัตโนมัติ

## โฮสต์ด้วยตนเอง (การตั้งค่า Fork)

1. Fork คลังเก็บนี้
2. **Settings > Pages > Source**: เลือก `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: เปิดใช้งาน `Read and write permissions`
4. ตรวจสอบว่า workflow เปิดใช้งานแล้วในแท็บ Actions

## การมีส่วนร่วม

พบข้อผิดพลาดด้านราคา โมเดลที่ขาดหาย หรือต้องการเสนอผู้ให้บริการใหม่? เรายินดีรับการมีส่วนร่วม:

- **[เปิด Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - รายงานข้อผิดพลาด คำขอฟีเจอร์
- **[ส่ง Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - การแก้ไขและปรับปรุงโดยตรง

การมีส่วนร่วมที่เรายินดีเป็นพิเศษ:
- การแก้ไขข้อมูลราคา
- การเพิ่มผู้ให้บริการ/โมเดล AI ที่ขาดหาย
- การปรับปรุง UI แดชบอร์ด
- ข้อเสนอแนะแหล่งข้อมูลใหม่

## สัญญาอนุญาต

MIT
