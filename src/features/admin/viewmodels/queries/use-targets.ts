import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useTargets = (scheduleUuid: string) => {
  return $api.useQuery('get', ApiPaths.ScheduleController_findAllInspectionTargetInfos, {
    params: {
      path: { uuid: scheduleUuid },
    },
  });
};
