import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authApi } from '../models';

import { useToken } from '@/common/viewmodels';

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: (idpAccessToken: string) => authApi.adminLogin(idpAccessToken),
    onSuccess: (data) => {
      useToken.getState().saveToken(data.access_token);
    },
    onError: (error: any) => {
      useToken.getState().saveToken(null);
      const errorMessage =
        error.response?.status === 401
          ? '인증되지 않은 사용자입니다'
          : '로그인에 실패했습니다';
      toast.error(errorMessage);
    },
  });
};

