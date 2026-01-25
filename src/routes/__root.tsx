import { Suspense } from 'react';

import { Outlet, createRootRoute } from '@tanstack/react-router';

import { Loader2 } from 'lucide-react';

function LoadingFallback() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Loader2 className="text-icon-gray size-12 animate-spin" />
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  ),
});
