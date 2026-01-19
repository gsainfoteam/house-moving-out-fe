import { api } from '@/common/lib';

import type {
  CompareSheetsArgs,
  CreateInspectionTargetsResDto,
  CreateMoveOutScheduleDto,
  GetMoveOutScheduleWithSlotsArgs,
  MoveOutScheduleResDto,
  MoveOutScheduleWithSlotsResDto,
} from './schema';

export const moveOutApi = {
  createMoveOutSchedule: async (
    data: CreateMoveOutScheduleDto,
  ): Promise<MoveOutScheduleResDto> => {
    const response = await api.post<MoveOutScheduleResDto>(
      '/move-out/schedule',
      data,
    );
    return response.data;
  },

  getMoveOutScheduleWithSlots: async ({
    id,
  }: GetMoveOutScheduleWithSlotsArgs): Promise<MoveOutScheduleWithSlotsResDto> => {
    const response = await api.get<MoveOutScheduleWithSlotsResDto>(
      `/move-out/schedule/${id}`,
    );
    return response.data;
  },

  compareSheets: async ({
    file,
    currentYear,
    currentSeason,
    nextYear,
    nextSeason,
  }: CompareSheetsArgs): Promise<CreateInspectionTargetsResDto> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<CreateInspectionTargetsResDto>(
      '/move-out/inspection-targets',
      formData,
      {
        params: {
          currentYear,
          currentSeason,
          nextYear,
          nextSeason,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
};
