import { ApiPaths } from '@/@types/api-schema';
import { $api } from '@/common/lib';

export const useCompareSheets = () => {
  return $api.useMutation('post', ApiPaths.MoveOutController_compareSheets);
};
