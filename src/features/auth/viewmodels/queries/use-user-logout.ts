import { useMutation } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { authApi } from '../../models';

export const useUserLogout = () => {
  return useMutation<void, ApiHttpError, void>({
    mutationFn: () => authApi.userLogout(),
  });
};
