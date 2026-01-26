import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useUserRefresh = () => {
  return $api.useMutation('post', ApiPaths.AuthController_userRefresh);
};
