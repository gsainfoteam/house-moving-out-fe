import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { UserLayoutFrame } from '@/common/frames';
import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/_auth-required/_user/inspector')({
  component: InspectorLayout,
});

function InspectorLayout() {
  const { inspector } = useAuth({ showToast: true });

  if (inspector === undefined) return <Loading />;
  if (inspector === null) return <Navigate to="/" replace />;

  return <UserLayoutFrame />;
}
