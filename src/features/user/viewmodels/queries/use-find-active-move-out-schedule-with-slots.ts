import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { isNotNil } from 'es-toolkit';
import { mapValues } from 'es-toolkit/map';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';
import { useAuth } from '@/features/auth';

import { ApiPaths } from '../../models';
import { useScheduleStatus } from '../use-schedule-status';

export const useFindActiveMoveOutScheduleWithSlots = () => {
  const { user } = useAuth();
  const { t } = useTranslation('user');
  const { setStatus } = useScheduleStatus();
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

  useEffect(() => {
    if (isError) {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 404) {
        toast.error(t('application.error.notFound'));
      } else if (error?.statusCode !== 403) {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    }
  }, [error?.statusCode, isError, t]);

  const applicationStartTime = useMemo(
    () => (data ? dayjs(data.applicationStartTime) : undefined),
    [data],
  );

  const applicationEndTime = useMemo(
    () => (data ? dayjs(data.applicationEndTime) : undefined),
    [data],
  );

  const isNotTarget = useMemo(() => error?.statusCode === 403, [error?.statusCode]);

  const isNotPeriod = useMemo(() => {
    if (!isNotNil(applicationStartTime) || !isNotNil(applicationEndTime)) return false;
    return !(dayjs().isAfter(applicationStartTime) && dayjs().isBefore(applicationEndTime));
  }, [applicationStartTime, applicationEndTime]);

  useEffect(() => {
    if (isNotTarget) {
      setStatus('not_target');
      return;
    }
    if (isNotPeriod || !isSuccess) {
      setStatus('not_period');
      return;
    }
    setStatus('application');
  }, [isNotTarget, isNotPeriod, isSuccess, setStatus]);

  const slotsByDay = useMemo(() => {
    const rawByDay = Map.groupBy(
      (data?.inspectionSlots ?? []).filter((s) => s.gender === user?.gender),
      (s) => dayjs(s.startTime).startOf('day').valueOf(),
    );

    return mapValues(rawByDay, (slots) =>
      slots
        .map((slot) => ({
          ...slot,
          day: dayjs(slot.startTime).startOf('day'),
          startTime: dayjs(slot.startTime),
          endTime: dayjs(slot.endTime),
          isClosed: slot.reservedCount >= slot.capacity,
        }))
        .sort((a, b) => a.startTime.diff(b.startTime)),
    );
  }, [data, user]);

  const days = useMemo(
    () => [...slotsByDay.keys()].map((timestamp) => dayjs(timestamp).startOf('day')),
    [slotsByDay],
  );

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    applicationStartTime,
    applicationEndTime,
    slotsByDay,
    days,
  };
};
