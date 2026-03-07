<p align="center">
  <h1 align="center">AI 모델 가격 추적기</h1>
  <p align="center">
    100개 이상의 제공업체에서 AI 모델 가격을 매일 자동으로 추적합니다.
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/"><strong>라이브 대시보드 »</strong></a>
    <br />
    <br />
    <a href="https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json">JSON API</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">가격 오류 신고</a>
    ·
    <a href="https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues">제공업체 추가 요청</a>
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

> **면책 조항:** 이 프로젝트는 정보 제공 목적으로만 사용됩니다. 가격 데이터는 서드파티 수집기 및 공식 페이지에서 자동 스크래핑을 통해 수집됩니다. 정확성을 위해 노력하고 있지만, **가격이 오래되었거나, 불완전하거나, 부정확할 수 있습니다**. 결정을 내리기 전에 항상 각 제공업체의 공식 가격 페이지에서 확인하시기 바랍니다. 이 프로젝트는 어떤 AI 제공업체와도 제휴 관계가 없습니다.

<p align="center">
  <a href="../README.md">English</a> · <a href="README.ja.md">日本語</a> · <a href="README.zh-CN.md">中文(简体)</a> · <a href="README.zh-TW.md">中文(繁體)</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.de.md">Deutsch</a> · <a href="README.pt.md">Português</a> · <a href="README.ru.md">Русский</a>
  <br>
  <a href="README.ar.md">العربية</a> · <a href="README.hi.md">हिन्दी</a> · <a href="README.it.md">Italiano</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.th.md">ไทย</a> · <a href="README.id.md">Bahasa Indonesia</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pl.md">Polski</a>
</p>

---

## 기능

- **3,000개 이상의 모델**을 **100개 이상의 제공업체**에서 매일 추적
- **4개의 데이터 소스** — 3개의 커뮤니티 API + Playwright를 통한 공식 페이지 스크래핑
- **공식 가격 검증** — OpenAI, Anthropic, Google, DeepSeek, AWS Bedrock을 직접 스크래핑
- **설정 불필요 CI** — Playwright Docker 컨테이너에서 실행, API 키 불필요
- **무료 JSON API** — GitHub Pages의 `latest.json`을 자신의 프로젝트에서 활용 가능
- **인터랙티브 대시보드** — 검색, 필터, 정렬, 가격 비교 및 다국어 지원 (18개 언어)
- **장애 복원력** — 우아한 성능 저하, 이전 데이터 보존, 실패 시 자동 이슈 생성

## 데이터 사용하기

최신 가격 데이터는 JSON으로 무료 제공되며, 설치가 필요하지 않습니다:

```bash
curl -s https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json | jq .summary
```

```javascript
const res = await fetch('https://ai-model-price-tracker.github.io/ai-model-price-tracker/latest.json');
const data = await res.json();

// 모든 OpenAI 모델 찾기
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

## LLM을 위한 안내

시스템 프롬프트에 다음을 추가하여 LLM에게 실시간 AI 모델 가격 데이터에 대한 접근 권한을 부여할 수 있습니다:

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

## 작동 방식

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

## 데이터 소스

| # | 소스 | 유형 | 모델 수 | 라이선스 |
|---|------|------|---------|----------|
| 1 | 공식 페이지 (Playwright) | 웹 스크래핑 | 200+ | N/A |
| 2 | [OpenRouter API](https://openrouter.ai/api/v1/models) | REST API | 350+ | [이용약관](https://openrouter.ai/terms) |
| 3 | [pydantic/genai-prices](https://github.com/pydantic/genai-prices) | JSON (GitHub) | 1,000+ | MIT |
| 4 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | JSON (GitHub) | 1,800+ | MIT |

**병합 우선순위:** 공식 스크래핑 가격이 수집기 가격을 재정의합니다. OpenRouter가 API 데이터의 기본 소스이며, genai-prices와 LiteLLM은 캐시 가격 및 기능 메타데이터를 보충합니다.

### 공식 페이지 스크래퍼

각 스크래퍼는 유지보수 편의를 위해 [`scripts/scrapers/`](scripts/scrapers/) 아래 별도 파일로 관리됩니다:

| 파일 | 제공업체 | 상태 |
|------|----------|------|
| [`anthropic.mjs`](scripts/scrapers/anthropic.mjs) | Anthropic (Claude) | 작동 중 |
| [`openai.mjs`](scripts/scrapers/openai.mjs) | OpenAI | 작동 중 |
| [`google-gemini.mjs`](scripts/scrapers/google-gemini.mjs) | Google Gemini | 작동 중 |
| [`deepseek.mjs`](scripts/scrapers/deepseek.mjs) | DeepSeek | 작동 중 |
| [`aws-bedrock.mjs`](scripts/scrapers/aws-bedrock.mjs) | AWS Bedrock | 작동 중 |
| [`mistral.mjs`](scripts/scrapers/mistral.mjs) | Mistral | SPA — API 폴백 |
| [`xai.mjs`](scripts/scrapers/xai.mjs) | xAI (Grok) | SPA — API 폴백 |

**새 스크래퍼 추가 방법:** `scripts/scrapers/`에 `name`, `url`, `scrape(page)`를 내보내는 새 파일을 생성한 후, [`scrape-official.mjs`](scripts/scrape-official.mjs)에서 가져오세요.

### 정확성 및 제한 사항

- 모든 소스는 **궁극적으로 공식 문서에서 파생**되었으며, 직접 또는 서드파티를 통해 수집됩니다
- 가격이 **오래되었을** 수 있습니다 — 제공업체는 사전 통보 없이 언제든지 가격을 변경할 수 있습니다
- 일부 모델의 **메타데이터가 불완전**할 수 있습니다 (캐시 가격 누락, 잘못된 기능 플래그)
- **무료 티어 제한, 요청 제한 및 대량 할인**은 일반적으로 포함되지 않습니다
- 제공업체가 가격 페이지를 재설계하면 공식 스크래핑이 중단될 수 있습니다

오류를 발견하셨나요? [이슈를 열거나](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) [PR을 제출](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)해 주세요.

## 수집 데이터

| 필드 | 설명 |
|------|------|
| `input_price_per_1m` | 100만 입력 토큰당 비용 (USD) |
| `output_price_per_1m` | 100만 출력 토큰당 비용 (USD) |
| `cached_input_price_per_1m` | 100만 캐시 입력 토큰당 할인 비용 |
| `context_length` | 최대 컨텍스트 윈도우 크기 |
| `supports_vision` | 이미지 입력 지원 |
| `supports_function_calling` | 도구 사용 지원 |
| `source` | 데이터 소스 (`openrouter`, `genai-prices`, `litellm`, `official`) |

## 추적 제공업체

| 제공업체 | 공식 가격 |
|----------|-----------|
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

OpenRouter, genai-prices, LiteLLM을 통해 **100개 이상의 추가 제공업체**가 자동으로 수집됩니다.

## GitHub Actions

| 항목 | 세부 사항 |
|------|-----------|
| **스케줄** | 매일 UTC 06:00 |
| **수동 트리거** | Actions 탭에서 `workflow_dispatch` |
| **컨테이너** | `mcr.microsoft.com/playwright:v1.50.0-noble` |
| **파이프라인** | `scrape` → `collect` → `validate` → `commit` |
| **실패 시** | GitHub Issue 자동 생성 (`collection-failure` 라벨) |
| **데이터 안전** | 모든 소스 실패 시 이전 데이터 보존 |

## 셀프 호스팅

1. 이 저장소를 **포크**합니다
2. **Settings > Pages** — Source: `Deploy from a branch`, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General** — `Read and write permissions` 활성화
4. **Actions** 탭에서 워크플로우가 활성화되어 있는지 확인합니다
5. (선택 사항) **Actions > Collect AI Model Prices > Run workflow**에서 수동으로 실행

### 로컬에서 실행하기

```bash
git clone https://github.com/ai-model-price-tracker/ai-model-price-tracker.git
cd ai-model-price-tracker
npm install && npx playwright install chromium

npm run scrape      # 공식 가격 페이지 스크래핑
npm run collect     # API에서 수집 + 스크래핑 데이터 병합
npm run validate    # 출력 검증
```

출력: `outputs/latest.json`, `outputs/YYYY-MM-DD.json`, `docs/latest.json`

## 기여하기

기여를 환영합니다! 도움을 주실 수 있는 방법:

- **가격 수정** — 잘못된 가격을 발견하셨나요? [이슈를 열거나](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) PR을 제출해 주세요
- **새 스크래퍼** — 아직 지원되지 않는 제공업체의 스크래퍼 추가 ([추가 방법](#공식-페이지-스크래퍼))
- **새 데이터 소스** — 다른 가격 수집기를 알고 계신가요? 알려주세요
- **대시보드 개선** — UI 개선, 새로운 시각화, 접근성 수정
- **누락된 제공업체** — 새로운 AI 제공업체의 지원을 요청하거나 추가

알려진 작업 목록은 [열린 이슈](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)를 참조하세요.

## 라이선스

이 프로젝트의 **소스 코드**는 MIT 라이선스에 따라 배포됩니다. 자세한 내용은 [`LICENSE`](LICENSE)를 참조하세요.

> **데이터 고지:** 가격 데이터(JSON 파일)는 [OpenRouter](https://openrouter.ai/terms) 및 공식 제공업체 페이지를 포함한 서드파티 소스에서 수집됩니다. 각 소스는 자체 서비스 약관이 적용됩니다. **수집된 데이터는 각 원본 소스의 약관을 독립적으로 확인하고 준수하지 않는 한 상업적 목적으로 사용할 수 없습니다.** 자세한 내용은 [`LICENSE`](LICENSE)를 참조하세요.

---

<p align="center">
  GitHub Actions로 제작 · API 키 불필요 · 매일 업데이트
</p>
