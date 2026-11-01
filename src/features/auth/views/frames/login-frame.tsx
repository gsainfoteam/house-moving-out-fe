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

  // IdP 에서 돌아온 로그인을 백엔드가 약관 동의를 요구하며 거절했다
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
