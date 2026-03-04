import { useEffect, useMemo } from 'react';

import dayjs, { type Dayjs } from 'dayjs';
import { groupBy } from 'es-toolkit/array';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';
import { useAuth } from '@/features/auth';

import { ApiPaths } from '../../models';

export const useFindActiveMoveOutScheduleWithSlots = ({
  onNotTarget,
  onNotPeriod,
  onSuccess,
}: {
  onNotTarget?: () => void;
  onNotPeriod?: (applicationStartTime?: Dayjs, applicationEndTime?: Dayjs) => void;
  onSuccess?: () => void;
} = {}) => {
  const { user } = useAuth();
  const { t } = useTranslation('user');
  const { data, error, isLoading, isSuccess, isError } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots,
    {},
    {
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400 || error?.statusCode === 403)
          return false;
        return count < 3;
      },
      enabled: !!user,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
    } else if (isError) {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 403) {
        onNotTarget?.();
      } else if (error?.statusCode === 404) {
        toast.error(t('application.error.notFound'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    }
  }, [error?.statusCode, isError, isSuccess, onNotPeriod, onNotTarget, onSuccess, t]);

  const applicationStartTime = useMemo(
    () => (data ? dayjs(data.applicationStartTime) : undefined),
    [data],
  );

  const applicationEndTime = useMemo(
    () => (data ? dayjs(data.applicationEndTime) : undefined),
    [data],
  );

  useEffect(() => {
    if (
      applicationStartTime != null &&
      applicationEndTime != null &&
      !(dayjs().isAfter(applicationStartTime) && dayjs().isBefore(applicationEndTime))
    ) {
      onNotPeriod?.(applicationStartTime, applicationEndTime);
    }
  }, [applicationStartTime, applicationEndTime, onNotPeriod]);

  const [inspectionSlotsByDayTimestamp, inspectionDays] = useMemo(() => {
    if (!data?.inspectionSlots?.length) return [{}, []];

    const inspectionSlots = data.inspectionSlots
      .map((slot) => ({
        ...slot,
        day: dayjs(slot.startTime).startOf('day'),
        startTime: dayjs(slot.startTime),
        endTime: dayjs(slot.endTime),
        isClosed:
          user!.gender === 'MALE'
            ? slot.maleReservedCount >= slot.maleCapacity
            : slot.femaleReservedCount >= slot.femaleCapacity,
      }))
      .sort((a, b) => a.startTime.diff(b.startTime));

    const byDay = groupBy(inspectionSlots, (s) => s.day.valueOf());
    const days = Object.keys(byDay).map((timestamp) => dayjs(Number(timestamp)).startOf('day'));

    return [byDay, days] as const;
  }, [data, user]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    applicationStartTime,
    applicationEndTime,
    inspectionSlotsByDayTimestamp,
    inspectionDays,
  };
};
