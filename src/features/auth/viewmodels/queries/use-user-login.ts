import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

import { useToken } from '../stores';

export const useUserLogin = ({ showToast = false }: { showToast?: boolean } = {}) => {
  const { t } = useTranslation('auth');
  const { logOut: idpLogOut } = useAuthContext();
  const navigate = useNavigate();

  return $api.useMutation('post', ApiPaths.AuthController_userLogin, {
    onSuccess: (response) => {
      useToken.getState().saveToken(response.access_token);
      navigate({ to: '/' });
    },
    onError: async (error) => {
      if (error?.statusCode === 401) {
        idpLogOut();
        navigate({ to: '/auth/login' });
        if (showToast) {
          toast.error(t('error.invalidIdpToken'));
        }
      } else if (error?.statusCode === 403) {
        navigate({
          to: '/auth/consent',
          state: (prev) => ({
            ...prev,
            requiredConsents: error.requiredConsents,
          }),
        });
      } else {
        idpLogOut();
        navigate({ to: '/auth/login' });
        if (showToast) {
          toast.error(t('error.loginFailed'));
        }
      }
    },
  });
};
