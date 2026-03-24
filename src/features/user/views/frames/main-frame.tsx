import { useAuth } from '@/features/auth';

import { useCurrentSchedule } from '../../viewmodels';
import { MainScreen } from '../screens';

export function MainFrame() {
  const { user } = useAuth();
  const {
    status,
    isLoadingSchedule,
    applicationStartTime,
    isLoadingInspection,
    inspectionStartTime,
    applicationUuid,
    cancelInspection,
    inspectionCount,
    failedItems,
  } = useCurrentSchedule();

  if (!user) return null;

  return (
    <MainScreen
      status={status}
      isLoading={isLoadingSchedule || isLoadingInspection}
      applicationStartTime={applicationStartTime}
      inspectionStartTime={inspectionStartTime}
      cancelInspection={
        applicationUuid
          ? () => cancelInspection({ params: { path: { uuid: applicationUuid } } })
          : undefined
      }
      inspectionCount={inspectionCount ?? undefined}
      failedItems={failedItems ?? undefined}
    />
  );
}
