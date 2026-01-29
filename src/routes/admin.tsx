import { createFileRoute, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { Loader2, LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Fab } from '@/common/components';
import { useIsAdmin } from '@/features/admin';
import { useAuth, useToken } from '@/features/auth';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function Inner() {
  const { logOut } = useAuth({ showToast: true });
  const { t } = useTranslation('common');
  const isAdmin = useIsAdmin();

  if (isAdmin === undefined) {
    return <Loader2 className="size-6 animate-spin" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
      <Fab>
        <Fab.Item
          icon={<LogOutIcon className="size-6" />}
          label={t('fab.logout')}
          className="text-status-fail"
          onClick={() => logOut({})}
        />
      </Fab>
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
