import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { isApiHttpError, type ApiHttpError } from '@/common/lib';

import {
  authApi,
  ConsentRequiredErrorSchema,
  type ConsentRequiredError,
  type JwtToken,
  type UserLoginDto,
} from '../../models';
import { useAuthPrompt, useToken } from '../stores';

interface UseUserLoginOptions {
  showToast?: boolean;
  onSuccess?: (data: JwtToken) => void;
  onError?: (error: ApiHttpError | ConsentRequiredError | unknown) => void;
  onConsentRequired?: (error: ConsentRequiredError) => void;
}

export const useUserLogin = (options: UseUserLoginOptions = {}) => {
  const { showToast = false, onSuccess, onError, onConsentRequired } = options;
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { token: idpToken, logOut: idpLogOut } = useAuthContext();

  const goToIdpToken = () => navigate({ to: '/auth/login' });
  const goToConsentData = () => navigate({ to: '/auth/consent' });
  const goToHome = () => navigate({ to: '/' });

  return useMutation<JwtToken, ApiHttpError | ConsentRequiredError, UserLoginDto | undefined>({
    mutationFn: async (consentData?: UserLoginDto) => {
      if (!idpToken) {
        goToIdpToken();
        if (showToast) {
          toast.error(t('error.noIdpToken'));
        }
        throw new Error('No IDP token');
      }

      return await authApi.userLogin({ idpToken, consentData });
    },
    onSuccess: (response) => {
      useToken.getState().saveToken(response.access_token);
      useAuthPrompt.getState().setRecentLogout(false);
      onSuccess?.(response);
      goToHome();
    },
    onError: (error) => {
      // 403 에러인 경우 ConsentRequiredErrorDto로 추가 파싱 시도
      if (isApiHttpError(error) && error.statusCode === 403) {
        const consentError = ConsentRequiredErrorSchema.safeParse(error.raw || error);

        if (consentError.success) {
          // ConsentRequired 에러 처리
          onConsentRequired?.(consentError.data);
          goToConsentData();
          return;
        }
      }

      // 일반 에러 처리
      onError?.(error);

      if (isApiHttpError(error)) {
        switch (error.statusCode) {
          case 401: {
            idpLogOut();
            goToIdpToken();
            if (showToast) {
              toast.error(t('error.invalidIdpToken'));
            }
            break;
          }
          default: {
            idpLogOut();
            goToIdpToken();
            if (showToast) {
              toast.error(t('error.loginFailed'));
            }
            break;
          }
        }
      } else {
        idpLogOut();
        goToIdpToken();
        if (showToast) {
          toast.error(t('error.loginFailed'));
        }
      }
    },
  });
};
