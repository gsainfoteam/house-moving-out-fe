import { useMutation } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { type JwtToken, authApi } from '../../models';

export const useUserRefresh = () => {
  return useMutation<JwtToken, ApiHttpError, void>({
    mutationFn: () => authApi.userRefresh(),
  });
};
