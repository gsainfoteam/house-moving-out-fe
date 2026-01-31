import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindMoveOutScheduleWithSlots = (id: number) => {
  return $api.useQuery('get', ApiPaths.MoveOutController_findMoveOutScheduleWithSlots, {
    params: {
      path: { id },
    },
  });
};
