import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

import { useToken } from '@/common/viewmodels';
import { useConsent } from '@/features/auth';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  validateSearch: z.object({
    redirect: z
      .string()
      .min(1, 'Redirect cannot be empty')
      .refine(
        (val) => val.startsWith('/') && !val.startsWith('//'),
        'Redirect must be a relative path',
      )
      .optional(),
  }),
});

function AuthLayout() {
  const { token } = useToken();
  const { redirect } = Route.useSearch();
  const { isAllAgreed } = useConsent();

  if (token && isAllAgreed()) {
    return <Navigate to={redirect ?? '/'} />;
  }

  return <Outlet />;
}
