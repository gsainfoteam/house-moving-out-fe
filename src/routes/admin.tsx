import { createFileRoute, Link, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';
import { useAuth, useToken } from '@/features/auth';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function Inner() {
  const { isAdmin } = useAuth({ showToast: true });
  const { t } = useTranslation('admin');

  if (isAdmin === undefined) return <Loading />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-4 border-b border-gray-200 p-3 px-4">
        <Link to="/admin">
          <HomeIcon />
        </Link>
        <Link to="/admin/schedules">{t('schedule.list')}</Link>
      </header>
      <Outlet />
    </div>
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
