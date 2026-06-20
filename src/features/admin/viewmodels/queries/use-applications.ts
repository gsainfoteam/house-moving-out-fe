import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useApplications = (
  scheduleUuid: string,
  page: number,
  pageSize: number,
  includePast: boolean,
  includeCanceled: boolean,
) => {
  return $api.useQuery('get', ApiPaths.ScheduleController_findAllInspectionApplications, {
    params: {
      path: { uuid: scheduleUuid },
      query: { limit: pageSize, offset: (page - 1) * pageSize, includePast, includeCanceled },
    },
  });
};

export const useApplicationsWithInspectorAndSlot = (
  scheduleUuid: string,
  inspectorUuid: string,
  slotUuid: string,
) => {
  return $api.useQuery('get', ApiPaths.ScheduleController_findAllInspectionApplications, {
    params: {
      path: { uuid: scheduleUuid },
      query: { inspectorUuid, slotUuid },
    },
  });
};
