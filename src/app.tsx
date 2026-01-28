import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';
import { Toaster } from 'sonner';

import { OverlayProvider } from './common/lib';
import { useAuthPrompt } from './features/auth';
import { queryClient, router } from './main';

const getRequiredEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as string;
};

const createAuthConfig = (recentLogout: boolean): TAuthConfig => ({
  clientId: getRequiredEnv('VITE_IDP_CLIENT_ID'),
  authorizationEndpoint: getRequiredEnv('VITE_IDP_AUTHORIZE_URL'),
  tokenEndpoint: getRequiredEnv('VITE_IDP_TOKEN_URL'),
  redirectUri: getRequiredEnv('VITE_IDP_REDIRECT_URI'),
  scope: ['offline_access', 'profile', 'email', 'phone_number', 'student_id'].join(' '),
  onRefreshTokenExpire: (event) => event.logIn(undefined, undefined, 'redirect'),
  extraAuthParameters: {
    prompt: recentLogout ? 'login' : 'consent',
  },
  decodeToken: false,
  autoLogin: false,
});

export function App() {
  const recentLogout = useAuthPrompt((state) => state.recentLogout);
  const authConfig = createAuthConfig(recentLogout);

  return (
    <AuthProvider authConfig={authConfig}>
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <Toaster />
          <RouterProvider router={router} />
        </OverlayProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
