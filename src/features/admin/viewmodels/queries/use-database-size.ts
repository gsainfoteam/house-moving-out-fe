import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDatabaseSize = () => {
  return $api.useQuery('get', ApiPaths.HealthController_getDatabaseSize);
};
