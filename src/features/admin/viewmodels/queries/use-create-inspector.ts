import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useCreateInspector = () => {
  const queryClient = useQueryClient();
  return $api.useMutation('post', ApiPaths.InspectorController_createInspectors, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.InspectorController_getInspectors],
      });
    },
  });
};
