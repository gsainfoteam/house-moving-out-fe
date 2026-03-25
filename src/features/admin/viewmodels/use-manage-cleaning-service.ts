import { useEffect, useState } from 'react';

import { groupBy, isNotNil } from 'es-toolkit';

import {
  useBulkUpdateCleaningService,
  useBulkUpdateRepair,
  useGetMoveOutScheduleQuery,
  useTargets,
} from './queries';
import { ScheduleStatus } from '../models';

export const useManageCleaningService = (uuid: string) => {
  const { data: targets } = useTargets(uuid);
  const { data: schedule } = useGetMoveOutScheduleQuery(uuid);
  const bulkUpdateCleaningService = useBulkUpdateCleaningService();
  const bulkUpdateRepairService = useBulkUpdateRepair();
  const [draftCleaningMap, setDraftCleaningMap] = useState<Record<string, boolean>>({});
  const [draftRepair, setDraftRepair] = useState<Record<string, boolean>>({});
  const isEditable =
    isNotNil(schedule) &&
    (schedule.status === ScheduleStatus.DRAFT || schedule.status === ScheduleStatus.ACTIVE);
  const isSaving = bulkUpdateCleaningService.isPending || bulkUpdateRepairService.isPending;

  useEffect(() => {
    setDraftCleaningMap({});
    setDraftRepair({});
  }, [uuid]);

  const handleCleaningServiceChange = (
    targetUuid: string,
    applyCleaningService: boolean,
    originalValue: boolean,
  ) => {
    if (!isEditable) return;
    setDraftCleaningMap((current) => {
      // 서버 원본 값과 동일해지면 draft에서 제거해 실제 변경분만 저장한다.
      if (applyCleaningService === originalValue) {
        const { [targetUuid]: _, ...rest } = current;
        return rest;
      }
      return {
        ...current,
        [targetUuid]: applyCleaningService,
      };
    });
  };

  const handleRepairChange = (
    targetUuid: string,
    repairAfterMoveOut: boolean,
    originalValue: boolean,
  ) => {
    if (!isEditable) return;
    setDraftRepair((current) => {
      if (repairAfterMoveOut === originalValue) {
        const { [targetUuid]: _, ...rest } = current;
        return rest;
      }
      return {
        ...current,
        [targetUuid]: repairAfterMoveOut,
      };
    });
  };

  const handleSaveChanges = async () => {
    const hasDraftChanges =
      Object.keys(draftCleaningMap).length > 0 || Object.keys(draftRepair).length > 0;
    if (!targets || !isEditable || isSaving || !hasDraftChanges) return;

    const requests = [
      ...Object.entries(
        groupBy(Object.entries(draftCleaningMap), (e) => (e[1] ? 'apply' : 'unapply')),
      ).map(([key, value]) =>
        bulkUpdateCleaningService.mutateAsync({
          params: { path: { uuid } },
          body: {
            targetUuids: value.map((m) => m[0]),
            applyCleaningService: key === 'apply',
          },
        }),
      ),
      ...Object.entries(
        groupBy(Object.entries(draftRepair), (e) => (e[1] ? 'apply' : 'unapply')),
      ).map(([key, value]) =>
        bulkUpdateRepairService.mutateAsync({
          params: { path: { uuid } },
          body: {
            targetUuids: value.map((m) => m[0]),
            applyRepairCheck: key === 'apply',
          },
        }),
      ),
    ];

    try {
      await Promise.all(requests);
      setDraftCleaningMap({});
      setDraftRepair({});
    } catch {
      // 에러 토스트는 query layer(onError)에서 처리한다.
    }
  };

  const handleResetChanges = () => {
    if (isSaving) return;
    setDraftCleaningMap({});
  };

  return {
    isEditable,
    numberOfDraftChanges: Object.keys(draftCleaningMap).length + Object.keys(draftRepair).length,
    isSaving,
    handleCleaningServiceChange,
    handleRepairChange,
    handleResetChanges,
    handleSaveChanges,
    isDraftCleaning: (targetUuid: string) => draftCleaningMap[targetUuid] ?? null,
    isDraftRepair: (targetUuid: string) => draftRepair[targetUuid] ?? null,
  };
};
