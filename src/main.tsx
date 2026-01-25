import { StrictMode } from 'react';

import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

import ReactDOM from 'react-dom/client';

import { App } from './app';
import { routeTree } from './routeTree.gen';

import './styles.css';
import type { ConsentFormData } from './features/auth';

export const queryClient = new QueryClient();

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
  interface HistoryState {
    consentFormData?: ConsentFormData;
  }
}

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
