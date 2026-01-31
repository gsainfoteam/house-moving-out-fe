import { createFileRoute, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Fab, Loading } from '@/common/components';
import { useAuth, useToken } from '@/features/auth';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function Inner() {
  const { logOut, isAdmin } = useAuth({ showToast: true });
  const { t } = useTranslation('common');

  if (isAdmin === undefined) return <Loading />;
  if (!isAdmin) return <Navigate to="/" replace />;

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
