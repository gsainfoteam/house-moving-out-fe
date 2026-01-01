import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useOAuthLogin } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useOAuthLogin();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleOAuthCallback();
      } catch (err) {
        console.error('로그인 처리 중 오류:', err);
      }
      navigate({ to: '/' });
    };

    handleCallback();
  }, [handleOAuthCallback, navigate]);

  return null;
}
