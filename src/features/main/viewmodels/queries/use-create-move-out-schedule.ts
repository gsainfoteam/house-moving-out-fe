import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiHttpError } from '@/common/lib';

import { moveOutApi, moveOutQueryKeys } from '../../models';

import type { CreateMoveOutScheduleDto, MoveOutScheduleResDto } from '../../models';

export const useCreateMoveOutSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<MoveOutScheduleResDto, ApiHttpError, CreateMoveOutScheduleDto>({
    mutationFn: (data) => moveOutApi.createMoveOutSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: moveOutQueryKeys.schedules(),
      });
    },
  });
};
