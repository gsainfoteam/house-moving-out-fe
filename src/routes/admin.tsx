import { createFileRoute, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { useAuth, useToken } from '@/features/auth';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function Inner() {
  const { isAdmin } = useAuth({ showToast: true });

  if (isAdmin === undefined) return <Loading />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <>
      <Outlet />
    </>
  );
}

function AdminLayout() {
  const { token } = useToken();
  const router = useRouter();

  const redirect = router.state.location.pathname + router.state.location.searchStr;

  if (!token) {
    return <Navigate to="/auth/login" search={{ redirect }} replace />;
  }

  return <Inner />;
}
