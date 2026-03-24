import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { useAuth } from '@/features/auth';
import { ApplicationFrame } from '@/features/user';

export const Route = createFileRoute('/_auth-required/_user/application')({
  component: ApplicationRoute,
});

function ApplicationRoute() {
  const { user } = useAuth();

  if (user === undefined) return <Loading />;
  if (user?.applyCleaningService) return <Navigate to="/" replace />;

  return <ApplicationFrame />;
}
