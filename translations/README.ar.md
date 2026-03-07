<p align="center">
  <h1 align="center">متتبع أسعار نماذج الذكاء الاصطناعي</h1>
  <p align="center">
    متتبع يومي آلي لأسعار نماذج الذكاء الاصطناعي عبر أكثر من 100 مزوّد.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>لوحة المعلومات المباشرة »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">الإبلاغ عن سعر خاطئ</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">طلب إضافة مزوّد</a>
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

> **إخلاء المسؤولية:** هذا المشروع لأغراض معلوماتية فقط. يتم جمع بيانات الأسعار من مُجمِّعات طرف ثالث وصفحات رسمية عبر الاستخراج الآلي. على الرغم من سعينا للدقة، **قد تكون الأسعار قديمة أو غير مكتملة أو غير صحيحة**. تحقق دائمًا من صفحة التسعير الرسمية لكل مزوّد قبل اتخاذ أي قرارات. هذا المشروع غير تابع لأي مزوّد ذكاء اصطناعي.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## الميزات

- **أكثر من 3,000 نموذج** من **أكثر من 100 مزوّد** يتم تتبعها يوميًا
- **4 مصادر بيانات** — 3 واجهات برمجة تطبيقات مجتمعية + استخراج الصفحات الرسمية عبر Playwright
- **التحقق من الأسعار الرسمية** — يستخرج البيانات مباشرة من OpenAI وAnthropic وGoogle وDeepSeek وAWS Bedrock
- **تهيئة تلقائية للتكامل المستمر** — يعمل في حاوية Playwright Docker، لا حاجة لمفاتيح API
- **واجهة JSON API مجانية** — استخدم `latest.json` من GitHub Pages في مشاريعك الخاصة
- **لوحة معلومات تفاعلية** — بحث وتصفية وترتيب ومقارنة الأسعار مع دعم 18 لغة
- **مرونة ضد الأعطال** — تدهور سلس، حفظ البيانات السابقة، إنشاء issue تلقائي عند الفشل

## استخدام البيانات

أحدث بيانات الأسعار متاحة مجانًا بصيغة JSON — لا حاجة للتثبيت:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// البحث عن جميع نماذج OpenAI
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

## لنماذج اللغة الكبيرة

يمكنك منح نموذج اللغة الكبير إمكانية الوصول إلى بيانات أسعار نماذج الذكاء الاصطناعي في الوقت الفعلي عن طريق إضافة هذا إلى موجه النظام:

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

## كيف يعمل

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

## مصادر البيانات

| # | المصدر | النوع | النماذج | الترخيص |
|---|--------|-------|---------|---------|
| 1 | الصفحات الرسمية (Playwright) | استخراج ويب | +200 | غ/م |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | +350 | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | +1,000 | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | +1,800 | MIT |

**أولوية الدمج:** الأسعار المستخرجة من الصفحات الرسمية تتجاوز أسعار المُجمِّعات. OpenRouter هو المصدر الأساسي لبيانات API، بينما genai-prices وLiteLLM يُثريان أسعار التخزين المؤقت وبيانات القدرات الوصفية.

### أدوات استخراج الصفحات الرسمية

كل أداة استخراج هي ملف منفصل تحت [`scripts/scrapers/`](scripts/scrapers/) لسهولة الصيانة:

| الملف | المزوّد | الحالة |
|-------|---------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**إضافة أداة استخراج جديدة:** أنشئ ملفًا جديدًا في `scripts/scrapers/` يصدّر `name` و`url` و`scrape(page)`، ثم استورده في [`scrape-official.mjs`](scripts/scrape-official.mjs).

### الدقة والقيود

- جميع المصادر **مشتقة في النهاية من الوثائق الرسمية**، بشكل مباشر أو عبر أطراف ثالثة
- قد تكون الأسعار **قديمة** — يمكن للمزوّدين تغيير الأسعار في أي وقت دون إشعار مسبق
- قد تحتوي بعض النماذج على **بيانات وصفية غير مكتملة** (أسعار تخزين مؤقت مفقودة، علامات قدرات غير صحيحة)
- **حدود الاستخدام المجاني وحدود المعدل وخصومات الحجم** لا يتم تسجيلها عادةً
- قد يتعطل الاستخراج الرسمي عندما يعيد المزوّدون تصميم صفحات الأسعار

وجدت خطأ؟ يرجى [فتح issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) أو [إرسال PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## المصطلحات

| المصطلح | الوصف |
|---------|-------|
| **التوكن (Token)** | الوحدة الأساسية التي تستخدمها نماذج الذكاء الاصطناعي لمعالجة النص. توكن واحد ≈ 3/4 كلمة. الأسعار لكل مليون توكن. |
| **توكنات الإدخال** | النص/البيانات المُرسلة إلى النموذج (الطلب، السياق، التعليمات). |
| **توكنات الإخراج** | النص الذي يولّده النموذج كاستجابة. عادةً أغلى من الإدخال. |
| **نافذة السياق** | الحد الأقصى من التوكنات التي يمكن للنموذج معالجتها في محادثة واحدة (إدخال + إخراج). |
| **الإدخال المُخزَّن مؤقتاً** | سعر مخفض عند إعادة استخدام نفس بداية الطلب بين الطلبات. |
| **التسعير بالدُفعات** | أسعار مخفضة للطلبات الجماعية غير العاجلة المعالَجة بشكل غير متزامن. |
| **استدعاء الدوال** | قدرة النموذج على استدعاء أدوات خارجية أو واجهات برمجة أثناء التوليد. |
| **الرؤية** | قدرة النموذج على معالجة وفهم الصور كمُدخلات. |

## البيانات المُجمَّعة

| الحقل | الوصف |
|-------|-------|
| `input_price_per_1m` | التكلفة لكل 1 مليون رمز إدخال (بالدولار الأمريكي) |
| `output_price_per_1m` | التكلفة لكل 1 مليون رمز إخراج (بالدولار الأمريكي) |
| `cached_input_price_per_1m` | التكلفة المخفضة لكل 1 مليون رمز إدخال مُخزَّن مؤقتًا |
| `context_length` | الحجم الأقصى لنافذة السياق (بالتوكنات) |
| `supports_vision` | ما إذا كان النموذج يمكنه معالجة الصور كمُدخلات |
| `supports_function_calling` | ما إذا كان النموذج يمكنه استدعاء أدوات/دوال خارجية |
| `source` | مصدر البيانات (`openrouter`، `genai-prices`، `litellm`، `official`) |

## المزوّدون المُتتبَّعون

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

بالإضافة إلى **أكثر من 100 مزوّد إضافي** يتم جمعهم تلقائيًا عبر OpenRouter وgenai-prices وLiteLLM.

## GitHub Actions

| الميزة | التفاصيل |
|--------|----------|
| **الجدولة** | يوميًا في الساعة 06:00 بتوقيت UTC |
| **التشغيل اليدوي** | `workflow_dispatch` في تبويب Actions |
| **الحاوية** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **المسار** | `scrape` → `collect` → `validate` → `commit` |
| **عند الفشل** | إنشاء GitHub Issue تلقائيًا (تصنيف `collection-failure`) |
| **سلامة البيانات** | يتم حفظ البيانات السابقة إذا فشلت جميع المصادر |

## الاستضافة الذاتية

1. قم بعمل **Fork** لهذا المستودع
2. **Settings > Pages** — المصدر: `Deploy from a branch`، الفرع: `main`، المجلد: `/docs`
3. **Settings > Actions > General** — فعّل `Read and write permissions`
4. تحقق من تفعيل سير العمل في تبويب **Actions**
5. (اختياري) شغّل يدويًا عبر **Actions > Collect AI Model Prices > Run workflow**

### التشغيل محليًا

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # استخراج صفحات الأسعار الرسمية
npm run collect     # الجمع من APIs + دمج البيانات المستخرجة
npm run validate    # التحقق من صحة المخرجات
```

المخرجات: `outputs/latest.json`، `outputs/YYYY-MM-DD.json`، `docs/latest.json`

## المساهمة

نرحب بالمساهمات! إليك كيف يمكنك المساعدة:

- **تصحيحات الأسعار** — وجدت سعرًا خاطئًا؟ [افتح issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) أو أرسل PR
- **أدوات استخراج جديدة** — أضف أداة استخراج لمزوّد غير مغطى بعد ([كيفية الإضافة](#أدوات-استخراج-الصفحات-الرسمية))
- **مصادر بيانات جديدة** — تعرف مُجمِّع أسعار آخر؟ أخبرنا
- **تحسينات لوحة المعلومات** — تحسينات واجهة المستخدم، تصورات جديدة، إصلاحات إمكانية الوصول
- **مزوّدون مفقودون** — اطلب أو أضف دعمًا لمزوّدي ذكاء اصطناعي جدد

انظر [المشكلات المفتوحة](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) لقائمة المهام المعروفة.

## الترخيص

**الكود المصدري** لهذا المشروع موزع بموجب ترخيص MIT. انظر [`LICENSE`](LICENSE) لمزيد من المعلومات.

> **ملاحظة حول البيانات:** بيانات الأسعار (ملفات JSON) مُجمَّعة من مصادر طرف ثالث بما في ذلك [OpenRouter](https://openrouter.ai/terms) وصفحات المزوّدين الرسمية. يخضع كل مصدر لشروط خدمته الخاصة. **لا يجوز استخدام البيانات المُجمَّعة لأغراض تجارية** دون التحقق المستقل والامتثال لشروط كل مصدر أصلي. انظر [`LICENSE`](LICENSE) للتفاصيل.

---

<p align="center">
  صُنع باستخدام GitHub Actions · لا حاجة لمفاتيح API · يُحدَّث يوميًا
</p>
