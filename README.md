# House Moving Out FE

하우스 퇴사검사 사이트

## 개발 환경 설정

### 필수 요구사항

- [Bun](https://bun.sh/) (패키지 매니저)
- Node.js (Bun과 함께 설치됨)

### 환경 변수 설정

`.env` 파일에 다음 환경 변수들이 필요합니다:

- `VITE_IDP_CLIENT_ID`
- `VITE_IDP_REDIRECT_URI`
- `VITE_IDP_AUTHORIZE_URL`
- `VITE_IDP_TOKEN_URL`
- `VITE_API_BASE_URL`

자세한 내용은 `.env.example` 파일과 infisical을 참고해주세요.

## 개발 방법

### 설치

```bash
bun install
```

### 개발 서버 실행

```bash
bun run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
bun run build
```

### 코드 품질 관리

```bash
# 린트 검사
bun run lint

# 포맷팅
bun run format

# 린트 검사 및 포맷팅 자동 수정
bun run check
```

### 테스트

```bash
bun run test
```

### Storybook

```bash
# Storybook 개발 서버 실행
bun run storybook

# Storybook 빌드
bun run build-storybook
```

## i18n (국제화)

이 프로젝트는 [i18next](https://www.i18next.com/)와 [i18next-cli](https://github.com/i18next/i18next-cli)를 사용하여 다국어를 지원합니다.

### 주요 명령어

```bash
# 번역 키 추출 (개발 중 watch 모드 권장)
bun run i18n:extract:watch

# 번역 상태 확인
bun run i18n:status

# 언어 파일 동기화
bun run i18n:sync

# 하드코딩된 문자열 검사
bun run i18n:lint

# TypeScript 타입 생성
bun run i18n:types
```

### 사용법

- 번역 파일: `public/locales/{language}/{namespace}.json`
- 코드에서 사용: `useTranslation('namespace')`로 네임스페이스 지정 후 `t('key')` 사용
- 개발 중에는 `bun run i18n:extract:watch`를 실행하여 번역 키 변경사항을 자동으로 반영
