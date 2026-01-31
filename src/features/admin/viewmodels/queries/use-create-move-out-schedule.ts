import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useCreateMoveOutSchedule = () => {
  const queryClient = useQueryClient();

  return $api.useMutation('post', ApiPaths.MoveOutController_createMoveOutSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findAllMoveOutSchedules],
      });
    },
  });
};
