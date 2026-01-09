import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { useUserAuth } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const { token, loginInProgress } = useAuthContext();
  const { logIn } = useUserAuth({ showToast: false });
  const router = useRouter();

  useEffect(() => {
    if (loginInProgress) return;

    if (token) {
      logIn().catch();
      return;
    }

    router.navigate({ to: '/auth/login' });
  }, [token, logIn, router, loginInProgress]);

  return null;
}
