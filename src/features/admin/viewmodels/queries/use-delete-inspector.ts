import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteInspector = () => {
  const queryClient = useQueryClient();
  return $api.useMutation('delete', ApiPaths.InspectorController_deleteInspector, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findInspectorsByScheduleUuid],
      }),
  });
};
