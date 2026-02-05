import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindMyInspection = ({
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
}) => {
  const { t } = useTranslation('user');
  const { data, error, isLoading, isSuccess } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findMyInspection,
    {},
    {
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return count < 3;
      },
    },
  );

  useEffect(() => {
    if (!error) return;
    if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error?.statusCode === 404) {
      onNotFound?.();
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, onNotFound, t]);

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
    }
  }, [
    data?.inspectionSlot.endTime,
    data?.inspectionSlot.startTime,
    data?.isPassed,
    isSuccess,
    onFoundInProgress,
    onFoundWaiting,
    onFailed,
    onPassed,
  ]);

  const inspectionStartTime = useMemo(
    () => (data ? dayjs(data.inspectionSlot.startTime) : undefined),
    [data],
  );

  const inspectionSlotUuid = useMemo(() => (data ? data.inspectionSlot.uuid : undefined), [data]);

  return {
    data,
    isLoading,
    inspectionStartTime,
    inspectionSlotUuid,
  };
};
