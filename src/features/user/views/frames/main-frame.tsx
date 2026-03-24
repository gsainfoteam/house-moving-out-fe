import { useCurrentSchedule } from '../../viewmodels';
import { MainScreen } from '../screens';

export function MainFrame() {
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
