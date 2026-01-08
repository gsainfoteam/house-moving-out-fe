import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { useOAuthLogin } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const { tryLogin } = useOAuthLogin();
  const { token } = useAuthContext();

  useEffect(() => {
    const handleCallback = async () => {
      // FIXME: 책임 소재가 명확하지 않음. tryLogin은 내부에서 navigation이 들어가고, handleOAuthCallback은 내부에서 navigation이 들어가지 않음.
      if (token) {
        await tryLogin();
      }
    };

    handleCallback();
  }, [token, tryLogin]);

  return null;
}
