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
  defaultViewTransition: {
    types: ({ fromLocation, toLocation, hrefChanged }) => {
      if (!fromLocation || !hrefChanged) return ['reload'];
      if (fromLocation.pathname === toLocation.pathname) return ['reload'];

      const fromIndex = fromLocation.state.__TSR_index;
      const toIndex = toLocation.state.__TSR_index;

      return [fromIndex > toIndex ? 'backwards' : 'forwards'];
    },
  },
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
