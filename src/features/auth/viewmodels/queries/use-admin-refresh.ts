import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useAdminRefresh = () => {
  return $api.useMutation('post', ApiPaths.AuthController_adminRefresh);
};
