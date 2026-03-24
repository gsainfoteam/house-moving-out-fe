import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/features/auth';

import {
  useCancelInspection,
  useFindActiveMoveOutScheduleWithSlots,
  useFindMyInspection,
} from './queries';

type Status =
  | 'not_period'
  | 'not_target'
  | 'cleaning_service'
  | 'application'
  | 'waiting'
  | 'in_progress'
  | 'failed'
  | 'passed';

export const useCurrentSchedule = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<Status>('not_period');

  const {
    isLoading: isLoadingSchedule,
    applicationStartTime,
    isSuccess,
  } = useFindActiveMoveOutScheduleWithSlots({
    onNotTarget: useCallback(() => setStatus('not_target'), []),
    onNotPeriod: useCallback(() => setStatus('not_period'), []),
    onSuccess: useCallback(() => setStatus('application'), []),
  });

  const {
    isLoading: isLoadingInspection,
    inspectionStartTime,
    applicationUuid,
    inspectionCount,
    failedItems,
  } = useFindMyInspection(isSuccess, {
    onNotFound: useCallback(() => setStatus('application'), []),
    onFoundWaiting: useCallback(() => setStatus('waiting'), []),
    onFoundInProgress: useCallback(() => setStatus('in_progress'), []),
    onFailed: useCallback(() => setStatus('failed'), []),
    onPassed: useCallback(() => setStatus('passed'), []),
  });

  const { mutateAsync: cancelInspection } = useCancelInspection();

  useEffect(() => {
    if (user?.applyCleaningService) queueMicrotask(() => setStatus('cleaning_service'));
  }, [user?.applyCleaningService]);

  return {
    status,
    isLoadingSchedule,
    applicationStartTime,
    isLoadingInspection,
    inspectionStartTime,
    applicationUuid,
    cancelInspection,
    inspectionCount,
    failedItems,
  };
};
