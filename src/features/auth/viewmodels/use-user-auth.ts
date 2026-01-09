import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import type { JwtToken, UserLoginDto } from '../models';
import { authApi } from '../models';

import { useAuthPrompt } from './use-auth-prompt';
import { useToken } from './use-token';

import { useLoading } from '@/common/viewmodels';

interface UseUserAuthOptions {
  showToast?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useUserAuth = (options: UseUserAuthOptions = {}) => {
  const { showToast = false, onSuccess, onError } = options;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    token: idpToken,
    logOut: idpLogOut,
    logIn: idpLogIn,
  } = useAuthContext();
  const [isLoggingOut, withLogoutLoading] = useLoading();

  // FIXME: 로그아웃 2번 눌러야 되는 거 수정 필요 -> 엄청 오래 걸리는(>10s) 로그아웃이 가끔 발생하는데 이 때 에러는 invalid session 401 에러.
  const logOut = () =>
    withLogoutLoading(async () => {
      try {
        await authApi.userLogout();
      } catch (error) {
        onError?.(error);
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const data = error.response?.data as
            | { message?: string; error?: string; statusCode?: number }
            | undefined;
          const message = data?.message;

          // 세션이 이미 무효화된 상태에서 발생하는 401(invalid session)은 서버 기준으로는 이미 로그아웃된 상태이므로 성공으로 간주한다.
          if (!(status === 401 && message === 'invalid session')) {
            if (showToast) {
              toast.error(t('auth.error.logoutFailed'));
            }
            return;
          }
        } else {
          if (showToast) {
            toast.error(t('auth.error.logoutFailed'));
          }
          return;
        }
      }

      useToken.getState().saveToken(null);
      useAuthPrompt.getState().setRecentLogout(true);
      idpLogOut();
    });

  const goToIdpToken = () => navigate({ to: '/auth/login' });
  const goToConsentData = () => navigate({ to: '/auth/consent' });
  const goToHome = () => navigate({ to: '/' });

  const mutation = useMutation({
    mutationFn: async (consentData?: UserLoginDto) => {
      if (!idpToken) {
        goToIdpToken();
        if (showToast) {
          toast.error(t('auth.error.noIdpToken'));
        }
        throw new Error('No IDP token');
      }

      return await authApi.userLogin(idpToken, consentData);
    },
    onSuccess: (response) => {
      useToken.getState().saveToken(response.access_token);
      useAuthPrompt.getState().setRecentLogout(false);
      onSuccess?.();
      goToHome();
    },
    onError: (error) => {
      onError?.(error);

      if (isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 401: {
            idpLogOut();
            goToIdpToken();
            if (showToast) {
              toast.error(t('auth.error.invalidIdpToken'));
            }
            break;
          }
          case 403: {
            // TODO: 약관 버전이 달라져도 403 에러 발생함 -> 이 때 에러 스키마에 나오는 requiredConsents 보고 처리해야 함 -> 에러도 type-safe하게 처리하는 방안 찾아보기
            // TODO: requiredConsents에 맞게 약관 동의 폼 초깃값 설정
            goToConsentData();
            break;
          }
          default: {
            idpLogOut();
            goToIdpToken();
            if (showToast) {
              toast.error(t('auth.error.loginFailed'));
            }
            break;
          }
        }
      } else {
        idpLogOut();
        goToIdpToken();
        if (showToast) {
          toast.error(t('auth.error.loginFailed'));
        }
      }
    },
  });

  const logIn = useCallback(
    async (consentData?: UserLoginDto): Promise<JwtToken> => {
      return await mutation.mutateAsync(consentData);
    },
    [mutation],
  );

  return {
    idpLogIn,
    logIn,
    logOut,
    isLoggingOut,
    isLoggingIn: mutation.isPending,
    isError: mutation.isError,
  };
};
