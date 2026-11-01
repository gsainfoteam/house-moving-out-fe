import { createFileRoute, Navigate } from '@tanstack/react-router';

import { ConsentFrame, useRequiredConsents } from '@/features/auth';

export const Route = createFileRoute('/auth/consent')({
  component: ConsentComponent,
});

function ConsentComponent() {
  const requiredConsents = useRequiredConsents();

  if (!requiredConsents) {
    return <Navigate to="/auth/login" replace />;
  }

  return <ConsentFrame />;
}
