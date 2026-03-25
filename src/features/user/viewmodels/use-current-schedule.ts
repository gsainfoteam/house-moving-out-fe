import { useMemo } from 'react';

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
  | 'passed'
  | 'no_show';

export const useCurrentSchedule = () => {
  const { user } = useAuth();
  const {
    isLoading: isLoadingSchedule,
    isSuccess,
    status: scheduleStatus,
    applicationStartTime,
  } = useFindActiveMoveOutScheduleWithSlots();

  const {
    isLoading: isLoadingInspection,
    inspectionStartTime,
    applicationUuid,
    inspectionCount,
    failedItems,
    status: inspectionStatus,
  } = useFindMyInspection(isSuccess);

  const { mutateAsync: cancelInspection } = useCancelInspection();

  const status: Status = useMemo(() => {
    if (user?.applyCleaningService) return 'cleaning_service';
    if (!user?.roomNumber) return 'not_target';
    if (scheduleStatus === 'success') {
      if (inspectionStatus === 'not_found') {
        return 'application';
      }
      return inspectionStatus ?? 'not_period';
    }
    return 'not_period';
  }, [user, scheduleStatus, inspectionStatus]);

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
