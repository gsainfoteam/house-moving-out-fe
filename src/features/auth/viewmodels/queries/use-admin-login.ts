import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useAdminLogin = () => {
  return $api.useMutation('post', ApiPaths.AuthController_adminLogin);
};
