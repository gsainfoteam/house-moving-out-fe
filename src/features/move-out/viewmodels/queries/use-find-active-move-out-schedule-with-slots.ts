import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindActiveMoveOutScheduleWithSlots = () => {
  const { t } = useTranslation('move-out');
  const { data, error } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots,
  );

  useEffect(() => {
    if (!error) return;
    if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error?.statusCode === 404) {
      toast.error(t('error.notFound'));
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

  const inspectionSlotsByDay = useMemo(() => {
    if (!applicationStartTime || !applicationEndTime || !data?.inspectionSlots) return [];

    const startDate = applicationStartTime.startOf('day');
    const endDate = applicationEndTime.startOf('day');

    const slotsWithDayjs = data.inspectionSlots.map((slot) => ({
      ...slot,
      startTime: dayjs(slot.startTime),
      endTime: dayjs(slot.endTime),
    }));

    const days: {
      date: dayjs.Dayjs;
      slots: typeof slotsWithDayjs;
    }[] = [];

    let current = startDate;

    while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
      const dayStart = current.startOf('day');
      const dayEnd = current.endOf('day');
      const slotsForDay = slotsWithDayjs.filter(
        (slot) => slot.startTime.isAfter(dayStart) && slot.startTime.isBefore(dayEnd),
      );

      days.push({ date: current, slots: slotsForDay });
      current = current.add(1, 'day');
    }

    return days;
  }, [data, applicationStartTime, applicationEndTime]);

  const inspectionDays = useMemo(
    () => inspectionSlotsByDay.map((day) => day.date),
    [inspectionSlotsByDay],
  );

  return {
    data,
    applicationStartTime,
    applicationEndTime,
    inspectionSlotsByDay,
    inspectionDays,
  };
};
