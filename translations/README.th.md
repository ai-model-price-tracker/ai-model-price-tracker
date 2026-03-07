<p align="center">
  <h1 align="center">ตัวติดตามราคาโมเดล AI</h1>
  <p align="center">
    ระบบติดตามราคาโมเดล AI รายวันอัตโนมัติจากผู้ให้บริการกว่า 100 ราย
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>แดชบอร์ดแบบเรียลไทม์ »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">แจ้งราคาไม่ถูกต้อง</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">ขอเพิ่มผู้ให้บริการ</a>
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

> **ข้อจำกัดความรับผิดชอบ:** โปรเจกต์นี้มีวัตถุประสงค์เพื่อให้ข้อมูลเท่านั้น ข้อมูลราคาถูกรวบรวมจากผู้รวบรวมข้อมูลบุคคลที่สามและหน้าเว็บอย่างเป็นทางการผ่านการ scrape อัตโนมัติ แม้เราจะพยายามให้ข้อมูลถูกต้อง แต่ **ราคาอาจล้าสมัย ไม่สมบูรณ์ หรือไม่ถูกต้อง** กรุณาตรวจสอบราคาที่หน้าราคาอย่างเป็นทางการของผู้ให้บริการแต่ละรายก่อนตัดสินใจ โปรเจกต์นี้ไม่มีความเกี่ยวข้องกับผู้ให้บริการ AI ใดๆ

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## คุณสมบัติ

- **โมเดลกว่า 3,000 รายการ** จาก **ผู้ให้บริการกว่า 100 ราย** ติดตามรายวัน
- **4 แหล่งข้อมูล** — 3 API ชุมชน + scraping หน้าเว็บอย่างเป็นทางการผ่าน Playwright
- **ตรวจสอบราคาอย่างเป็นทางการ** — scrape โดยตรงจาก OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI ไม่ต้องตั้งค่า** — ทำงานใน Playwright Docker container ไม่ต้องใช้ API key
- **JSON API ฟรี** — ใช้ `latest.json` จาก GitHub Pages ในโปรเจกต์ของคุณ
- **แดชบอร์ดแบบโต้ตอบ** — ค้นหา กรอง เรียงลำดับ เปรียบเทียบราคาพร้อมรองรับ i18n (18 ภาษา)
- **ทนทานต่อความล้มเหลว** — ลดระดับอย่างสง่างาม ข้อมูลก่อนหน้าถูกรักษาไว้ สร้าง issue อัตโนมัติเมื่อล้มเหลว

## การใช้ข้อมูล

ข้อมูลราคาล่าสุดพร้อมใช้งานฟรีในรูปแบบ JSON — ไม่ต้องติดตั้ง:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// ค้นหาโมเดล OpenAI ทั้งหมด
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

## สำหรับ LLM

คุณสามารถให้ LLM เข้าถึงข้อมูลราคาโมเดล AI แบบเรียลไทม์ได้โดยเพิ่มข้อความนี้ใน system prompt:

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

## วิธีการทำงาน

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

## แหล่งข้อมูล

| # | แหล่งข้อมูล | ประเภท | โมเดล | สัญญาอนุญาต |
|---|-------------|--------|-------|-------------|
| 1 | หน้าเว็บอย่างเป็นทางการ (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ข้อกำหนด](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**ลำดับความสำคัญในการรวม:** ราคาที่ scrape จากแหล่งอย่างเป็นทางการจะแทนที่ราคาจากผู้รวบรวม OpenRouter เป็นแหล่งหลักสำหรับข้อมูล API ส่วน genai-prices และ LiteLLM เสริมข้อมูลราคาแคชและ metadata ด้านความสามารถ

### Scraper หน้าเว็บอย่างเป็นทางการ

Scraper แต่ละตัวเป็นไฟล์แยกภายใต้ [`scripts/scrapers/`](scripts/scrapers/) เพื่อความสะดวกในการดูแลรักษา:

| ไฟล์ | ผู้ให้บริการ | สถานะ |
|------|-------------|-------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ใช้งานได้ |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ใช้งานได้ |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ใช้งานได้ |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ใช้งานได้ |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ใช้งานได้ |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — fallback ไปยัง API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — fallback ไปยัง API |

**เพิ่ม scraper ใหม่:** สร้างไฟล์ใหม่ใน `scripts/scrapers/` ที่ export `name`, `url` และ `scrape(page)` จากนั้น import ใน [`scrape-official.mjs`](scripts/scrape-official.mjs)

### ความแม่นยำและข้อจำกัด

- แหล่งข้อมูลทั้งหมด **มาจากเอกสารอย่างเป็นทางการในท้ายที่สุด** โดยตรงหรือผ่านบุคคลที่สาม
- ราคาอาจ **ล้าสมัย** — ผู้ให้บริการสามารถเปลี่ยนแปลงราคาได้ตลอดเวลาโดยไม่ต้องแจ้งล่วงหน้า
- บางโมเดลอาจมี **metadata ที่ไม่สมบูรณ์** (ราคาแคชที่ขาดหาย ค่าสถานะความสามารถที่ไม่ถูกต้อง)
- **ขีดจำกัดของแพ็กเกจฟรี ขีดจำกัดอัตรา และส่วนลดตามปริมาณ** โดยทั่วไปจะไม่ถูกบันทึก
- การ scraping อย่างเป็นทางการอาจใช้งานไม่ได้เมื่อผู้ให้บริการออกแบบหน้าราคาใหม่

พบข้อผิดพลาด? กรุณา [เปิด issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) หรือ [ส่ง PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## อภิธานศัพท์

| คำศัพท์ | คำอธิบาย |
|---------|----------|
| **โทเค็น (Token)** | หน่วยพื้นฐานที่โมเดล AI ใช้ในการประมวลผลข้อความ 1 โทเค็น ≈ 3/4 ของคำ ราคาแสดงต่อ 1 ล้านโทเค็น |
| **โทเค็นอินพุต** | ข้อความ/ข้อมูลที่ส่งไปยังโมเดล (พรอมต์ บริบท คำสั่ง) |
| **โทเค็นเอาต์พุต** | ข้อความที่โมเดลสร้างขึ้นเป็นคำตอบ โดยทั่วไปแพงกว่าอินพุต |
| **หน้าต่างบริบท** | จำนวนโทเค็นสูงสุดที่โมเดลสามารถประมวลผลได้ในการสนทนาเดียว (อินพุต + เอาต์พุตรวม) |
| **อินพุตแคช** | ราคาส่วนลดเมื่อใช้คำนำหน้าพรอมต์เดิมซ้ำระหว่างคำขอ |
| **ราคาแบบแบตช์** | ราคาส่วนลดสำหรับคำขอจำนวนมากที่ไม่เร่งด่วน การตอบกลับอาจใช้เวลาหลายชั่วโมงแต่ค่าใช้จ่ายลดลงมาก |
| **การเรียกฟังก์ชัน** | ความสามารถของโมเดลในการเรียกใช้เครื่องมือภายนอกหรือ API ระหว่างการสร้าง |
| **วิชัน** | ความสามารถของโมเดลในการประมวลผลและเข้าใจรูปภาพเป็นอินพุต |

## ข้อมูลที่รวบรวม

| ฟิลด์ | คำอธิบาย |
|-------|----------|
| `input_price_per_1m` | ค่าใช้จ่ายต่อ 1M อินพุตโทเคน (USD) |
| `output_price_per_1m` | ค่าใช้จ่ายต่อ 1M เอาต์พุตโทเคน (USD) |
| `cached_input_price_per_1m` | ค่าใช้จ่ายส่วนลดต่อ 1M อินพุตโทเคนที่แคช |
| `context_length` | ขนาดหน้าต่างบริบทสูงสุด (หน่วยเป็นโทเค็น) |
| `supports_vision` | โมเดลสามารถประมวลผลอินพุตรูปภาพได้หรือไม่ |
| `supports_function_calling` | โมเดลสามารถเรียกใช้เครื่องมือ/ฟังก์ชันภายนอกได้หรือไม่ |
| `source` | แหล่งข้อมูล (`openrouter`, `genai-prices`, `litellm`, `official`) |

## ผู้ให้บริการที่ติดตาม

| ผู้ให้บริการ | ราคาอย่างเป็นทางการ |
|-------------|---------------------|
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

รวมถึง **ผู้ให้บริการเพิ่มเติมกว่า 100 ราย** ที่รวบรวมโดยอัตโนมัติผ่าน OpenRouter, genai-prices และ LiteLLM

## GitHub Actions

| คุณสมบัติ | รายละเอียด |
|----------|-----------|
| **กำหนดการ** | ทุกวันเวลา 06:00 UTC |
| **ทริกเกอร์ด้วยตนเอง** | `workflow_dispatch` ในแท็บ Actions |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **เมื่อล้มเหลว** | สร้าง GitHub Issue อัตโนมัติ (ป้ายกำกับ `collection-failure`) |
| **ความปลอดภัยข้อมูล** | ข้อมูลก่อนหน้าถูกรักษาไว้หากแหล่งข้อมูลทั้งหมดล้มเหลว |

## โฮสต์ด้วยตนเอง

1. **Fork** คลังเก็บนี้
2. **Settings > Pages** — แหล่งที่มา: `Deploy from a branch`, สาขา: `main`, โฟลเดอร์: `/docs`
3. **Settings > Actions > General** — เปิดใช้งาน `Read and write permissions`
4. ตรวจสอบว่า workflow เปิดใช้งานแล้วในแท็บ **Actions**
5. (ไม่บังคับ) ทริกเกอร์ด้วยตนเองผ่าน **Actions > Collect AI Model Prices > Run workflow**

### การรันในเครื่อง

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Scrape หน้าราคาอย่างเป็นทางการ
npm run collect     # รวบรวมจาก API + รวมข้อมูลที่ scrape
npm run validate    # ตรวจสอบผลลัพธ์
```

ผลลัพธ์: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## การมีส่วนร่วม

ยินดีรับการมีส่วนร่วม! นี่คือวิธีที่คุณสามารถช่วยได้:

- **แก้ไขราคา** — พบราคาผิด? [เปิด issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) หรือส่ง PR
- **Scraper ใหม่** — เพิ่ม scraper สำหรับผู้ให้บริการที่ยังไม่ครอบคลุม ([วิธีเพิ่ม](#scraper-หน้าเว็บอย่างเป็นทางการ))
- **แหล่งข้อมูลใหม่** — รู้จักผู้รวบรวมราคารายอื่น? แจ้งให้เราทราบ
- **ปรับปรุงแดชบอร์ด** — ปรับปรุง UI การแสดงผลใหม่ แก้ไขการเข้าถึง
- **ผู้ให้บริการที่ขาดหาย** — ขอหรือเพิ่มการรองรับผู้ให้บริการ AI ใหม่

ดู [issue ที่เปิดอยู่](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) สำหรับรายการงานที่ทราบ

## สัญญาอนุญาต

**ซอร์สโค้ด** ของโปรเจกต์นี้เผยแพร่ภายใต้สัญญาอนุญาต MIT ดู [`LICENSE`](LICENSE) สำหรับข้อมูลเพิ่มเติม

> **หมายเหตุเกี่ยวกับข้อมูล:** ข้อมูลราคา (ไฟล์ JSON) ถูกรวบรวมจากแหล่งบุคคลที่สามรวมถึง [OpenRouter](https://openrouter.ai/terms) และหน้าเว็บอย่างเป็นทางการของผู้ให้บริการ แต่ละแหล่งอยู่ภายใต้ข้อกำหนดการให้บริการของตนเอง **ข้อมูลที่รวบรวมไม่สามารถใช้เพื่อวัตถุประสงค์เชิงพาณิชย์** โดยไม่ตรวจสอบและปฏิบัติตามข้อกำหนดของแต่ละแหล่งต้นทางอย่างเป็นอิสระ ดู [`LICENSE`](LICENSE) สำหรับรายละเอียด

---

<p align="center">
  สร้างด้วย GitHub Actions · ไม่ต้องใช้ API key · อัปเดตทุกวัน
</p>
