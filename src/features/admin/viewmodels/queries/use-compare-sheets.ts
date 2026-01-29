import { $api } from '@/common/lib';

import { ApiPaths } from '../../../main/models';

export const useCompareSheets = () => {
  return $api.useMutation('post', ApiPaths.MoveOutController_compareSheets);
};
