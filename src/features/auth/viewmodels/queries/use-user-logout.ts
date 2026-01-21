import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

import { useAuthPrompt, useToken } from '../stores';

export const useUserLogout = ({ showToast = false }: { showToast?: boolean } = {}) => {
  const { t } = useTranslation('auth');
  const { logOut: idpLogOut } = useAuthContext();

  return $api.useMutation('post', ApiPaths.AuthController_userLogout, {
    onError: () => {
      if (showToast) {
        toast.error(t('error.logoutFailed'));
      }
    },
    onSettled: () => {
      useToken.getState().saveToken(null);
      useAuthPrompt.getState().setRecentLogout(true);
      idpLogOut();
    },
  });
};
