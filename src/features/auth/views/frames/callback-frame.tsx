import { useEffect, useRef } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { Loader2 } from 'lucide-react';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { useUserAuth } from '../../viewmodels';

export function CallbackFrame() {
  const { token, loginInProgress: isIdpLoggingIn } = useAuthContext();
  const {
    logIn,
    logInMutation: { isPending: isLoggingIn },
  } = useUserAuth({ showToast: false });
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  const isLoading = isIdpLoggingIn || isLoggingIn;

  useEffect(() => {
    if (hasProcessed.current || isLoading) {
      return;
    }

    if (token) {
      hasProcessed.current = true;
      logIn({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      navigate({ to: '/auth/login' });
    }
  }, [token, logIn, isLoading, navigate]);

  return (
    <div className="flex h-dvh items-center justify-center">
      <Loader2 className="text-icon-gray size-12 animate-spin" />
    </div>
  );
}
