import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useApplyInspection = () => {
  const queryClient = useQueryClient();

  return $api.useMutation('post', ApiPaths.MoveOutController_applyInspection, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findMoveOutScheduleWithSlots],
      });
    },
  });
};
