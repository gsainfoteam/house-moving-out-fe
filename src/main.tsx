import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce';
import { Toaster } from 'sonner';

import './styles.css';

import { cn } from './common/utils';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const authConfig: TAuthConfig = {
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
  onRefreshTokenExpire: (event) => event.logIn(undefined, undefined, 'popup'),
  extraAuthParameters: {
    prompt: 'consent',
  },
  decodeToken: false,
};

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider authConfig={authConfig}>
        <QueryClientProvider client={queryClient}>
          <Toaster
            toastOptions={{
              classNames: {
                error: cn('bg-status-fail! text-white!'),
              },
            }}
          />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>,
  );
}
