import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { authApi } from '../models';

import { useToken } from '@/common/viewmodels';

export const useAdminLogin = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (code: string) => authApi.adminLogin(code),
    onSuccess: (data) => {
      useToken.getState().saveToken(data.access_token);
    },
    onError: () => {
      useToken.getState().saveToken(null);
      toast.error(t('auth.error.loginFailed'));
    },
  });
};
