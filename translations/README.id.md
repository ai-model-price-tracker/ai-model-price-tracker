<p align="center">
  <h1 align="center">AI Model Price Tracker</h1>
  <p align="center">
    Pelacak harian otomatis untuk harga model AI di 100+ penyedia.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>Dasbor Langsung »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Laporkan Harga Salah</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">Minta Penyedia</a>
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

> **Sanggahan:** Proyek ini hanya untuk tujuan informasi. Data harga dikumpulkan dari agregator pihak ketiga dan halaman resmi melalui scraping otomatis. Meskipun kami berupaya untuk akurasi, **harga mungkin sudah usang, tidak lengkap, atau tidak benar**. Selalu verifikasi di halaman harga resmi masing-masing penyedia sebelum mengambil keputusan. Proyek ini tidak berafiliasi dengan penyedia AI mana pun.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ko.md">한국어</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## Fitur

- **3.000+ model** dari **100+ penyedia** dilacak setiap hari
- **4 sumber data** — 3 API komunitas + scraping halaman resmi via Playwright
- **Verifikasi harga resmi** — melakukan scraping langsung dari OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock
- **CI tanpa konfigurasi** — berjalan di container Docker Playwright, tidak perlu API key
- **JSON API gratis** — gunakan `latest.json` dari GitHub Pages di proyek Anda sendiri
- **Dasbor interaktif** — cari, filter, urutkan, bandingkan harga dengan dukungan i18n (18 bahasa)
- **Ketahanan terhadap kegagalan** — degradasi halus, data sebelumnya dipertahankan, issue otomatis saat gagal

## Menggunakan Data

Data harga terbaru tersedia secara gratis sebagai JSON — tidak perlu instalasi:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// Cari semua model OpenAI
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

## Untuk LLM

Anda dapat memberikan LLM akses ke data harga model AI secara real-time dengan menambahkan ini ke system prompt Anda:

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

## Cara Kerja

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

## Sumber Data

| # | Sumber | Tipe | Model | Lisensi |
|---|--------|------|-------|---------|
| 1 | Halaman resmi (Playwright) | Web scraping | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [ToS](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1.000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1.800+ | MIT |

**Prioritas penggabungan:** Harga yang di-scrape dari halaman resmi menggantikan harga dari agregator. OpenRouter menjadi sumber utama untuk data API, genai-prices dan LiteLLM melengkapi harga cache dan metadata kemampuan.

### Scraper halaman resmi
Setiap scraper adalah file terpisah di bawah [`scripts/scrapers/`](scripts/scrapers/) untuk kemudahan pemeliharaan:

| File | Penyedia | Status |
|------|----------|--------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | Berfungsi |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | Berfungsi |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | Berfungsi |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | Berfungsi |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | Berfungsi |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — fallback ke API |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — fallback ke API |

**Menambahkan scraper baru:** Buat file baru di `scripts/scrapers/` yang mengekspor `name`, `url`, dan `scrape(page)`, lalu impor di [`scrape-official.mjs`](scripts/scrape-official.mjs).

### Akurasi & keterbatasan
- Semua sumber **pada akhirnya berasal dari dokumentasi resmi**, secara langsung atau melalui pihak ketiga
- Harga mungkin **sudah usang** — penyedia dapat mengubah harga kapan saja tanpa pemberitahuan
- Beberapa model mungkin memiliki **metadata yang tidak lengkap** (harga cache yang hilang, flag kemampuan yang salah)
- **Batas tier gratis, batas rate, dan diskon volume** umumnya tidak tercatat
- Scraping resmi dapat rusak ketika penyedia mendesain ulang halaman harga mereka

Menemukan kesalahan? Silakan [buka issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) atau [kirim PR](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls).

## Glosarium

| Istilah | Deskripsi |
|---------|-----------|
| **Token** | Unit dasar yang digunakan model AI untuk memproses teks. 1 token ≈ 3/4 kata. Harga ditampilkan per 1 juta token. |
| **Token input** | Teks/data yang dikirim ke model (prompt, konteks, instruksi). |
| **Token output** | Teks yang dihasilkan model sebagai respons. Umumnya lebih mahal dari input. |
| **Jendela konteks** | Jumlah token maksimum yang dapat diproses model dalam satu percakapan (input + output gabungan). |
| **Input ter-cache** | Harga diskon saat menggunakan kembali prefiks prompt yang sama antar permintaan. |
| **Harga batch** | Harga diskon untuk permintaan massal yang tidak mendesak yang diproses secara asinkron. |
| **Pemanggilan fungsi** | Kemampuan model untuk memanggil alat eksternal atau API selama proses generasi. |
| **Visi** | Kemampuan model untuk memproses dan memahami input gambar. |

## Data yang Dikumpulkan

| Field | Deskripsi |
|-------|-----------|
| `input_price_per_1m` | Biaya per 1M token input (USD) |
| `output_price_per_1m` | Biaya per 1M token output (USD) |
| `cached_input_price_per_1m` | Biaya diskon per 1M token input yang di-cache |
| `context_length` | Ukuran jendela konteks maksimum (dalam token) |
| `supports_vision` | Apakah model dapat memproses input gambar |
| `supports_function_calling` | Apakah model dapat memanggil alat/fungsi eksternal |
| `source` | Sumber data (`openrouter`, `genai-prices`, `litellm`, `official`) |

## Penyedia yang Dilacak

### 16 penyedia utama dengan URL harga resmi
| Penyedia | Harga Resmi |
|----------|-------------|
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

Ditambah **100+ penyedia tambahan** yang dikumpulkan secara otomatis melalui OpenRouter, genai-prices, dan LiteLLM.

## GitHub Actions

| Fitur | Detail |
|-------|--------|
| **Jadwal** | Setiap hari pukul 06:00 UTC |
| **Pemicu manual** | `workflow_dispatch` di tab Actions |
| **Container** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **Pipeline** | `scrape` → `collect` → `validate` → `commit` |
| **Saat gagal** | Otomatis membuat GitHub Issue (label `collection-failure`) |
| **Keamanan data** | Data sebelumnya dipertahankan jika semua sumber gagal |

## Hosting Mandiri

1. **Fork** repositori ini
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General** — Aktifkan `Read and write permissions`
4. Verifikasi workflow telah diaktifkan di tab **Actions**
5. (Opsional) Jalankan secara manual melalui **Actions > Collect AI Model Prices > Run workflow**

### Menjalankan secara lokal
```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # Scrape halaman harga resmi
npm run collect     # Kumpulkan dari API + gabungkan data yang di-scrape
npm run validate    # Validasi output
```

Output: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## Kontribusi

Kontribusi sangat diterima! Berikut cara Anda dapat membantu:

- **Koreksi harga** — Menemukan harga yang salah? [Buka issue](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) atau kirim PR
- **Scraper baru** — Tambahkan scraper untuk penyedia yang belum tercakup ([cara menambahkan](#scraper-halaman-resmi))
- **Sumber data baru** — Mengetahui agregator harga lain? Beritahu kami
- **Peningkatan dasbor** — Peningkatan UI, visualisasi baru, perbaikan aksesibilitas
- **Penyedia yang belum ada** — Minta atau tambahkan dukungan untuk penyedia AI baru

Lihat [issue terbuka](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) untuk daftar tugas yang diketahui.

## Lisensi

**Kode sumber** proyek ini didistribusikan di bawah Lisensi MIT. Lihat [`LICENSE`](LICENSE) untuk informasi lebih lanjut.

> **Pemberitahuan Data:** Data harga (file JSON) dikumpulkan dari sumber pihak ketiga termasuk [OpenRouter](https://openrouter.ai/terms) dan halaman resmi penyedia. Setiap sumber tunduk pada ketentuan layanannya masing-masing. **Data yang dikumpulkan tidak boleh digunakan untuk tujuan komersial** tanpa memverifikasi secara independen dan mematuhi ketentuan setiap sumber asli. Lihat [`LICENSE`](LICENSE) untuk detail.

---

<p align="center">
  Dibuat dengan GitHub Actions · Tidak perlu API key · Diperbarui setiap hari
</p>
