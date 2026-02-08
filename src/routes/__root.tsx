import { Suspense } from 'react';

import { Outlet, createRootRoute } from '@tanstack/react-router';

import { Loading } from '@/common/components';

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
});
