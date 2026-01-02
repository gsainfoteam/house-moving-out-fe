import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
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

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
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
    </StrictMode>,
  );
}
