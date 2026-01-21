import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useAdminLogin = () => {
  return $api.useMutation('post', ApiPaths.AuthController_adminLogin);
};
