import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { isNil } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api, type checklist } from '@/common/lib';

import { ApiPaths, ApplicationStatus } from '../../models';
import { useNow } from '../../utils';

export const useFindMyInspection = (enabled: boolean) => {
  const { t } = useTranslation('user');
  const { data, error, isLoading, isSuccess, isError } = $api.useQuery(
    'get',
    ApiPaths.ApplicationController_findMyInspection,
    {},
    {
      enabled,
      retry(count, error) {
        if (error.statusCode && [400, 403, 404].includes(error.statusCode)) return false;
        return count < 3;
      },
    },
  );
  const now = useNow();

  useEffect(() => {
    if (isError) {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 403) {
        // status
      } else if (error?.statusCode === 404) {
        // status
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    }
  }, [data, error, isError, isSuccess, t]);

  const inspectionStartTime = useMemo(
    () => (isSuccess ? dayjs(data.inspectionSlot.startTime) : undefined),
    [data, isSuccess],
  );

  const inspectionSlotUuid = useMemo(
    () => (isSuccess ? data.inspectionSlot.uuid : undefined),
    [data, isSuccess],
  );

  const applicationUuid = useMemo(
    () =>
      isSuccess ? (data.status === ApplicationStatus.CANCELED ? undefined : data.uuid) : undefined,
    [data, isSuccess],
  );

  const inspectionCount = useMemo(
    () => (isSuccess ? data.inspectionCount : undefined),
    [data, isSuccess],
  );
  const failedItems = useMemo(
    () => (isSuccess ? ((data.itemResults?.failed ?? null) as checklist.Item[] | null) : null),
    [data, isSuccess],
  );

  const status = useMemo(() => {
    if (isSuccess) {
      if (data.status === ApplicationStatus.PASSED) {
        return 'passed' as const;
      } else if (data.status === ApplicationStatus.FAILED) {
        return 'failed' as const;
      } else if (data.status === ApplicationStatus.NO_SHOW) {
        return 'no_show' as const;
      } else if (data.status === ApplicationStatus.CANCELED) {
        return 'canceled' as const;
      } else if (isNil(data.status)) {
        const startTime = dayjs(data.inspectionSlot.startTime);
        const endTime = dayjs(data.inspectionSlot.endTime);

        if (now.isAfter(startTime) && now.isBefore(endTime)) {
          return 'in_progress' as const;
        } else {
          return 'waiting' as const;
        }
      }
    } else if (isError) {
      if (error?.statusCode === 403) {
        return 'not_target' as const;
      }
      if (error?.statusCode === 404) {
        return 'not_found' as const;
      }
    }
  }, [data, error, isError, isSuccess, now]);

  return {
    applicationUuid,
    isLoading,
    isSuccess,
    inspectionStartTime,
    inspectionSlotUuid,
    inspectionCount,
    failedItems,
    status,
  };
};
