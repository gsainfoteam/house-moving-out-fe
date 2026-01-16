import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-text-gray">Loading...</div>
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
