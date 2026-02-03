import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { groupBy } from 'es-toolkit/array';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindActiveMoveOutScheduleWithSlots = () => {
  const { t } = useTranslation('move-out');
  const { data, error, isLoading } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots,
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
      // not found frame으로 view에서 처리됨
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, t]);

  const applicationStartTime = useMemo(
    () => (data ? dayjs(data.applicationStartTime) : undefined),
    [data],
  );

  const applicationEndTime = useMemo(
    () => (data ? dayjs(data.applicationEndTime) : undefined),
    [data],
  );

  const [inspectionSlotsByDayTimestamp, inspectionDays] = useMemo(() => {
    if (!data?.inspectionSlots?.length) return [{}, []];

    const inspectionSlots = data.inspectionSlots
      .map((slot) => ({
        ...slot,
        day: dayjs(slot.startTime).startOf('day'),
        startTime: dayjs(slot.startTime),
        endTime: dayjs(slot.endTime),
        // TODO: blocked by backend, 자신의 성별에 따라 closed 여부가 달라져야 한다.
        isClosed:
          slot.maleReservedCount >= slot.maleCapacity &&
          slot.femaleReservedCount >= slot.femaleCapacity,
      }))
      .sort((a, b) => a.startTime.diff(b.startTime));

    const byDay = groupBy(inspectionSlots, (s) => s.day.valueOf());
    const days = Object.keys(byDay).map((timestamp) => dayjs(Number(timestamp)).startOf('day'));

    return [byDay, days];
  }, [data]);

  const isNotFound = useMemo(() => error?.statusCode === 404, [error?.statusCode]);

  return {
    data,
    isLoading,
    isNotFound,
    applicationStartTime,
    applicationEndTime,
    inspectionSlotsByDayTimestamp,
    inspectionDays,
  };
};
