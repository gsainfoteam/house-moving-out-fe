import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useUserRefresh = () => {
  return $api.useMutation('post', ApiPaths.AuthController_userRefresh);
};
