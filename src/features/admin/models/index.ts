import { type components } from '@/@types/api-schema';

export type MoveOutSchedule = components['schemas']['MoveOutScheduleResDto'];
export type InspectionSlot = components['schemas']['InspectionSlotResDto'];
export type Target = components['schemas']['InspectionTargetsGroupedByRoomResDto'];
export {
  PathsMoveOutInspectionTargetsGetParametersQueryCurrentSeason as Season,
  InspectorResDtoGender as Gender,
  MoveOutScheduleResDtoStatus as ScheduleStatus,
  InspectionTargetsGroupedByRoomResDtoInspectionType as InspectionType,
} from '@/@types/api-schema';
export { ApiPaths } from '@/@types/api-schema';
