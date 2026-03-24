import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { isNil } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api, type checklist } from '@/common/lib';
import { ApplicationStatus } from '@/features/admin';

import { ApiPaths } from '../../models';

export const useFindMyInspection = (
  enabled: boolean,
  {
    onPassed,
    onFailed,
    onFoundWaiting,
    onFoundInProgress,
    onNotFound,
  }: {
    onPassed?: () => void;
    onFailed?: () => void;
    onFoundWaiting?: () => void;
    onFoundInProgress?: () => void;
    onNotFound?: () => void;
  } = {},
) => {
  const { t } = useTranslation('user');
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
    if (isSuccess) {
      if (data.status === ApplicationStatus.PASSED) {
        onPassed?.();
      } else if (data.status === ApplicationStatus.FAILED) {
        onFailed?.();
      } else if (isNil(data.status)) {
        const startTime = dayjs(data.inspectionSlot.startTime);
        const endTime = dayjs(data.inspectionSlot.endTime);
        const now = dayjs();

        if (now.isAfter(startTime) && now.isBefore(endTime)) {
          onFoundInProgress?.();
        } else {
          onFoundWaiting?.();
        }
      }
      // TODO: no show status
    } else if (isError) {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 404) {
        onNotFound?.();
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    }
  }, [
    data?.inspectionSlot.endTime,
    data?.inspectionSlot.startTime,
    data?.status,
    error?.statusCode,
    isError,
    isSuccess,
    onFailed,
    onFoundInProgress,
    onFoundWaiting,
    onNotFound,
    onPassed,
    t,
  ]);

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
