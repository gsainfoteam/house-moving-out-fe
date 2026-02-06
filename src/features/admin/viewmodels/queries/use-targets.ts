import { $api } from '@/common/lib';

import { useGetMoveOutScheduleQuery } from './use-get-move-out-schedule';
import { ApiPaths } from '../../models';

export const useTargets = (scheduleUuid: string) => {
  const { data } = useGetMoveOutScheduleQuery(scheduleUuid);
  return $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findInspectionTargetsBySemesters,
    {
      params: {
        query: data
          ? {
              currentSeason: data.currentSemester.season,
              currentYear: data.currentSemester.year,
              nextSeason: data.nextSemester.season,
              nextYear: data.nextSemester.year,
            }
          : null!,
      },
    },
    { enabled: !!data },
  );
};
