<p align="center">
  <h1 align="center">AI मॉडल मूल्य ट्रैकर</h1>
  <p align="center">
    100+ प्रदाताओं के AI मॉडल मूल्य निर्धारण का स्वचालित दैनिक ट्रैकर।
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>लाइव डैशबोर्ड »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">गलत मूल्य की रिपोर्ट करें</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">प्रदाता का अनुरोध करें</a>
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

> **अस्वीकरण:** यह प्रोजेक्ट केवल सूचनात्मक उद्देश्यों के लिए है। मूल्य डेटा तृतीय-पक्ष एग्रीगेटर और आधिकारिक पृष्ठों से स्वचालित स्क्रैपिंग के माध्यम से एकत्र किया जाता है। हम सटीकता के लिए प्रयास करते हैं, लेकिन **मूल्य पुराने, अपूर्ण या गलत हो सकते हैं**। निर्णय लेने से पहले हमेशा प्रत्येक प्रदाता के आधिकारिक मूल्य निर्धारण पृष्ठ पर सत्यापित करें। यह प्रोजेक्ट किसी भी AI प्रदाता से संबद्ध नहीं है।

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## विशेषताएँ

- **100+ प्रदाताओं** से **3,000+ मॉडल** की दैनिक ट्रैकिंग
- **4 डेटा स्रोत** — 3 समुदाय APIs + Playwright के माध्यम से आधिकारिक पृष्ठ स्क्रैपिंग
- **आधिकारिक मूल्य सत्यापन** — OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock से सीधे स्क्रैप करता है
- **शून्य-कॉन्फ़िगरेशन CI** — Playwright Docker कंटेनर में चलता है, API कुंजियों की आवश्यकता नहीं
- **मुफ़्त JSON API** — GitHub Pages से `latest.json` को अपने प्रोजेक्ट में उपयोग करें
- **इंटरैक्टिव डैशबोर्ड** — खोजें, फ़िल्टर करें, सॉर्ट करें, i18n समर्थन (18 भाषाएँ) के साथ मूल्य तुलना करें
- **विफलता प्रतिरोधकता** — ग्रेसफुल डिग्रेडेशन, पिछला डेटा संरक्षित, विफलता पर स्वचालित issue निर्माण

## डेटा का उपयोग

नवीनतम मूल्य डेटा JSON के रूप में मुफ़्त उपलब्ध है — इंस्टॉलेशन की आवश्यकता नहीं:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// सभी OpenAI मॉडल खोजें
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

## LLMs के लिए

आप अपने सिस्टम प्रॉम्प्ट में यह जोड़कर LLM को रीयल-टाइम AI मॉडल मूल्य निर्धारण तक पहुँच दे सकते हैं:

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

## यह कैसे काम करता है

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

## डेटा स्रोत

| # | स्रोत | प्रकार | मॉडल | लाइसेंस |
|---|-------|--------|------|---------|
| 1 | आधिकारिक पृष्ठ (Playwright) | वेब स्क्रैपिंग | 200+ | लागू नहीं |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**मर्ज प्राथमिकता:** आधिकारिक स्क्रैप किए गए मूल्य एग्रीगेटर मूल्यों को ओवरराइड करते हैं। API डेटा के लिए OpenRouter प्राथमिक है, genai-prices और LiteLLM कैश मूल्य निर्धारण और क्षमता मेटाडेटा को समृद्ध करते हैं।

### आधिकारिक पृष्ठ स्क्रैपर

प्रत्येक स्क्रैपर आसान रखरखाव के लिए [`scripts/scrapers/`](scripts/scrapers/) के अंतर्गत एक अलग फ़ाइल है:

| फ़ाइल | प्रदाता | स्थिति |
|-------|---------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | ✅ 3 models |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | ✅ 59 models |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | ✅ 18 models |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | ✅ 2 models |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | ✅ 164 models |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | ⚠️ 0 models |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | ⚠️ 0 models |

**नया स्क्रैपर जोड़ना:** `scripts/scrapers/` में एक नई फ़ाइल बनाएँ जो `name`, `url`, और `scrape(page)` एक्सपोर्ट करे, फिर इसे [`scrape-official.mjs`](scripts/scrape-official.mjs) में इम्पोर्ट करें।

### सटीकता और सीमाएँ

- सभी स्रोत **अंततः आधिकारिक दस्तावेज़ों से प्राप्त** हैं, सीधे या तृतीय पक्षों के माध्यम से
- मूल्य **पुराने** हो सकते हैं — प्रदाता बिना सूचना के किसी भी समय मूल्य बदल सकते हैं
- कुछ मॉडलों में **अपूर्ण मेटाडेटा** हो सकता है (कैश मूल्य गायब, गलत क्षमता फ़्लैग)
- **मुफ़्त-टियर सीमाएँ, रेट लिमिट और वॉल्यूम छूट** आमतौर पर कैप्चर नहीं की जातीं
- प्रदाताओं द्वारा मूल्य पृष्ठों को फिर से डिज़ाइन करने पर आधिकारिक स्क्रैपिंग टूट सकती है

कोई त्रुटि मिली? कृपया [issue खोलें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) या [PR सबमिट करें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)।

## शब्दावली

| शब्द | विवरण |
|------|--------|
| **टोकन (Token)** | AI मॉडल द्वारा टेक्स्ट प्रोसेस करने की मूल इकाई। 1 टोकन ≈ किसी शब्द का 3/4 भाग। कीमतें प्रति 10 लाख टोकन दिखाई जाती हैं। |
| **इनपुट टोकन** | मॉडल को भेजा गया टेक्स्ट/डेटा (प्रॉम्प्ट, संदर्भ, निर्देश)। |
| **आउटपुट टोकन** | मॉडल द्वारा उत्पन्न प्रतिक्रिया टेक्स्ट। आमतौर पर इनपुट से अधिक महंगा। |
| **कॉन्टेक्स्ट विंडो** | एक वार्तालाप में मॉडल द्वारा प्रोसेस किए जा सकने वाले अधिकतम टोकन (इनपुट + आउटपुट)। |
| **कैश्ड इनपुट** | एक ही प्रॉम्प्ट प्रीफ़िक्स को दोबारा उपयोग करने पर रियायती मूल्य। |
| **बैच प्राइसिंग** | गैर-तत्काल बड़ी मात्रा के अनुरोधों के लिए रियायती मूल्य। प्रतिक्रिया में घंटे लग सकते हैं, लेकिन लागत काफी कम होती है। |
| **फंक्शन कॉलिंग** | जनरेशन के दौरान बाहरी टूल या API को कॉल करने की मॉडल की क्षमता। |
| **विज़न** | इमेज इनपुट को प्रोसेस और समझने की मॉडल की क्षमता। |

## एकत्रित डेटा

| फ़ील्ड | विवरण |
|--------|-------|
| `input_price_per_1m` | प्रति 1M इनपुट टोकन की लागत (USD) |
| `output_price_per_1m` | प्रति 1M आउटपुट टोकन की लागत (USD) |
| `cached_input_price_per_1m` | प्रति 1M कैश्ड इनपुट टोकन की रियायती लागत |
| `context_length` | अधिकतम कॉन्टेक्स्ट विंडो आकार (टोकन में) |
| `supports_vision` | क्या मॉडल इमेज इनपुट प्रोसेस कर सकता है |
| `supports_function_calling` | क्या मॉडल बाहरी टूल/फंक्शन कॉल कर सकता है |
| `source` | डेटा स्रोत (`openrouter`, `genai-prices`, `litellm`, `official`) |

## ट्रैक किए गए प्रदाता

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

साथ ही **100+ अतिरिक्त प्रदाता** जो OpenRouter, genai-prices और LiteLLM के माध्यम से स्वचालित रूप से एकत्र किए जाते हैं।

## GitHub Actions

| सुविधा | विवरण |
|--------|-------|
| **शेड्यूल** | प्रतिदिन 06:00 UTC पर |
| **मैनुअल ट्रिगर** | Actions टैब में `workflow_dispatch` |
| **कंटेनर** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **पाइपलाइन** | `scrape` → `collect` → `validate` → `commit` |
| **विफलता पर** | स्वचालित GitHub Issue निर्माण (`collection-failure` लेबल) |
| **डेटा सुरक्षा** | सभी स्रोत विफल होने पर पिछला डेटा संरक्षित |

## सेल्फ-होस्टिंग

1. इस रिपॉज़िटरी को **Fork** करें
2. **Settings > Pages** — स्रोत: `Deploy from a branch`, ब्रांच: `main`, फ़ोल्डर: `/docs`
3. **Settings > Actions > General** — `Read and write permissions` सक्षम करें
4. **Actions** टैब में वर्कफ़्लो सक्षम होने की पुष्टि करें
5. (वैकल्पिक) **Actions > Collect AI Model Prices > Run workflow** से मैन्युअली ट्रिगर करें

### स्थानीय रूप से चलाना

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # आधिकारिक मूल्य पृष्ठों को स्क्रैप करें
npm run collect     # APIs से एकत्र करें + स्क्रैप किए गए डेटा को मर्ज करें
npm run validate    # आउटपुट को मान्य करें
```

आउटपुट: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## योगदान

योगदान का स्वागत है! यहाँ बताया गया है कि आप कैसे मदद कर सकते हैं:

- **मूल्य सुधार** — गलत मूल्य मिला? [Issue खोलें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) या PR सबमिट करें
- **नए स्क्रैपर** — अभी तक कवर नहीं किए गए प्रदाता के लिए स्क्रैपर जोड़ें ([कैसे जोड़ें](#आधिकारिक-पृष्ठ-स्क्रैपर))
- **नए डेटा स्रोत** — किसी अन्य मूल्य एग्रीगेटर के बारे में जानते हैं? हमें बताएँ
- **डैशबोर्ड सुधार** — UI सुधार, नए विज़ुअलाइज़ेशन, एक्सेसिबिलिटी फ़िक्स
- **गायब प्रदाता** — नए AI प्रदाताओं के लिए समर्थन का अनुरोध करें या जोड़ें

ज्ञात कार्यों की सूची के लिए [खुले issues](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) देखें।

## लाइसेंस

इस प्रोजेक्ट का **सोर्स कोड** MIT लाइसेंस के तहत वितरित है। अधिक जानकारी के लिए [`LICENSE`](LICENSE) देखें।

> **डेटा सूचना:** मूल्य डेटा (JSON फ़ाइलें) [OpenRouter](https://openrouter.ai/terms) और आधिकारिक प्रदाता पृष्ठों सहित तृतीय-पक्ष स्रोतों से एकत्र किया गया है। प्रत्येक स्रोत अपनी सेवा की शर्तों के अधीन है। **एकत्रित डेटा का व्यावसायिक उद्देश्यों के लिए उपयोग नहीं किया जा सकता** बिना प्रत्येक मूल स्रोत की शर्तों को स्वतंत्र रूप से सत्यापित और पालन किए। विवरण के लिए [`LICENSE`](LICENSE) देखें।

---

<p align="center">
  GitHub Actions के साथ निर्मित · API कुंजियों की आवश्यकता नहीं · प्रतिदिन अपडेट
</p>
