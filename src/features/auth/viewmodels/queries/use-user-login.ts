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
import { useToken } from '../stores';

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

  return useMutation<JwtToken, ApiHttpError | ConsentRequiredError, UserLoginDto | undefined>({
    mutationFn: async (consentData?: UserLoginDto) => {
      if (!idpToken) {
        navigate({ to: '/auth/login' });
        if (showToast) {
          toast.error(t('error.noIdpToken'));
        }
        throw new Error('No IDP token');
      }

      return await authApi.userLogin({ idpToken, consentData });
    },
    onSuccess: (response) => {
      useToken.getState().saveToken(response.access_token);
      onSuccess?.(response);
      navigate({ to: '/' });
    },
    onError: (error) => {
      onError?.(error);

      if (isApiHttpError(error)) {
        if (error.statusCode === 401) {
          idpLogOut();
          navigate({ to: '/auth/login' });
          if (showToast) {
            toast.error(t('error.invalidIdpToken'));
          }
          return;
        }

        if (error.statusCode === 403) {
          const consentError = ConsentRequiredErrorSchema.safeParse(error.raw || error);

          if (consentError.success) {
            onConsentRequired?.(consentError.data);
            navigate({
              to: '/auth/consent',
              state: (prev) => ({
                ...prev,
                requiredConsents: consentError.data.requiredConsents,
              }),
            });
            return;
          }
        }
      }

      idpLogOut();
      navigate({ to: '/auth/login' });
      if (showToast) {
        toast.error(t('error.loginFailed'));
      }
    },
  });
};
