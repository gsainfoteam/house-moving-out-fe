import { CreateMoveOutScheduleDtoCurrentSeason, type components } from '@/@types/api-schema';

export type MoveOutSchedule = components['schemas']['MoveOutScheduleResDto'];
export const Season = CreateMoveOutScheduleDtoCurrentSeason;
export { ApiPaths } from '@/@types/api-schema';
