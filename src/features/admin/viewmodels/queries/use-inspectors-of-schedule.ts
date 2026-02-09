import { useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useInspectorsOfSchedule = (scheduleUuid: string) => {
  const { data, error, isError, isLoading } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findInspectorsByScheduleUuid,
    { params: { path: { uuid: scheduleUuid } } },
    {
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return count < 3;
      },
    },
  );
  const { t } = useTranslation('admin');

  useEffect(() => {
    if (!isError) return;
    if (error.statusCode === 400) {
      toast.error(t('error.badRequest', { ns: 'common' }));
    } else if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error?.statusCode === 404) {
      // view에서 처리
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, isError, t]);

  const isNotFound = useMemo(() => error?.statusCode === 404, [error?.statusCode]);

  return {
    data,
    isLoading,
    isNotFound,
  };
};
