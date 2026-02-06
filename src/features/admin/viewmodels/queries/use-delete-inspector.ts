import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteInspector = () => {
  return $api.useMutation('delete', ApiPaths.InspectorController_deleteInspector);
};
