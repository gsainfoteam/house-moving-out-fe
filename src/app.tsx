import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';
import { Toaster } from 'sonner';

import { cn } from './common/utils';
import { useAuthPrompt } from './features/auth/viewmodels/use-auth-prompt';
import { queryClient, router } from './main';

const createAuthConfig = (recentLogout: boolean): TAuthConfig => ({
  clientId: import.meta.env.VITE_IDP_CLIENT_ID,
  authorizationEndpoint: import.meta.env.VITE_IDP_AUTHORIZE_URL,
  tokenEndpoint: import.meta.env.VITE_IDP_TOKEN_URL,
  redirectUri: import.meta.env.VITE_IDP_REDIRECT_URI,
  scope: [
    'offline_access',
    'profile',
    'email',
    'phone_number',
    'student_id',
  ].join(' '),
  onRefreshTokenExpire: (event) =>
    event.logIn(undefined, undefined, 'redirect'),
  extraAuthParameters: {
    prompt: recentLogout ? 'login' : 'consent',
  },
  decodeToken: false,
  autoLogin: false,
});

const toastOptions = {
  classNames: {
    error: cn('bg-status-fail! text-text-white!'),
  },
};

export function App() {
  const recentLogout = useAuthPrompt((state) => state.recentLogout);
  const authConfig = createAuthConfig(recentLogout);

  return (
    <AuthProvider authConfig={authConfig}>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={toastOptions} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
