import { z } from 'zod';

// ===== 공통 타입 =====
const _SeasonSchema = z.enum(['SPRING', 'SUMMER', 'FALL', 'WINTER']);
export type Season = z.infer<typeof _SeasonSchema>;

// ===== 인자 스키마 =====
const _CreateMoveOutScheduleDtoSchema = z.object({
  title: z.string(),
  applicationStartTime: z.iso.datetime(),
  applicationEndTime: z.iso.datetime(),
  inspectionTimeRange: z.array(
    z.object({
      start: z.iso.datetime(),
      end: z.iso.datetime(),
    }),
  ),
});
export type CreateMoveOutScheduleDto = z.infer<
  typeof _CreateMoveOutScheduleDtoSchema
>;

const _GetMoveOutScheduleWithSlotsArgsSchema = z.object({
  id: z.number(),
});
export type GetMoveOutScheduleWithSlotsArgs = z.infer<
  typeof _GetMoveOutScheduleWithSlotsArgsSchema
>;

const _CompareSheetsArgsSchema = z.object({
  file: z.custom<File>(),
  currentYear: z.number(),
  currentSeason: _SeasonSchema,
  nextYear: z.number(),
  nextSeason: _SeasonSchema,
});
export type CompareSheetsArgs = z.infer<typeof _CompareSheetsArgsSchema>;

// ===== 성공 스키마 =====
const _InspectionTimeRangeDtoSchema = z.object({
  start: z.iso.datetime(),
  end: z.iso.datetime(),
});
export type InspectionTimeRangeDto = z.infer<
  typeof _InspectionTimeRangeDtoSchema
>;

const _MoveOutScheduleResDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  applicationStartTime: z.iso.datetime(),
  applicationEndTime: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type MoveOutScheduleResDto = z.infer<
  typeof _MoveOutScheduleResDtoSchema
>;

const _InspectionSlotResDtoSchema = z.object({
  id: z.uuid(),
  scheduleId: z.number(),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  maxCapacity: z.number(),
  reservedCount: z.number(),
});
export type InspectionSlotResDto = z.infer<typeof _InspectionSlotResDtoSchema>;

const _MoveOutScheduleWithSlotsResDtoSchema =
  _MoveOutScheduleResDtoSchema.extend({
    inspectionSlots: z.array(_InspectionSlotResDtoSchema),
  });
export type MoveOutScheduleWithSlotsResDto = z.infer<
  typeof _MoveOutScheduleWithSlotsResDtoSchema
>;

const _CreateInspectionTargetsResDtoSchema = z.object({
  message: z.string(),
  count: z.number(),
});
export type CreateInspectionTargetsResDto = z.infer<
  typeof _CreateInspectionTargetsResDtoSchema
>;

// ===== React Query 키 =====
export const moveOutQueryKeys = {
  all: ['move-out'] as const,
  schedules: () => [...moveOutQueryKeys.all, 'schedules'] as const,
  schedule: (id: number) => [...moveOutQueryKeys.schedules(), id] as const,
  scheduleWithSlots: (id: number) =>
    [...moveOutQueryKeys.schedule(id), 'with-slots'] as const,
} as const;
