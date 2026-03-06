# متتبع أسعار نماذج الذكاء الاصطناعي

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

متتبع يومي آلي لأسعار نماذج الذكاء الاصطناعي عبر جميع المزودين الرئيسيين. يجمع معلومات الأسعار والإمكانيات وواجهات برمجة التطبيقات عبر GitHub Actions ويعرضها من خلال لوحة معلومات GitHub Pages.

**[لوحة المعلومات المباشرة](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## البيانات المُجمَّعة

| الحقل | الوصف |
|-------|-------|
| سعر الإدخال | التكلفة لكل 1 مليون رمز إدخال (بالدولار الأمريكي) |
| سعر الإخراج | التكلفة لكل 1 مليون رمز إخراج (بالدولار الأمريكي) |
| سعر الإدخال المُخزَّن مؤقتاً | التكلفة المخفضة لكل 1 مليون رمز إدخال مُخزَّن مؤقتاً |
| طول السياق | الحجم الأقصى لنافذة السياق |
| الرؤية | دعم إدخال الصور |
| استدعاء الدوال (Tools) | دعم استخدام الأدوات |

## إخلاء المسؤولية

> **هذا المشروع لأغراض معلوماتية فقط.** يتم جمع بيانات الأسعار من مُجمِّعات طرف ثالث، وليس مباشرة من واجهة برمجة التطبيقات الرسمية لكل مزود ذكاء اصطناعي. على الرغم من سعينا للدقة، **قد تكون الأسعار المعروضة هنا قديمة أو غير مكتملة أو غير صحيحة**. تحقق دائمًا من الأسعار على صفحة التسعير الرسمية لكل مزود قبل اتخاذ قرارات الشراء. هذا المشروع غير تابع لأي مزود ذكاء اصطناعي.

## مصادر البيانات

يتم جمع البيانات من مصدرَين مُجمِّعَين من طرف ثالث. يشير حقل `source` لكل نموذج إلى مصدره. **لا يقدم أي مزود ذكاء اصطناعي واجهة برمجة تطبيقات عامة للأسعار**، لذا فإن جميع بيانات التسعير في المنظومة (بما في ذلك هذه المُجمِّعات) مصدرها في النهاية القراءة اليدوية للوثائق الرسمية.

### 1. OpenRouter API (الأساسي)

- **نقطة النهاية**: `GET https://openrouter.ai/api/v1/models`
- **الدور**: أسعار النماذج في الوقت الفعلي وبيانات الإمكانيات الوصفية (Vision، Tools، طول السياق، إلخ.)
- **دقة الأسعار**: ينقل OpenRouter الأسعار الرسمية للمزودين دون أي زيادة (تسعير تمريري)
- **الترخيص**: يخضع لشروط خدمة OpenRouter ([ToS](https://openrouter.ai/terms))
- **ملاحظة**: واجهة برمجة تطبيقات عامة، لكن شروط الخدمة لا تسمح صراحةً بإعادة توزيع البيانات. يذكر هذا المشروع المصدر ويستخدم البيانات لأغراض معلوماتية غير تجارية.

### 2. pydantic/genai-prices (الثانوي)

- **نقطة النهاية**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **الدور**: أسعار المزودين المباشرة، أسعار التخزين المؤقت (قراءة/كتابة)، إضافات الأسعار المتدرجة
- **دقة الأسعار**: يتم الحفاظ عليها يدوياً من الوثائق الرسمية مع تتبع تغييرات الأسعار واكتشاف التناقضات
- **الترخيص**: **ترخيص MIT** - حرية الاستخدام والتعديل وإعادة التوزيع ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **يديره**: فريق [Pydantic](https://github.com/pydantic)

### لماذا لا يتم استخراج البيانات من الصفحات الرسمية مباشرة؟
- معظم مزودي الذكاء الاصطناعي **لا يقدمون نقطة نهاية عامة لواجهة برمجة تطبيقات الأسعار**
- استخراج بيانات صفحات الأسعار الرسمية عبر الويب هش (تتغير بنية HTML بشكل متكرر) وقد ينتهك شروط خدمة كل مزود
- المصدران المُجمِّعان أعلاه هما أكثر المصادر البرمجية موثوقية المتاحة في المنظومة
- للحصول على أسعار موثوقة، ارجع دائمًا إلى صفحات الأسعار الرسمية المدرجة أدناه

### الدقة والقيود
- كلا المصدرين **مشتقان في النهاية من وثائق المزودين الرسمية**، ولكن عبر أطراف ثالثة
- قد تكون الأسعار **قديمة** - يمكن للمزودين تغيير الأسعار في أي وقت دون إشعار مسبق
- قد تحتوي بعض النماذج على **بيانات وصفية غير مكتملة** (مثل: أسعار التخزين المؤقت المفقودة، علامات القدرات غير الصحيحة)
- **حدود الاستخدام المجاني، وحدود المعدل، وخصومات الحجم** لا يتم تسجيلها عادةً
- وجدت خطأ؟ يرجى [فتح issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) أو [إرسال PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## المزودون المُتتبَّعون وصفحات الأسعار الرسمية

| المزود | رابط الأسعار الرسمي |
|--------|---------------------|
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

> بالإضافة إلى المزودين المذكورين أعلاه، يتم جمع أكثر من 70 مزوداً آخر تلقائياً عبر OpenRouter وgenai-prices.

## الاستخدام المحلي

يتطلب فقط Node.js 20+. لا توجد تبعيات خارجية.

```bash
# تشغيل جمع الأسعار
node scripts/collect-prices.mjs

# أو استخدام سكريبت npm
npm run collect
```

ملفات الإخراج:
- `outputs/YYYY-MM-DD.json` - لقطة يومية
- `outputs/latest.json` - أحدث البيانات
- `docs/latest.json` - للوحة معلومات GitHub Pages

## مخطط JSON للإخراج

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

- **الجدولة**: يعمل يومياً في الساعة 06:00 بتوقيت UTC
- **التشغيل اليدوي**: متاح عبر `workflow_dispatch` في تبويب Actions
- يتم حفظ البيانات المُجمَّعة ورفعها تلقائياً

## الاستضافة الذاتية (إعداد Fork)

1. قم بعمل Fork لهذا المستودع
2. **Settings > Pages > Source**: اختر `Deploy from a branch`، الفرع: `main`، المجلد: `/docs`
3. **Settings > Actions > General**: فعّل `Read and write permissions`
4. تحقق من تفعيل سير العمل في تبويب Actions

## المساهمة

وجدت أخطاء في الأسعار، نماذج مفقودة، أو تريد اقتراح مزود جديد؟ نرحب بالمساهمات:

- **[فتح Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - تقارير الأخطاء، طلبات الميزات
- **[إرسال Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - إصلاحات وتحسينات مباشرة

المساهمات المرحب بها بشكل خاص:
- تصحيحات بيانات الأسعار
- إضافة مزودين/نماذج ذكاء اصطناعي مفقودة
- تحسينات واجهة لوحة المعلومات
- اقتراحات مصادر بيانات جديدة

## الترخيص

MIT
