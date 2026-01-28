import { useCallback } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { useLogin, useLogout } from './queries';

export const useAuth = ({ showToast = false }: { showToast?: boolean } = {}) => {
  const { token: idpToken, logIn: idpLogIn } = useAuthContext();
  const { mutate: logInMutate, ...logInMutation } = useLogin({ showToast });
  const { mutate: logOut, ...logOutMutation } = useLogout({ showToast });
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const logIn = useCallback(
    (...args: Parameters<typeof logInMutate>) => {
      if (!idpToken) {
        navigate({ to: '/auth/login' });
        if (showToast) {
          toast.error(t('error.noIdpToken'));
        }
        return;
      }

      return logInMutate(...args);
    },
    [idpToken, navigate, showToast, t, logInMutate],
  );

  // TODO: 로그아웃 2번 눌러야 되는 거 수정 필요 -> 엄청 오래 걸리는(>10s) 로그아웃이 가끔 발생하는데 이 때 에러는 invalid session 401 에러.
  return {
    idpLogIn,
    logIn,
    logOut,
    logInMutation,
    logOutMutation,
  };
};
