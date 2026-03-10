import { useCallback, useMemo } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { checklist } from '../models';
import { useInspectionTargetInfo } from './use-inspection-target-info';

export const useInspectionChecklistContext = () => {
  const form = useFormContext<{
    items: Record<checklist.Item, boolean>;
    note: string;
    inspectorSignature: string;
    targetSignature: string;
  }>();
  const { roomType, isLoading, target } = useInspectionTargetInfo();
  const list = useMemo(() => (roomType ? checklist[roomType] : undefined), [roomType]);

  const values = useWatch({ control: form.control, name: 'items' });

  const getSectionProgress = useCallback(
    (sectionKey: checklist.Section) => {
      if (!list) return { totalCount: 0, completedCount: 0, isCompleted: false };
      const sectionValues = list[sectionKey].filter((i) => i !== null).map(([i]) => values[i]);
      const totalCount = sectionValues.length;
      const completedCount = sectionValues.filter(Boolean).length;
      const isCompleted = totalCount > 0 && completedCount === totalCount;

      return {
        totalCount,
        completedCount,
        isCompleted,
      };
    },
    [list, values],
  );

  const isAllChecked = useMemo(() => {
    if (list === undefined) return false;
    const listValues = checklist.sections.flatMap((section) =>
      list[section].filter((i) => i !== null).map(([i]) => i),
    );
    if (listValues.length === 0) return false;
    return listValues.every((i) => values[i]);
  }, [values, list]);

  return {
    form,
    getSectionProgress,
    isAllChecked,
    items: values,
    isLoading,
    target,
    roomType,
  } as const;
};
