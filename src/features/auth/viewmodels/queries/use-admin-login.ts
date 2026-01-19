import { useMutation } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { authApi } from '../../models';

import type { AdminLoginArgs, JwtToken } from '../../models';

export const useAdminLogin = () => {
  return useMutation<JwtToken, ApiHttpError, AdminLoginArgs>({
    mutationFn: (args) => authApi.adminLogin(args),
  });
};
