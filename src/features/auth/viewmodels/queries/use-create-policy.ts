import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { authApi, authQueryKeys } from '../../models';
import type {
  CreateNewPolicyDto,
  CreateNewPolicyResponseDto,
} from '../../models';

export const useCreatePolicyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateNewPolicyResponseDto,
    ApiHttpError,
    CreateNewPolicyDto
  >({
    mutationFn: (data) => authApi.createNewPolicyVersion(data),
    onSuccess: () => {
      // 정책 관련 쿼리 무효화 (필요시)
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
  });
};
