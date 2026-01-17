import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
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
  const { token, loginInProgress } = useAuthContext();
  const { logIn, isLoggingIn } = useUserAuth({ showToast: false });
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current || loginInProgress || isLoggingIn) {
      return;
    }

    if (token) {
      hasProcessed.current = true;
      logIn();
      return;
    }

    // token이 없으면 로그인 페이지로 리다이렉트
    navigate({ to: '/auth/login' });
  }, [token, logIn, loginInProgress, isLoggingIn, navigate]);

  return null;
}
