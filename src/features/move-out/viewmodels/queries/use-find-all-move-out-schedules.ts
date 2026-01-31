import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindAllMoveOutSchedules = () => {
  return $api.useQuery('get', ApiPaths.MoveOutController_findAllMoveOutSchedules);
};
