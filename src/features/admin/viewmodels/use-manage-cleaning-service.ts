import { useEffect, useState } from 'react';

import { groupBy } from 'es-toolkit';

import { useBulkUpdateCleaningService, useGetMoveOutScheduleQuery, useTargets } from './queries';
import { ScheduleStatus } from '../models';

export const useManageCleaningService = (uuid: string) => {
  const { data: targets } = useTargets(uuid);
  const { data: schedule } = useGetMoveOutScheduleQuery(uuid);
  const bulkUpdateCleaningService = useBulkUpdateCleaningService();
  const [draftCleaningMap, setDraftCleaningMap] = useState<Record<string, boolean>>({});
  const isCleaningEditable = schedule != null && schedule.status === ScheduleStatus.DRAFT;
  const isSaving = bulkUpdateCleaningService.isPending;
  const hasDraftChanges = Object.keys(draftCleaningMap).length > 0;

  useEffect(() => {
    setDraftCleaningMap({});
  }, [uuid]);

  const handleCleaningServiceChange = (
    targetUuid: string,
    applyCleaningService: boolean,
    originalValue: boolean,
  ) => {
    if (!isCleaningEditable) return;
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

  const handleSaveCleaningChanges = async () => {
    if (!targets || !isCleaningEditable || !hasDraftChanges || isSaving) return;

    const targetUuids = groupBy(Object.entries(draftCleaningMap), (e) =>
      e[1] ? 'apply' : 'unapply',
    );

    const requests = Object.entries(targetUuids).map(([key, value]) =>
      bulkUpdateCleaningService.mutateAsync({
        params: { path: { uuid } },
        body: {
          targetUuids: value.map((m) => m[0]),
          applyCleaningService: key === 'apply',
        },
      }),
    );

    try {
      await Promise.all(requests);
      setDraftCleaningMap({});
    } catch {
      // 에러 토스트는 query layer(onError)에서 처리한다.
    }
  };

  const handleResetCleaningChanges = () => {
    if (isSaving) return;
    setDraftCleaningMap({});
  };

  return {
    isCleaningEditable,
    numberOfDraftChanges: Object.keys(draftCleaningMap).length,
    isSaving,
    handleCleaningServiceChange,
    handleResetCleaningChanges,
    handleSaveCleaningChanges,
    isDraftCleaning: (targetUuid: string) => draftCleaningMap[targetUuid] ?? null,
  };
};
