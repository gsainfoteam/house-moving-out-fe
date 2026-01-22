import { useEffect, useRef } from 'react';

import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useAuthContext } from 'react-oauth2-code-pkce';
import z from 'zod';

import { useUserAuth } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
  validateSearch: z.object({
    code: z.string().optional(),
  }),
});

function CallbackComponent() {
  const { token, loginInProgress: isIdpLoggingIn } = useAuthContext();
  const { logIn, logInMutation: { isPending: isLoggingIn } } = useUserAuth({ showToast: false });
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current || isIdpLoggingIn || isLoggingIn) {
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
  }, [token, logIn, isLoggingIn, isIdpLoggingIn, navigate]);

  return null;
}
