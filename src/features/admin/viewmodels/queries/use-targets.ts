import { useMemo } from 'react';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useTargets = (scheduleUuid: string) => {
  const { data, error, isError, isLoading } = $api.useQuery(
    'get',
    ApiPaths.ScheduleController_findAllInspectionTargetInfos,
    {
      params: {
        path: { uuid: scheduleUuid },
      },
    },
  );
  const isNotFound = useMemo(() => error?.statusCode === 404, [error?.statusCode]);
  return {
    data,
    error,
    isError,
    isLoading,
    isNotFound,
  };
};
