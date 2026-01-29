import { $api } from '@/common/lib';

import { ApiPaths } from '../../../main/models';

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
