import { useMutation } from '@tanstack/react-query';

import { authApi } from '../models';

import { useToken } from '@/common/viewmodels';

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: (code: string) => authApi.adminLogin(code),
    onSuccess: (data) => {
      useToken.getState().saveToken(data.access_token);
    },
    onError: () => {
      useToken.getState().saveToken(null);
    },
  });
};
