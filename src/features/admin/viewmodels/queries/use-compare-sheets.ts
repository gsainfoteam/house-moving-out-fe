import { $api } from '@/common/lib';
import { multipartSerializer } from '@/common/utils';

import { ApiPaths } from '../../models';

export const useCompareSheets = () => {
  return $api.useMutation('post', ApiPaths.MoveOutController_compareSheets, {
    onMutate(variables) {
      variables.bodySerializer = multipartSerializer;
    },
  });
};
