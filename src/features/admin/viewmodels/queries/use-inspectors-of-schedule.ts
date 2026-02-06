import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useInspectorsOfSchedule = (scheduleUuid: string) => {
  return $api.useQuery('get', ApiPaths.MoveOutController_findInspectorsByScheduleUuid, {
    params: { path: { uuid: scheduleUuid } },
  });
};
