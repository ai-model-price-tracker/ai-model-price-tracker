# Pelacak Harga Model AI

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

Pelacak harian otomatis untuk harga model AI di semua penyedia utama. Mengumpulkan informasi harga, kemampuan, dan API melalui GitHub Actions dan memvisualisasikannya melalui dasbor GitHub Pages.

**[Dasbor Langsung](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## Data yang Dikumpulkan

| Bidang | Deskripsi |
|--------|-----------|
| Harga Input | Biaya per 1M token input (USD) |
| Harga Output | Biaya per 1M token output (USD) |
| Harga Input Ter-cache | Biaya diskon per 1M token input yang di-cache |
| Panjang Konteks | Ukuran jendela konteks maksimum |
| Penglihatan | Dukungan input gambar |
| Pemanggilan Fungsi (Alat) | Dukungan penggunaan alat |

## Sanggahan

> **Proyek ini hanya untuk tujuan informasi.** Data harga dikumpulkan dari agregator pihak ketiga, bukan langsung dari API resmi setiap penyedia AI. Meskipun kami berupaya untuk akurat, **harga yang ditampilkan di sini mungkin sudah usang, tidak lengkap, atau tidak benar**. Selalu verifikasi harga di halaman harga resmi setiap penyedia sebelum membuat keputusan pembelian. Proyek ini tidak berafiliasi dengan penyedia AI mana pun.

## Sumber Data

Data dikumpulkan dari dua sumber agregator pihak ketiga. Bidang `source` setiap model menunjukkan asalnya. **Tidak ada penyedia AI yang menawarkan API harga publik**, sehingga semua data harga dalam ekosistem (termasuk agregator ini) pada akhirnya berasal dari pembacaan manual dokumentasi resmi.

### 1. OpenRouter API (Primer)

- **Endpoint**: `GET https://openrouter.ai/api/v1/models`
- **Peran**: Metadata harga dan kemampuan model secara real-time (Penglihatan, Alat, Panjang Konteks, dll.)
- **Akurasi harga**: OpenRouter meneruskan harga resmi penyedia tanpa markup (harga pass-through)
- **Lisensi**: Tunduk pada Ketentuan Layanan OpenRouter ([ToS](https://openrouter.ai/terms))
- **Catatan**: API publik, tetapi Ketentuan Layanan tidak secara eksplisit mengizinkan redistribusi data. Proyek ini mencantumkan sumber dan menggunakan data untuk tujuan informasi non-komersial.

### 2. pydantic/genai-prices (Sekunder)

- **Endpoint**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **Peran**: Harga langsung dari penyedia, harga cache (baca/tulis), suplemen harga berjenjang
- **Akurasi harga**: Dipelihara secara manual dari dokumentasi resmi dengan pelacakan perubahan harga dan deteksi ketidaksesuaian
- **Lisensi**: **Lisensi MIT** - bebas digunakan, dimodifikasi, dan didistribusikan ulang ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **Dipelihara oleh**: Tim [Pydantic](https://github.com/pydantic)

### Mengapa Tidak Mengambil Data Langsung dari Halaman Resmi?
- Sebagian besar penyedia AI **tidak** menawarkan endpoint API harga publik
- Web scraping halaman harga resmi rapuh (struktur HTML sering berubah) dan mungkin melanggar Ketentuan Layanan masing-masing penyedia
- Dua sumber agregator di atas adalah sumber programatik paling andal yang tersedia dalam ekosistem
- Untuk harga yang otoritatif, selalu merujuk ke halaman harga resmi yang tercantum di bawah

### Akurasi & Keterbatasan
- Kedua sumber **pada akhirnya berasal dari dokumentasi resmi penyedia**, tetapi melalui pihak ketiga
- Harga mungkin **sudah usang** - penyedia dapat mengubah harga kapan saja tanpa pemberitahuan
- Beberapa model mungkin memiliki **metadata yang tidak lengkap** (misalnya, harga cache yang hilang, flag kemampuan yang salah)
- **Batas tier gratis, batas rate, dan diskon volume** umumnya tidak tercatat
- Menemukan kesalahan? Silakan [buka issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) atau [kirim PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)

## Penyedia yang Dilacak & Halaman Harga Resmi

| Penyedia | URL Harga Resmi |
|----------|----------------|
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

> Selain penyedia yang tercantum di atas, 70+ penyedia lainnya dikumpulkan secara otomatis melalui OpenRouter dan genai-prices.

## Penggunaan Lokal

Hanya memerlukan Node.js 20+. Tanpa dependensi eksternal.

```bash
# Jalankan pengumpulan harga
node scripts/collect-prices.mjs

# Atau gunakan skrip npm
npm run collect
```

File output:
- `outputs/YYYY-MM-DD.json` - Snapshot harian
- `outputs/latest.json` - Data terbaru
- `docs/latest.json` - Untuk dasbor GitHub Pages

## Skema JSON Output

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

- **Jadwal**: Berjalan setiap hari pukul 06:00 UTC
- **Pemicu manual**: Tersedia melalui `workflow_dispatch` di tab Actions
- Data yang dikumpulkan secara otomatis di-commit dan di-push

## Hosting Mandiri (Pengaturan Fork)

1. Fork repositori ini
2. **Settings > Pages > Source**: Pilih `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: Aktifkan `Read and write permissions`
4. Verifikasi workflow telah diaktifkan di tab Actions

## Kontribusi

Menemukan kesalahan harga, model yang hilang, atau ingin menyarankan penyedia baru? Kami menyambut kontribusi:

- **[Buka Issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - Laporan bug, permintaan fitur
- **[Kirim Pull Request](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - Perbaikan dan peningkatan langsung

Kontribusi yang sangat kami sambut:
- Koreksi data harga
- Penambahan penyedia/model AI yang hilang
- Peningkatan UI dasbor
- Saran sumber data baru

## Lisensi

MIT
