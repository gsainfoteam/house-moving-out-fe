import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useCompareSheets = () => {
  return $api.useMutation('post', ApiPaths.MoveOutController_compareSheets);
};
