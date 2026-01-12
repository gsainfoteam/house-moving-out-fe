import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { ConsentFrame } from '@/features/auth';

export const Route = createFileRoute('/auth/consent')({
  component: ConsentComponent,
});

function ConsentComponent() {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <ConsentFrame />;
}
