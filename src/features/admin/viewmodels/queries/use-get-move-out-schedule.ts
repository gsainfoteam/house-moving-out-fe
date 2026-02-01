import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useGetMoveOutScheduleQuery = (uuid: string, enabled = true) => {
  return $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findMoveOutScheduleWithSlots,
    {
      params: {
        path: { uuid },
      },
    },
    {
      enabled,
    },
  );
};
