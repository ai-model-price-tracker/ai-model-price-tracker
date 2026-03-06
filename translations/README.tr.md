# AI Model Fiyat Takipçisi

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Tüm büyük sağlayıcılardaki AI model fiyatlandırmasını otomatik olarak günlük takip eder. GitHub Actions aracılığıyla fiyatlandırma, yetenekler ve API bilgilerini toplar ve bunları GitHub Pages panosu üzerinden görselleştirir.

**[Canlı Pano](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Toplanan Veriler

| Alan | Açıklama |
|------|----------|
| Girdi Fiyatı | 1M girdi token başına maliyet (USD) |
| Çıktı Fiyatı | 1M çıktı token başına maliyet (USD) |
| Önbelleğe Alınmış Girdi Fiyatı | 1M önbelleğe alınmış girdi token için indirimli maliyet |
| Bağlam Uzunluğu | Maksimum bağlam penceresi boyutu |
| Görüntü | Görüntü girdi desteği |
| Fonksiyon Çağırma (Araçlar) | Araç kullanım desteği |

## Sorumluluk Reddi

> **Bu proje yalnızca bilgilendirme amaçlıdır.** Fiyatlandırma verileri, her AI sağlayıcısının resmi API'sinden değil, üçüncü taraf toplayıcılardan elde edilmektedir. Doğruluk için çaba göstersek de, **burada gösterilen fiyatlar güncel olmayabilir, eksik veya yanlış olabilir**. Satın alma kararları vermeden önce her zaman her sağlayıcının resmi fiyatlandırma sayfasından doğrulayın. Bu proje herhangi bir AI sağlayıcısıyla bağlantılı değildir.

## Veri Kaynakları

Veriler iki üçüncü taraf toplayıcı kaynaktan toplanır. Her modelin `source` alanı kaynağını belirtir. **Hiçbir AI sağlayıcısı halka açık bir fiyatlandırma API'si sunmamaktadır**, bu nedenle ekosistemdeki tüm fiyatlandırma verileri (bu toplayıcılar dahil) nihayetinde resmi belgelerin manuel olarak okunmasından kaynaklanmaktadır.

### 1. OpenRouter API (Birincil)

- **Uç Nokta**: `GET https://openrouter.ai/api/v1/models`
- **Rol**: Gerçek zamanlı model fiyatlandırma ve yetenek meta verileri (Görüntü, Araçlar, Bağlam Uzunluğu vb.)
- **Fiyatlandırma doğruluğu**: OpenRouter, resmi sağlayıcı fiyatlarını ek ücret olmadan iletir (doğrudan fiyatlandırma)
- **Lisans**: OpenRouter Hizmet Şartlarına tabidir ([ToS](https://openrouter.ai/terms))
- **Not**: Herkese açık API'dir, ancak Hizmet Şartları veri yeniden dağıtımına açıkça izin vermez. Bu proje kaynağı belirtir ve verileri ticari olmayan bilgilendirme amaçlı kullanır.

### 2. pydantic/genai-prices (İkincil)

- **Uç Nokta**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Rol**: Doğrudan sağlayıcı fiyatlandırması, önbellek fiyatlandırması (okuma/yazma), kademeli fiyatlandırma ekleri
- **Fiyatlandırma doğruluğu**: Resmi belgelerden manuel olarak sürdürülür, fiyat değişikliği takibi ve tutarsızlık tespiti ile
- **Lisans**: **MIT Lisansı** - ücretsiz kullanım, değiştirme ve yeniden dağıtım ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Bakımcı**: [Pydantic](https://github.com/pydantic) ekibi

### Neden Resmi Sayfaları Doğrudan Kazımıyoruz?
- Çoğu AI sağlayıcısı halka açık bir fiyatlandırma API uç noktası **sunmamaktadır**
- Resmi fiyatlandırma sayfalarını web kazıma yöntemiyle toplamak kırılgandır (HTML yapısı sık sık değişir) ve her sağlayıcının Hizmet Şartlarını ihlal edebilir
- Yukarıdaki iki toplayıcı kaynak, ekosistemde mevcut en güvenilir programatik kaynaklardır
- Yetkili fiyatlandırma için her zaman aşağıda listelenen resmi fiyatlandırma sayfalarına başvurun

### Doğruluk ve Sınırlamalar
- Her iki kaynak da **nihayetinde resmi sağlayıcı belgelerinden türetilmiştir**, ancak üçüncü taraflar aracılığıyla
- Fiyatlar **güncel olmayabilir** - sağlayıcılar fiyatları herhangi bir zamanda önceden bildirimde bulunmadan değiştirebilir
- Bazı modellerin **eksik meta verileri** olabilir (örn. eksik önbellek fiyatlandırması, yanlış yetenek bayrakları)
- **Ücretsiz katman limitleri, hız limitleri ve hacim indirimleri** genellikle yakalanmaz
- Bir hata mı buldunuz? Lütfen [bir sorun açın](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) veya [bir PR gönderin](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Takip Edilen Sağlayıcılar ve Resmi Fiyatlandırma Sayfaları

| Sağlayıcı | Resmi Fiyatlandırma URL'si |
|------------|---------------------------|
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

> Yukarıda listelenen sağlayıcılara ek olarak, OpenRouter ve genai-prices aracılığıyla 70'ten fazla sağlayıcı otomatik olarak toplanır.

## Yerel Kullanım

Yalnızca Node.js 20+ gerektirir. Sıfır harici bağımlılık.

```bash
# Fiyat toplama çalıştır
node scripts/collect-prices.mjs

# Veya npm betiğini kullan
npm run collect
```

Çıktı dosyaları:
- `outputs/YYYY-MM-DD.json` - Günlük anlık görüntü
- `outputs/latest.json` - En son veriler
- `docs/latest.json` - GitHub Pages panosu için

## Çıktı JSON Şeması

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

- **Zamanlama**: Her gün UTC 06:00'da çalışır
- **Manuel tetikleme**: Actions sekmesinde `workflow_dispatch` ile kullanılabilir
- Toplanan veriler otomatik olarak commit edilir ve push yapılır

## Kendi Sunucunuzda Barındırma (Fork Kurulumu)

1. Bu depoyu forklayın
2. **Settings > Pages > Source**: `Deploy from a branch` seçin, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: `Read and write permissions` etkinleştirin
4. Actions sekmesinde iş akışının etkin olduğunu doğrulayın

## Katkıda Bulunma

Fiyatlandırma hataları, eksik modeller buldunuz veya yeni bir sağlayıcı mı önermek istiyorsunuz? Katkılarınızı bekliyoruz:

- **[Sorun Açın](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Hata raporları, özellik istekleri
- **[Pull Request Gönderin](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Doğrudan düzeltmeler ve iyileştirmeler

Özellikle memnuniyetle karşıladığımız katkılar:
- Fiyatlandırma verisi düzeltmeleri
- Eksik AI sağlayıcı/model eklemeleri
- Pano arayüz iyileştirmeleri
- Yeni veri kaynağı önerileri

## Lisans

MIT
