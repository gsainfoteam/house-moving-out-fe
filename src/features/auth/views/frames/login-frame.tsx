import { useEffect } from 'react';

import { Navigate, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useAuth, useAuthRedirect, useRequiredConsents } from '../../viewmodels';
import { LoginScreen } from '../screens';

export function LoginFrame() {
  const { logIn, loginError } = useAuth();
  const requiredConsents = useRequiredConsents();
  const { redirect } = useSearch({ from: '/auth' });
  const { t } = useTranslation('auth');

  useEffect(() => {
    if (!loginError || requiredConsents || loginError.code === 'user_cancelled') return;
    toast.error(t('error.loginFailed'));
  }, [loginError, requiredConsents, t]);

  if (requiredConsents) return <Navigate to="/auth/consent" replace />;

  return (
    <LoginScreen
      onLogin={() => {
        useAuthRedirect.getState().setRedirect(redirect);
        logIn();
      }}
    />
  );
}
