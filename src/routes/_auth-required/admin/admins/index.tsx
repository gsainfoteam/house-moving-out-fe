import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { AdminManagementFrame } from '@/features/admin';
import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/_auth-required/admin/admins/')({
  component: AdminsRoute,
});

function AdminsRoute() {
  const { isAdmin, isSuperAdmin } = useAuth({ showToast: true });

  if (isAdmin === undefined || isSuperAdmin === undefined) return <Loading />;
  if (!isAdmin) return <Navigate to="/" replace />;
  if (!isSuperAdmin) return <Navigate to="/admin" replace />;

  return <AdminManagementFrame />;
}
