import { useParams } from '@tanstack/react-router';

import { InspectionType } from '@/features/admin/models';

import { useGetInspectionTargets } from './queries';

export const useInspectionTargetInfo = () => {
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

  return { target, roomType, isLoading } as const;
};
