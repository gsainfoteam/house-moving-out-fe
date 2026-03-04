import { Suspense } from 'react';

import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { i18n } from '@/common/lib';
import { useAuth } from '@/features/auth';
import { InspectionChecklistProvider } from '@/features/inspector/viewmodels';

export const Route = createFileRoute('/_auth-required/_user/inspector')({
  beforeLoad: () => {
    i18n.loadNamespaces('inspector');
  },
  component: InspectorLayout,
});

function InspectorLayout() {
  const { inspector } = useAuth({ showToast: true });

  if (inspector === undefined) return <Loading />;
  if (inspector === null) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={<Loading />}>
      <InspectionChecklistProvider>
        <Outlet />
      </InspectionChecklistProvider>
    </Suspense>
  );
}
