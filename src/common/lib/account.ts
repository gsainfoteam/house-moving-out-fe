import { createAccountClient } from '@gsainfoteam/account-react';

const getRequiredEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as string;
};

// 라우터보다 먼저 만들어야 IdP callback 주소를 로그인 전 위치로 바꿔 둔다. main.tsx 가 라우터를 만들기 전에 이 모듈이 불린다
export const account = createAccountClient({
  issuer: 'production',
  clientId: getRequiredEnv('VITE_IDP_CLIENT_ID'),
  api: import.meta.env.DEV ? '/api' : getRequiredEnv('VITE_API_BASE_URL'),
});
