import { createFileRoute, Link, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LanguageToggle, Loading } from '@/common/components';
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
    <div className="bg-bg-surface flex h-dvh flex-col">
      <header className="bg-bg-white flex shrink-0 items-center gap-6 border-b border-gray-200 px-4 py-3 shadow-sm">
        <Link
          to="/admin"
          className="text-text-gray hover:bg-bg-surface hover:text-text-black flex items-center gap-2 rounded-lg p-2 transition-colors"
        >
          <HomeIcon className="size-5 shrink-0" aria-hidden />
          <span className="text-sub2">{t('home')}</span>
        </Link>
        <nav className="flex flex-1 items-center gap-1">
          <Link
            to="/admin/schedules"
            className="text-sub2 text-text-black hover:bg-bg-surface hover:text-primary-main rounded-lg px-3 py-2 font-medium transition-colors"
          >
            {t('schedule.list')}
          </Link>
        </nav>
        <div className="px-2">
          <LanguageToggle />
        </div>
      </header>
      <main className="flex min-h-0 flex-1 overflow-auto">
        <Outlet />
      </main>
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
