import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useOAuthLogin } from '@/features/auth';

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
});

function CallbackComponent() {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useOAuthLogin();
  const { t } = useTranslation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleOAuthCallback();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : t('auth.error.callbackFailed');
        toast.error(errorMessage);
      }
      navigate({ to: '/' });
    };

    handleCallback();
  }, [handleOAuthCallback, navigate, t]);

  return null;
}
