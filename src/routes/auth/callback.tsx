import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { useUserLogin } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const { token } = useAuthContext();
  const { performUserLogin } = useUserLogin({ showToast: false });

  useEffect(() => {
    if (token) {
      performUserLogin();
    }
  }, [token, performUserLogin]);

  return null;
}
