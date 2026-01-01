import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

import { useToken } from '@/common/viewmodels';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function AuthLayout() {
  const { token } = useToken();
  const { redirect } = Route.useSearch();

  if (token) return <Navigate to={redirect ?? '/'} />;
  return <Outlet />;
}
