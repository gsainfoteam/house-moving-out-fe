import { useQueryClient } from '@tanstack/react-query';

import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useCreateMoveOutSchedule = () => {
  const queryClient = useQueryClient();

  return $api.useMutation(
    'post',
    ApiPaths.MoveOutController_createMoveOutSchedule,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.MoveOutController_findMoveOutScheduleWithSlots],
        });
      },
    },
  );
};
