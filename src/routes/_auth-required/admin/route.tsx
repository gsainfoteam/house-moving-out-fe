import { Suspense } from 'react';

import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { i18n } from '@/common/lib';
import { AdminLayoutFrame } from '@/features/admin';
import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/_auth-required/admin')({
  beforeLoad: () => {
    i18n.loadNamespaces('admin');
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { isAdmin } = useAuth({ showToast: true });

  if (isAdmin === undefined) return <Loading />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={<Loading />}>
      <AdminLayoutFrame />
    </Suspense>
  );
}
