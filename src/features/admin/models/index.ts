import { type components } from '@/@types/api-schema';

export type MoveOutSchedule = components['schemas']['MoveOutScheduleResDto'];
export type InspectionSlot = components['schemas']['InspectionSlotResDto'];
export {
  PathsMoveOutInspectionTargetsGetParametersQueryCurrentSeason as Season,
  InspectorResDtoGender as Gender,
  MoveOutScheduleResDtoStatus as ScheduleStatus,
} from '@/@types/api-schema';
export { ApiPaths } from '@/@types/api-schema';
