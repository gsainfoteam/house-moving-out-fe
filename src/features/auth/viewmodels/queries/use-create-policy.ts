import { useQueryClient } from '@tanstack/react-query';

import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useCreatePolicyMutation = () => {
  const queryClient = useQueryClient();

  return $api.useMutation('post', ApiPaths.AuthController_createNewPolicyVersion, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
