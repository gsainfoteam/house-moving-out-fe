import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { isNil } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api, type checklist } from '@/common/lib';

import { ApiPaths, ApplicationStatus } from '../../models';
import { useScheduleStatus } from '../use-schedule-status';

export const useFindMyInspection = (enabled: boolean) => {
  const { t } = useTranslation('user');
  const { setStatus } = useScheduleStatus();
  const { data, error, isLoading, isSuccess, isError } = $api.useQuery(
    'get',
    ApiPaths.ApplicationController_findMyInspection,
    {},
    {
      enabled,
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return count < 3;
      },
    },
  );

  useEffect(() => {
    if (isError) {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode !== 404) {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    }
  }, [error?.statusCode, isError, t]);

  useEffect(() => {
    if (isError) {
      if (error?.statusCode === 404) setStatus('application');
      return;
    }
    if (!isSuccess) return;

    if (data.status === ApplicationStatus.PASSED) {
      setStatus('passed');
      return;
    }
    if (data.status === ApplicationStatus.PENDING_NO_SHOW) {
      setStatus('in_progress');
      return;
    }
    if (data.status === ApplicationStatus.FAILED || data.status === ApplicationStatus.NO_SHOW) {
      setStatus('failed');
      return;
    }

    if (isNil(data.status)) {
      const now = dayjs();
      const startTime = dayjs(data.inspectionSlot.startTime);
      const endTime = dayjs(data.inspectionSlot.endTime);
      setStatus(now.isAfter(startTime) && now.isBefore(endTime) ? 'in_progress' : 'waiting');
    }
  }, [data, error?.statusCode, isError, isSuccess, setStatus]);

  const inspectionStartTime = useMemo(
    () => (isSuccess ? dayjs(data.inspectionSlot.startTime) : undefined),
    [data, isSuccess],
  );

  const inspectionSlotUuid = useMemo(
    () => (isSuccess ? data.inspectionSlot.uuid : undefined),
    [data, isSuccess],
  );

  const applicationUuid = useMemo(() => (isSuccess ? data.uuid : undefined), [data, isSuccess]);

  const inspectionCount = useMemo(
    () => (isSuccess ? data.inspectionCount : undefined),
    [data, isSuccess],
  );

  const failedItems = useMemo(
    () => (isSuccess ? ((data.itemResults?.failed ?? null) as checklist.Item[] | null) : null),
    [data, isSuccess],
  );

  return {
    applicationUuid,
    isLoading,
    isSuccess,
    inspectionStartTime,
    inspectionSlotUuid,
    inspectionCount,
    failedItems,
  };
};
