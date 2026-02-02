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

  const inspectionSlotsByDayTimestamp = useMemo(() => {
    if (!data?.inspectionSlots?.length) return [];

    const inspectionSlots = data.inspectionSlots
      .map((slot) => ({
        ...slot,
        day: dayjs(slot.startTime).startOf('day'),
        startTime: dayjs(slot.startTime),
        endTime: dayjs(slot.endTime),
        isClosed:
          slot.maleReservedCount >= slot.maleCapacity &&
          slot.femaleReservedCount >= slot.femaleCapacity,
      }))
      .sort((a, b) => a.day.diff(b.day));

    return groupBy(inspectionSlots, (s) => s.day.valueOf());
  }, [data]);

  const inspectionDays = useMemo(
    () =>
      [...Object.keys(inspectionSlotsByDayTimestamp)]
        .sort((a, b) => Number(a) - Number(b))
        .map((timestamp) => dayjs(Number(timestamp)).startOf('day')),
    [inspectionSlotsByDayTimestamp],
  );

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
