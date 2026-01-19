import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { isApiHttpError } from '@/common/lib';
import { useLoading } from '@/common/viewmodels';

import { useUserLogin, useUserLogout } from './queries';
import { useAuthPrompt, useToken } from './stores';

import type { UserLoginDto } from '../models';

interface UseUserAuthOptions {
  showToast?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useUserAuth = (options: UseUserAuthOptions = {}) => {
  const { showToast = false, onSuccess, onError } = options;
  const { t } = useTranslation('auth');
  const { logOut: idpLogOut, logIn: idpLogIn } = useAuthContext();
  const [isLoggingOut, withLogoutLoading] = useLoading();

  const loginMutation = useUserLogin({
    showToast,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const logoutMutation = useUserLogout();

  // TODO: 로그아웃 2번 눌러야 되는 거 수정 필요 -> 엄청 오래 걸리는(>10s) 로그아웃이 가끔 발생하는데 이 때 에러는 invalid session 401 에러.
  const logOut = useCallback(
    () =>
      withLogoutLoading(async () => {
        try {
          await logoutMutation.mutateAsync();
        } catch (error) {
          // invalid session이 아닌 경우에만 에러 처리
          if (
            isApiHttpError(error) &&
            error.statusCode === 401 &&
            error.message === 'invalid session'
          ) {
            // invalid session은 무시
            return;
          }

          onError?.(error);
          if (showToast) {
            toast.error(t('error.logoutFailed'));
          }
        } finally {
          useToken.getState().saveToken(null);
          useAuthPrompt.getState().setRecentLogout(true);
          idpLogOut();
        }
      }),
    [logoutMutation, withLogoutLoading, onError, showToast, t, idpLogOut],
  );

  const logIn = useCallback(
    (consentData?: UserLoginDto) => {
      loginMutation.mutate(consentData);
    },
    [loginMutation],
  );

  return {
    idpLogIn,
    logIn,
    logOut,
    isLoggingOut,
    isLoggingIn: loginMutation.isPending,
    isError: loginMutation.isError,
  };
};
