import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { groupBy } from 'es-toolkit/array';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';
import { useAuth } from '@/features/auth';

import { ApiPaths } from '../../models';
import { useNow } from '../../utils';

export const useFindActiveMoveOutScheduleWithSlots = () => {
  const { user } = useAuth();
  const { t } = useTranslation('user');
  const { data, error, isLoading, isSuccess, isError } = $api.useQuery(
    'get',
    ApiPaths.ScheduleController_findActiveMoveOutScheduleWithSlots,
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
  const now = useNow();

  useEffect(() => {
    if (isError) {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 404) {
        // handle in view
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    }
  }, [error?.statusCode, isError, t]);

  const [inspectionSlotsByDayTimestamp, inspectionDays] = useMemo(() => {
    if (!user || !data?.inspectionSlots?.length) return [{}, []];

    const inspectionSlots = data.inspectionSlots
      .filter((s) => s.gender === user.gender)
      .map((slot) => ({
        ...slot,
        day: dayjs(slot.startTime).startOf('day'),
        startTime: dayjs(slot.startTime),
        endTime: dayjs(slot.endTime),
        isClosed: slot.reservedCount >= slot.capacity,
      }))
      .sort((a, b) => a.startTime.diff(b.startTime));

    const byDay = groupBy(inspectionSlots, (s) => s.day.valueOf());
    const days = Object.keys(byDay).map((timestamp) => dayjs(Number(timestamp)).startOf('day'));

    return [byDay, days] as const;
  }, [data, user]);

  const status = useMemo(() => {
    if (isSuccess) {
      const applicationStartTime = dayjs(data?.applicationStartTime);
      const applicationEndTime = dayjs(data?.applicationEndTime);
      if (!(now.isAfter(applicationStartTime) && now.isBefore(applicationEndTime))) {
        return 'not_period' as const;
      }
      return 'success' as const;
    }
    return 'no_schedule' as const;
  }, [data?.applicationEndTime, data?.applicationStartTime, isSuccess, now]);

  const applicationStartTime = useMemo(
    () => (data?.applicationStartTime ? dayjs(data?.applicationStartTime) : undefined),
    [data?.applicationStartTime],
  );

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    status,
    applicationStartTime,
    inspectionSlotsByDayTimestamp,
    inspectionDays,
  };
};
