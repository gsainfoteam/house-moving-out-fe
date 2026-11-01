import { createAccountClient } from '@gsainfoteam/account-react';

const getRequiredEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as string;
};

export const account = createAccountClient({
  issuer: 'production',
  clientId: getRequiredEnv('VITE_IDP_CLIENT_ID'),
  api: import.meta.env.DEV ? '/api' : getRequiredEnv('VITE_API_BASE_URL'),
});
