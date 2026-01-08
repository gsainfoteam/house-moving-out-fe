import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import type { JwtToken, UserLoginDto } from '../models';
import { authApi } from '../models';

import { useToken } from './use-token';

interface UseUserLoginOptions {
  showToast?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useUserLogin = (options: UseUserLoginOptions = {}) => {
  const { showToast = false, onSuccess, onError } = options;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, logOut } = useAuthContext();

  const goToIdpToken = () => navigate({ to: '/auth/login' });
  const goToConsentData = () => navigate({ to: '/auth/consent' });
  const goToHome = () => navigate({ to: '/' });

  const mutation = useMutation({
    mutationFn: async (consentData?: UserLoginDto) => {
      if (!token) {
        if (showToast) {
          toast.error(t('auth.error.noIdpToken'));
        }
        goToIdpToken();
        throw new Error('No IDP token');
      }

      return await authApi.userLogin(token, consentData);
    },
    onSuccess: (response) => {
      useToken.getState().saveToken(response.access_token);
      onSuccess?.();
      goToHome();
    },
    onError: (error) => {
      onError?.(error);

      if (isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 401: {
            logOut();
            if (showToast) {
              toast.error(t('auth.error.invalidIdpToken'));
            }
            goToIdpToken();
            break;
          }
          case 403: {
            // TODO: 약관 버전이 달라져도 403 에러 발생함 -> 이 때 에러 스키마에 나오는 requiredConsents 보고 처리해야 함 -> 에러도 type-safe하게 처리하는 방안 찾아보기
            // TODO: requiredConsents에 맞게 약관 동의 폼 초깃값 설정
            goToConsentData();
            break;
          }
          default: {
            if (showToast) {
              toast.error(t('auth.error.loginFailed'));
            }
            goToIdpToken();
            break;
          }
        }
      } else {
        if (showToast) {
          toast.error(t('auth.error.loginFailed'));
        }
        goToIdpToken();
      }
    },
  });

  const performUserLogin = async (
    consentData?: UserLoginDto,
  ): Promise<JwtToken> => {
    return await mutation.mutateAsync(consentData);
  };

  return {
    performUserLogin,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
};
