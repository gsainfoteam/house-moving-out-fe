import { useMutation } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { authApi } from '../../models';
import type { JwtToken } from '../../models';

export const useAdminRefresh = () => {
  return useMutation<JwtToken, ApiHttpError, void>({
    mutationFn: () => authApi.adminRefresh(),
  });
};
