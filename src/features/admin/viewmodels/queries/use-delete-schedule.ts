import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteSchedule = (uuid: string) => {
  const queryClient = useQueryClient();

  const api = $api.useMutation('delete', ApiPaths.ScheduleController_removeMoveOutSchedule, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.ScheduleController_findAllMoveOutSchedules],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.ScheduleController_findMoveOutScheduleWithSlots],
        }),
      ]);
    },
  });

  const deleteSchedule = () => api.mutateAsync({ params: { path: { uuid } } });

  return {
    ...api,
    deleteSchedule,
  };
};
