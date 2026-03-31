import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';
import { Toaster } from 'sonner';

import { OverlayHost, OverlayProvider } from './common/lib';
import { useAuthPrompt } from './features/auth';
import { queryClient, router } from './main';

import '@/common/lib/dayjs-init';

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
  scope: ['offline_access', 'name', 'email', 'phone_number', 'student_id'].join(' '),
  onRefreshTokenExpire: (event) => event.logIn(undefined, undefined, 'redirect'),
  extraAuthParameters: {
    prompt: recentLogout ? 'login' : 'consent',
  },
  decodeToken: false,
  autoLogin: false,
});

function InnerWrap({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <>
      <OverlayHost />
      {children}
      {import.meta.env.DEV && (
        <TanStackRouterDevtools
          router={router}
          key={isAdmin ? 'bottom-right' : 'top-left'}
          position={isAdmin ? 'bottom-right' : 'top-left'}
        />
      )}
    </>
  );
}

export function App() {
  const recentLogout = useAuthPrompt((state) => state.recentLogout);
  const authConfig = createAuthConfig(recentLogout);

  return (
    <AuthProvider authConfig={authConfig}>
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <Toaster />
          <RouterProvider router={router} InnerWrap={InnerWrap} />
        </OverlayProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
