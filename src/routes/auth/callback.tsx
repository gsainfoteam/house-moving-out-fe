import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { useAdminOAuthLogin } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAdminOAuthLogin();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleOAuthCallback();
        navigate({ to: '/admin/dashboard' });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '로그인에 실패했습니다';
        toast.error(errorMessage);
        navigate({ to: '/admin/login' });
      }
    };

    handleCallback();
  }, [handleOAuthCallback, navigate]);

  return null;
}

