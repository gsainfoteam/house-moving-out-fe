import { useEffect } from 'react';

import { useAuth } from '@/features/auth';

import {
  useCancelInspection,
  useFindActiveMoveOutScheduleWithSlots,
  useFindMyInspection,
} from './queries';
import { useScheduleStatus } from './use-schedule-status';

export const useCurrentSchedule = () => {
  const { user } = useAuth();
  const { status, setStatus } = useScheduleStatus();

  useEffect(() => {
    if (user?.applyCleaningService) setStatus('cleaning_service');
  }, [user, setStatus]);

  const {
    isLoading: isLoadingSchedule,
    applicationStartTime,
    isSuccess,
  } = useFindActiveMoveOutScheduleWithSlots();

  const {
    isLoading: isLoadingInspection,
    inspectionStartTime,
    applicationUuid,
    inspectionCount,
    failedItems,
  } = useFindMyInspection(isSuccess);

  const { mutateAsync: cancelInspection } = useCancelInspection();

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
