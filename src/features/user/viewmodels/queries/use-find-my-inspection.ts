import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

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
      if (data.isPassed === true) {
        onPassed?.();
      } else if (data.isPassed === false) {
        onFailed?.();
      } else if (data.isPassed === undefined) {
        const startTime = dayjs(data.inspectionSlot.startTime);
        const endTime = dayjs(data.inspectionSlot.endTime);
        const now = dayjs();

        if (now.isAfter(startTime) && now.isBefore(endTime)) {
          onFoundInProgress?.();
        } else {
          onFoundWaiting?.();
        }
      }
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
    data?.isPassed,
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

  return {
    applicationUuid,
    isLoading,
    isSuccess,
    inspectionStartTime,
    inspectionSlotUuid,
  };
};
