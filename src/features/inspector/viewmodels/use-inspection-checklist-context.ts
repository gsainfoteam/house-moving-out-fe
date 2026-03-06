import { useCallback, useMemo } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { checklist } from '../models';

export const useInspectionChecklistContext = () => {
  const form = useFormContext<{
    items: Record<checklist.Item, boolean>;
    note: string;
    inspectorSignature: string;
    targetSignature: string;
  }>();

  const list = checklist.a2;

  const values = useWatch({ control: form.control, name: 'items' });

  const getSectionProgress = useCallback(
    (sectionKey: checklist.Section) => {
      const sectionValues = list[sectionKey].map((i) => values[i]);
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
    return Object.values(values).every((i) => i);
  }, [values]);

  return {
    form,
    getSectionProgress,
    isAllChecked,
    items: values,
  };
};
