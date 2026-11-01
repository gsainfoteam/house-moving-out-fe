import { createFileRoute, Navigate, Outlet, redirect, useRouter } from '@tanstack/react-router';

import { AccountError } from '@gsainfoteam/account-react';

import { Loading } from '@/common/components';
import { account } from '@/common/lib';
import { useAuth, useAuthRedirect } from '@/features/auth';

export const Route = createFileRoute('/_auth-required')({
  beforeLoad: async ({ location }) => {
    try {
      await account.requireAuth({ returnTo: location.href });
    } catch (error) {
      if (!AccountError.is(error)) throw error;
      useAuthRedirect.getState().setRedirect(location.href);
      throw redirect({ to: '/auth/login', search: { redirect: location.href } });
    }
  },
  pendingComponent: Loading,
  component: AuthRequiredLayout,
});

function AuthRequiredLayout() {
  const { user } = useAuth();
  const router = useRouter();

  const redirect = router.state.location.pathname + router.state.location.searchStr;

  if (user === undefined) return <Loading />;
  if (user === null) {
    return <Navigate to="/auth/login" search={{ redirect }} replace />;
  }

  return <Outlet />;
}
