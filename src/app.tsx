import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AccountProvider } from '@gsainfoteam/account-react';
import { Toaster } from 'sonner';

import { Loading, PwaUpdatePrompt } from './common/components';
import { account, OverlayHost, OverlayProvider } from './common/lib';
import { queryClient, router } from './main';

import '@/common/lib/dayjs-init';

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
  return (
    <AccountProvider client={account} fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <Toaster />
          <PwaUpdatePrompt />
          <RouterProvider router={router} InnerWrap={InnerWrap} />
        </OverlayProvider>
      </QueryClientProvider>
    </AccountProvider>
  );
}
