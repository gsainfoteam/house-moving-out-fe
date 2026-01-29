import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useInspectors = () => {
  return $api.useQuery('get', ApiPaths.InspectorController_getInspectors);
};
