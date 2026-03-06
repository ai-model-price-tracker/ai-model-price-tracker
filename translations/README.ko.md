# AI 모델 가격 추적기

[![Collect AI Model Prices](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml/badge.svg)](https://github.com/ai-model-price-tracker/ai-model-price-tracker/actions/workflows/collect-prices.yml)

주요 AI 제공업체들의 모델 가격을 매일 자동으로 추적합니다. GitHub Actions를 통해 가격, 기능, API 정보를 수집하고 GitHub Pages 대시보드로 시각화합니다.

**[라이브 대시보드](https://ai-model-price-tracker.github.io/ai-model-price-tracker/)**

> **English**: [README](../README.md)

## 수집 데이터

| 필드 | 설명 |
|------|------|
| 입력 가격 | 100만 입력 토큰당 비용 (USD) |
| 출력 가격 | 100만 출력 토큰당 비용 (USD) |
| 캐시 입력 가격 | 100만 캐시 입력 토큰당 할인 비용 |
| 컨텍스트 길이 | 최대 컨텍스트 윈도우 크기 |
| 비전 | 이미지 입력 지원 여부 |
| 함수 호출 (Tools) | 도구 사용 지원 여부 |

## 면책 조항

> **이 프로젝트는 정보 제공 목적으로만 사용됩니다.** 가격 데이터는 각 AI 제공업체의 공식 API가 아닌 서드파티 수집기에서 수집됩니다. 정확성을 위해 노력하고 있지만, **여기에 표시된 가격은 오래되었거나, 불완전하거나, 부정확할 수 있습니다.** 구매 결정을 내리기 전에 항상 각 제공업체의 공식 가격 페이지에서 확인하시기 바랍니다. 이 프로젝트는 어떤 AI 제공업체와도 제휴 관계가 없습니다.

## 데이터 소스

데이터는 두 가지 서드파티 수집기 소스에서 수집됩니다. 각 모델의 `source` 필드가 출처를 나타냅니다. **어떤 AI 제공업체도 공개 가격 API를 제공하지 않으므로**, 생태계의 모든 가격 데이터(이 수집기들 포함)는 궁극적으로 공식 문서를 수동으로 읽는 것에서 비롯됩니다.

### 1. OpenRouter API (기본)

- **엔드포인트**: `GET https://openrouter.ai/api/v1/models`
- **역할**: 실시간 모델 가격 및 기능 메타데이터 (Vision, Tools, Context Length 등)
- **가격 정확도**: OpenRouter는 공식 제공업체 가격을 마크업 없이 그대로 전달 (패스스루 가격)
- **라이선스**: OpenRouter 서비스 약관 적용 ([ToS](https://openrouter.ai/terms))
- **참고**: 공개 API이지만 서비스 약관에 데이터 재배포를 명시적으로 허용하지 않음. 본 프로젝트는 출처를 표기하고 비상업적 정보 목적으로 데이터를 사용합니다.

### 2. pydantic/genai-prices (보조)

- **엔드포인트**: `GET https://raw.githubusercontent.com/pydantic/genai-prices/main/prices/data_slim.json`
- **역할**: 직접 제공업체 가격, 캐시 가격 (읽기/쓰기), 계층별 가격 보충
- **가격 정확도**: 공식 문서를 기반으로 수동 관리되며 가격 변동 추적 및 불일치 감지 기능 포함
- **라이선스**: **MIT 라이선스** - 자유롭게 사용, 수정, 재배포 가능 ([LICENSE](https://github.com/pydantic/genai-prices/blob/main/LICENSE))
- **관리**: [Pydantic](https://github.com/pydantic) 팀

### 왜 공식 페이지를 직접 스크래핑하지 않나요?

- 대부분의 AI 제공업체는 공개 가격 API 엔드포인트를 **제공하지 않습니다**
- 공식 가격 페이지의 웹 스크래핑은 불안정하며 (HTML 구조가 자주 변경됨) 각 제공업체의 서비스 약관을 위반할 수 있습니다
- 위의 두 수집기 소스는 생태계에서 사용 가능한 가장 신뢰할 수 있는 프로그래밍 방식의 소스입니다
- 공식 가격 정보는 항상 아래에 나열된 공식 가격 페이지를 참조하세요

### 정확성 및 제한 사항

- 두 소스 모두 **궁극적으로 공식 제공업체 문서에서 파생**되었지만, 서드파티를 통해 수집됩니다
- 가격이 **오래되었을** 수 있습니다 - 제공업체는 사전 통보 없이 언제든지 가격을 변경할 수 있습니다
- 일부 모델의 **메타데이터가 불완전**할 수 있습니다 (예: 캐시 가격 누락, 잘못된 기능 플래그)
- **무료 티어 제한, 요청 제한 및 대량 할인**은 일반적으로 포함되지 않습니다
- 오류를 발견하셨나요? [이슈를 열거나](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues) [PR을 제출](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)해 주세요

## 추적 제공업체 및 공식 가격 페이지

| 제공업체 | 공식 가격 URL |
|----------|--------------|
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

> 위에 나열된 제공업체 외에도 OpenRouter와 genai-prices를 통해 70개 이상의 제공업체가 자동으로 수집됩니다.

## 로컬 사용법

Node.js 20+ 만 필요합니다. 외부 의존성이 없습니다.

```bash
# 가격 수집 실행
node scripts/collect-prices.mjs

# 또는 npm 스크립트 사용
npm run collect
```

출력 파일:
- `outputs/YYYY-MM-DD.json` - 일일 스냅샷
- `outputs/latest.json` - 최신 데이터
- `docs/latest.json` - GitHub Pages 대시보드용

## 출력 JSON 스키마

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

- **스케줄**: 매일 UTC 06:00에 실행
- **수동 트리거**: Actions 탭에서 `workflow_dispatch`를 통해 사용 가능
- 수집된 데이터는 자동으로 커밋 및 푸시됩니다

## 셀프 호스팅 (포크 설정)

1. 이 저장소를 포크합니다
2. **Settings > Pages > Source**: `Deploy from a branch` 선택, Branch: `main`, Folder: `/docs`
3. **Settings > Actions > General**: `Read and write permissions` 활성화
4. Actions 탭에서 워크플로우가 활성화되어 있는지 확인합니다

## 기여하기

가격 오류, 누락된 모델 또는 새로운 제공업체를 제안하고 싶으신가요? 기여를 환영합니다:

- **[이슈 열기](https://github.com/ai-model-price-tracker/ai-model-price-tracker/issues)** - 버그 리포트, 기능 요청
- **[Pull Request 제출](https://github.com/ai-model-price-tracker/ai-model-price-tracker/pulls)** - 직접 수정 및 개선

특히 환영하는 기여:
- 가격 데이터 수정
- 누락된 AI 제공업체/모델 추가
- 대시보드 UI 개선
- 새로운 데이터 소스 제안

## 라이선스

MIT
