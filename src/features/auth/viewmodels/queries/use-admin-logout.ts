import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useAdminLogout = () => {
  return $api.useMutation('post', ApiPaths.AuthController_adminLogout);
};
