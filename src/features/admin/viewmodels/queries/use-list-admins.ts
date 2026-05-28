import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useListAdmins = () => {
  return $api.useQuery('get', ApiPaths.AdminController_listAdmins);
};
