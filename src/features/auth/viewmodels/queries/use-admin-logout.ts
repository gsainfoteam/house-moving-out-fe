import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useAdminLogout = () => {
  return $api.useMutation('post', ApiPaths.AuthController_adminLogout);
};
