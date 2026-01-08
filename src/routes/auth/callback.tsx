import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { useUserAuth } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const { token } = useAuthContext();
  const { logIn } = useUserAuth({ showToast: false });

  useEffect(() => {
    if (token) {
      logIn();
    }
  }, [token, logIn]);

  return null;
}
