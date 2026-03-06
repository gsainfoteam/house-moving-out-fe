import { useCallback, useMemo } from 'react';

import { useParams } from '@tanstack/react-router';

import { useFormContext, useWatch } from 'react-hook-form';

import { InspectionType } from '@/features/admin/models';

import { checklist } from '../models';
import { useGetInspectionTargets } from './queries';

export const useInspectionChecklistContext = () => {
  const form = useFormContext<{
    items: Record<checklist.Item, boolean>;
    note: string;
    inspectorSignature: string;
    targetSignature: string;
  }>();
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid' });
  const { targets, isLoading } = useGetInspectionTargets();
  const target = targets?.find((target) => target.uuid === uuid);
  const roomType = target
    ? target.inspectionType === InspectionType.SOLO || target.inspectionType === InspectionType.DUO
      ? 'solo'
      : target.roomNumber.startsWith('S') || target.roomNumber.startsWith('T')
        ? 'b'
        : target.residents.length === 3
          ? 'a3'
          : 'a2'
    : undefined;

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
    isLoading,
    target,
    roomType,
  } as const;
};
