import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useAdminRefresh = () => {
  return $api.useMutation('post', ApiPaths.AuthController_adminRefresh);
};
