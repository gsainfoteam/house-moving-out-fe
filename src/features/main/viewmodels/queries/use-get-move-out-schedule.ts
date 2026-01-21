import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useGetMoveOutScheduleQuery = (id: number, enabled = true) => {
  return $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findMoveOutScheduleWithSlots,
    {
      params: {
        path: { id },
      },
    },
    {
      enabled,
    },
  );
};
