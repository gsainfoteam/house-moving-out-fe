import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useApplications = (scheduleUuid: string) => {
  return $api.useQuery('get', ApiPaths.ScheduleController_findAllInspectionApplications, {
    params: {
      path: { uuid: scheduleUuid },
    },
  });
};
