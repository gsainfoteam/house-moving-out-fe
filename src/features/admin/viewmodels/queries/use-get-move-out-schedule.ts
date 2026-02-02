import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useGetMoveOutScheduleQuery = (uuid: string) => {
  return $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findMoveOutScheduleWithSlots,
    { params: { path: { uuid } } },
    {
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return count < 3;
      },
    },
  );
};
