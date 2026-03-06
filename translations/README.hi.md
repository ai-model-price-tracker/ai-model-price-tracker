# AI मॉडल मूल्य ट्रैकर

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

सभी प्रमुख प्रदाताओं में AI मॉडल मूल्य निर्धारण के लिए स्वचालित दैनिक ट्रैकर। GitHub Actions के माध्यम से मूल्य, क्षमताओं और API जानकारी एकत्र करता है और GitHub Pages डैशबोर्ड के माध्यम से इसे विज़ुअलाइज़ करता है।

**[लाइव डैशबोर्ड](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## एकत्रित डेटा

| फ़ील्ड | विवरण |
|--------|--------|
| इनपुट मूल्य | प्रति 1M इनपुट टोकन लागत (USD) |
| आउटपुट मूल्य | प्रति 1M आउटपुट टोकन लागत (USD) |
| कैश्ड इनपुट मूल्य | प्रति 1M कैश्ड इनपुट टोकन रियायती लागत |
| संदर्भ लंबाई | अधिकतम संदर्भ विंडो आकार |
| विज़न | छवि इनपुट समर्थन |
| फंक्शन कॉलिंग (Tools) | टूल उपयोग समर्थन |

## अस्वीकरण

> **यह प्रोजेक्ट केवल सूचनात्मक उद्देश्यों के लिए है।** मूल्य डेटा तृतीय-पक्ष एग्रीगेटर्स से एकत्र किया जाता है, सीधे प्रत्येक AI प्रदाता की आधिकारिक API से नहीं। हालांकि हम सटीकता के लिए प्रयास करते हैं, **यहाँ दिखाए गए मूल्य पुराने, अधूरे या गलत हो सकते हैं**। खरीद निर्णय लेने से पहले हमेशा प्रत्येक प्रदाता की आधिकारिक मूल्य निर्धारण पृष्ठ पर कीमतों की पुष्टि करें। यह प्रोजेक्ट किसी भी AI प्रदाता से संबद्ध नहीं है।

## डेटा स्रोत

डेटा दो तृतीय-पक्ष एग्रीगेटर स्रोतों से एकत्र किया जाता है। प्रत्येक मॉडल का `source` फ़ील्ड इसके मूल स्रोत को इंगित करता है। **कोई भी AI प्रदाता सार्वजनिक मूल्य निर्धारण API प्रदान नहीं करता**, इसलिए पारिस्थितिकी तंत्र में सभी मूल्य निर्धारण डेटा (इन एग्रीगेटर्स सहित) अंततः आधिकारिक दस्तावेज़ों को मैन्युअल रूप से पढ़ने से प्राप्त होता है।

### 1. OpenRouter API (प्राथमिक)

- **एंडपॉइंट**: `GET https://openrouter.ai/api/v1/models`
- **भूमिका**: रीयल-टाइम मॉडल मूल्य निर्धारण और क्षमता मेटाडेटा (Vision, Tools, संदर्भ लंबाई, आदि)
- **मूल्य सटीकता**: OpenRouter आधिकारिक प्रदाता मूल्यों को बिना किसी मार्कअप के पास-थ्रू करता है (पास-थ्रू मूल्य निर्धारण)
- **लाइसेंस**: OpenRouter सेवा की शर्तों के अधीन ([ToS](https://openrouter.ai/terms))
- **नोट**: सार्वजनिक API, लेकिन ToS स्पष्ट रूप से डेटा पुनर्वितरण की अनुमति नहीं देता। यह प्रोजेक्ट स्रोत का उल्लेख करता है और गैर-वाणिज्यिक सूचनात्मक उद्देश्यों के लिए डेटा का उपयोग करता है।

### 2. pydantic/genai-prices (द्वितीयक)

- **एंडपॉइंट**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **भूमिका**: प्रत्यक्ष प्रदाता मूल्य निर्धारण, कैश मूल्य निर्धारण (पढ़ना/लिखना), स्तरीय मूल्य निर्धारण पूरक
- **मूल्य सटीकता**: मूल्य परिवर्तन ट्रैकिंग और विसंगति पहचान के साथ आधिकारिक दस्तावेज़ों से मैन्युअल रूप से बनाए रखा गया
- **लाइसेंस**: **MIT लाइसेंस** - उपयोग, संशोधन और पुनर्वितरण के लिए स्वतंत्र ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **रखरखावकर्ता**: [Pydantic](https://github.com/pydantic) टीम

### आधिकारिक पृष्ठों को सीधे स्क्रैप क्यों नहीं करते?
- अधिकांश AI प्रदाता **सार्वजनिक मूल्य निर्धारण API एंडपॉइंट प्रदान नहीं करते**
- आधिकारिक मूल्य निर्धारण पृष्ठों का वेब स्क्रैपिंग अस्थिर है (HTML संरचना बार-बार बदलती है) और प्रत्येक प्रदाता की सेवा की शर्तों का उल्लंघन कर सकता है
- ऊपर दिए गए दो एग्रीगेटर स्रोत पारिस्थितिकी तंत्र में उपलब्ध सबसे विश्वसनीय प्रोग्रामेटिक स्रोत हैं
- आधिकारिक मूल्य निर्धारण के लिए, हमेशा नीचे सूचीबद्ध आधिकारिक मूल्य निर्धारण पृष्ठों को देखें

### सटीकता और सीमाएँ
- दोनों स्रोत **अंततः आधिकारिक प्रदाता दस्तावेज़ों से प्राप्त हैं**, लेकिन तृतीय पक्षों के माध्यम से
- कीमतें **पुरानी** हो सकती हैं - प्रदाता बिना सूचना के किसी भी समय कीमतें बदल सकते हैं
- कुछ मॉडलों में **अधूरा मेटाडेटा** हो सकता है (जैसे, कैश मूल्य निर्धारण गायब, गलत क्षमता फ़्लैग)
- **मुफ्त-स्तर सीमाएँ, दर सीमाएँ, और वॉल्यूम छूट** आमतौर पर शामिल नहीं होते
- कोई त्रुटि मिली? कृपया [issue खोलें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) या [PR सबमिट करें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## ट्रैक किए गए प्रदाता और आधिकारिक मूल्य निर्धारण पृष्ठ

| प्रदाता | आधिकारिक मूल्य URL |
|---------|---------------------|
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

> ऊपर सूचीबद्ध प्रदाताओं के अलावा, 70+ और प्रदाता OpenRouter और genai-prices के माध्यम से स्वचालित रूप से एकत्र किए जाते हैं।

## स्थानीय उपयोग

केवल Node.js 20+ आवश्यक है। शून्य बाहरी निर्भरताएँ।

```bash
# मूल्य संग्रह चलाएँ
node scripts/collect-prices.mjs

# या npm स्क्रिप्ट का उपयोग करें
npm run collect
```

आउटपुट फ़ाइलें:
- `outputs/YYYY-MM-DD.json` - दैनिक स्नैपशॉट
- `outputs/latest.json` - नवीनतम डेटा
- `docs/latest.json` - GitHub Pages डैशबोर्ड के लिए

## आउटपुट JSON स्कीमा

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

- **शेड्यूल**: प्रतिदिन 06:00 UTC पर चलता है
- **मैनुअल ट्रिगर**: Actions टैब में `workflow_dispatch` के माध्यम से उपलब्ध
- एकत्रित डेटा स्वचालित रूप से कमिट और पुश किया जाता है

## सेल्फ-होस्टिंग (Fork सेटअप)

1. इस रिपॉज़िटरी को Fork करें
2. **Settings > Pages > Source**: `Deploy from a branch` चुनें, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: `Read and write permissions` सक्षम करें
4. सत्यापित करें कि वर्कफ़्लो Actions टैब में सक्षम है

## योगदान

मूल्य निर्धारण त्रुटियाँ, गायब मॉडल, या नए प्रदाता का सुझाव देना चाहते हैं? हम योगदान का स्वागत करते हैं:

- **[Issue खोलें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - बग रिपोर्ट, फ़ीचर अनुरोध
- **[Pull Request सबमिट करें](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - प्रत्यक्ष सुधार और सुधार

विशेष रूप से स्वागत योग्य योगदान:
- मूल्य डेटा सुधार
- गायब AI प्रदाता/मॉडल जोड़ना
- डैशबोर्ड UI सुधार
- नए डेटा स्रोत सुझाव

## लाइसेंस

MIT
