import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useCreateInspector = () => {
  return $api.useMutation('post', ApiPaths.InspectorController_createInspectors);
};
