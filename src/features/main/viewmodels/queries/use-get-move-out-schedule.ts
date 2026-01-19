import { useQuery } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { moveOutApi, moveOutQueryKeys } from '../../models';

import type { GetMoveOutScheduleWithSlotsArgs, MoveOutScheduleWithSlotsResDto } from '../../models';

export const useGetMoveOutScheduleQuery = (id: number, enabled = true) => {
  return useQuery<MoveOutScheduleWithSlotsResDto, ApiHttpError>({
    queryKey: moveOutQueryKeys.scheduleWithSlots(id),
    queryFn: () => {
      const args: GetMoveOutScheduleWithSlotsArgs = { id };
      return moveOutApi.getMoveOutScheduleWithSlots(args);
    },
    enabled,
  });
};
