<p align="center">
  <h1 align="center">AI Model Fiyat Takipçisi</h1>
  <p align="center">
    100'den fazla sağlayıcıda AI model fiyatlandırmasını günlük otomatik takip eder.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Canlı Pano »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Yanlış Fiyat Bildir</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Sağlayıcı Talep Et</a>
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

> **Sorumluluk Reddi:** Bu proje yalnızca bilgilendirme amaçlıdır. Fiyatlandırma verileri, üçüncü taraf toplayıcılardan ve resmi sayfalardan otomatik kazıma yoluyla toplanmaktadır. Doğruluk için çaba göstersek de, **fiyatlar güncel olmayabilir, eksik veya yanlış olabilir**. Kararlarınızı vermeden önce her zaman ilgili sağlayıcının resmi fiyatlandırma sayfasından doğrulayın. Bu proje herhangi bir AI sağlayıcısıyla bağlantılı değildir.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Özellikler

- **100'den fazla sağlayıcıdan** günlük takip edilen **3.000'den fazla model**
- **4 veri kaynağı** — 3 topluluk API'si + Playwright ile resmi sayfa kazıma
- **Resmi fiyat doğrulaması** — OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock doğrudan kazınır
- **Sıfır yapılandırmalı CI** — Playwright Docker konteynerinde çalışır, API anahtarı gerekmez
- **Ücretsiz JSON API** — `latest.json`'ı GitHub Pages'den kendi projelerinizde kullanın
- **İnteraktif pano** — i18n desteğiyle (18 dil) arama, filtreleme, sıralama, fiyat karşılaştırma
- **Hata dayanıklılığı** — zarif bozulma, önceki veriler korunur, başarısızlıkta otomatik sorun açılır

## Verileri Kullanma

En güncel fiyatlandırma verileri JSON olarak ücretsiz olarak kullanılabilir — kurulum gerekmez:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Tüm OpenAI modellerini bul
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

## LLM'ler İçin

Sistem komutunuza şunu ekleyerek bir LLM'ye gerçek zamanlı AI model fiyatlandırma erişimi sağlayabilirsiniz:

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

## Nasıl Çalışır

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

## Veri Kaynakları

| # | Kaynak | Tür | Modeller | Lisans |
|---|--------|-----|----------|--------|
| 1 | Resmi sayfalar (Playwright) | Web kazıma | 200+ | Yok |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [HŞ](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Birleştirme önceliği:** Resmi kazınmış fiyatlar, toplayıcı fiyatları geçersiz kılar. OpenRouter, API verileri için birincildir; genai-prices ve LiteLLM önbellek fiyatlandırması ve yetenek meta verilerini zenginleştirir.

### Resmi sayfa kazıyıcıları

Her kazıyıcı, kolay bakım için [`scripts/scrapers/`](scripts/scrapers/) altında ayrı bir dosyadır:

| Dosya | Sağlayıcı | Durum |
|-------|-----------|-------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | Çalışıyor |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | Çalışıyor |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | Çalışıyor |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | Çalışıyor |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | Çalışıyor |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — API'ye geri dönüş |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — API'ye geri dönüş |

**Yeni kazıyıcı ekleme:** `scripts/scrapers/` içinde `name`, `url` ve `scrape(page)` dışa aktaran yeni bir dosya oluşturun, ardından [`scrape-official.mjs`](scripts/scrape-official.mjs) dosyasına içe aktarın.

### Doğruluk ve sınırlamalar

- Tüm kaynaklar **nihayetinde resmi belgelerden türetilmiştir**, doğrudan veya üçüncü taraflar aracılığıyla
- Fiyatlar **güncel olmayabilir** — sağlayıcılar fiyatları herhangi bir zamanda önceden bildirimde bulunmadan değiştirebilir
- Bazı modellerin **eksik meta verileri** olabilir (eksik önbellek fiyatlandırması, yanlış yetenek bayrakları)
- **Ücretsiz katman limitleri, hız limitleri ve hacim indirimleri** genellikle yakalanmaz
- Resmi kazıma, sağlayıcılar fiyatlandırma sayfalarını yeniden tasarladığında bozulabilir

Bir hata mı buldunuz? Lütfen [bir sorun açın](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) veya [bir PR gönderin](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Toplanan Veriler

| Alan | Açıklama |
|------|----------|
| `input_price_per_1m` | 1M girdi token başına maliyet (USD) |
| `output_price_per_1m` | 1M çıktı token başına maliyet (USD) |
| `cached_input_price_per_1m` | 1M önbelleğe alınmış girdi token için indirimli maliyet |
| `context_length` | Maksimum bağlam penceresi boyutu |
| `supports_vision` | Görüntü girdi desteği |
| `supports_function_calling` | Araç kullanım desteği |
| `source` | Veri kaynağı (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Takip Edilen Sağlayıcılar

### Resmi fiyatlandırma URL'lerine sahip 16 büyük sağlayıcı
| Sağlayıcı | Resmi Fiyatlandırma |
|------------|---------------------|
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

Ayrıca OpenRouter, genai-prices ve LiteLLM aracılığıyla otomatik olarak toplanan **100'den fazla ek sağlayıcı**.

## GitHub Actions

| Özellik | Detaylar |
|---------|----------|
| **Zamanlama** | Her gün UTC 06:00'da |
| **Manuel tetikleme** | Actions sekmesinde `workflow_dispatch` |
| **Konteyner** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **İş hattı** | `scrape` → `collect` → `validate` → `commit` |
| **Başarısızlık durumunda** | Otomatik GitHub Issue oluşturulur (`collection-failure` etiketi) |
| **Veri güvenliği** | Tüm kaynaklar başarısız olursa önceki veriler korunur |

## Kendi Sunucunuzda Barındırma

1. Bu depoyu **fork** edin
2. **Settings > Pages** — Kaynak: `Deploy from a branch`, Dal: `main`, Klasör: `/docs`
3. **Settings > Actions > General** — `Read and write permissions` etkinleştirin
4. **Actions** sekmesinde iş akışının etkin olduğunu doğrulayın
5. (İsteğe bağlı) **Actions > Collect AI Model Prices > Run workflow** ile manuel olarak tetikleyin

### Yerel olarak çalıştırma
```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Resmi fiyatlandırma sayfalarını kazı
npm run collect     # API'lerden topla + kazınmış verileri birleştir
npm run validate    # Çıktıyı doğrula
```

Çıktı: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Katkıda Bulunma

Katkılarınızı bekliyoruz! İşte yardımcı olabileceğiniz konular:

- **Fiyatlandırma düzeltmeleri** — Yanlış bir fiyat mı buldunuz? [Sorun açın](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) veya PR gönderin
- **Yeni kazıyıcılar** — Henüz kapsanmayan bir sağlayıcı için kazıyıcı ekleyin ([nasıl eklenir](#resmi-sayfa-kazıyıcıları))
- **Yeni veri kaynakları** — Başka bir fiyatlandırma toplayıcısı mı biliyorsunuz? Bize bildirin
- **Pano iyileştirmeleri** — Arayüz geliştirmeleri, yeni görselleştirmeler, erişilebilirlik düzeltmeleri
- **Eksik sağlayıcılar** — Yeni AI sağlayıcıları için destek talep edin veya ekleyin

Bilinen görevlerin listesi için [açık sorunlara](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) bakın.

## Lisans

Bu projenin **kaynak kodu** MIT Lisansı altında dağıtılmaktadır. Daha fazla bilgi için [`LICENSE`](LICENSE) dosyasına bakın.

> **Veri Bildirimi:** Fiyatlandırma verileri (JSON dosyaları), [OpenRouter](https://openrouter.ai/terms) ve resmi sağlayıcı sayfaları dahil olmak üzere üçüncü taraf kaynaklardan toplanmıştır. Her kaynak kendi hizmet şartlarına tabidir. **Toplanan veriler, her orijinal kaynağın şartlarını bağımsız olarak doğrulamadan ve bunlara uymadan ticari amaçlarla kullanılamaz.** Ayrıntılar için [`LICENSE`](LICENSE) dosyasına bakın.

---

<p align="center">
  GitHub Actions ile yapılmıştır · API anahtarı gerekmez · Günlük güncellenir
</p>
