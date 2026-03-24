import type { components } from '@/@types/api-schema';

export type SubmitInspectionResultForm = components['schemas']['SubmitInspectionResultDto'];
export {
  ApiPaths,
  MoveOutScheduleResDtoStatus as ScheduleStatus,
  ApplicationResDtoStatus as ApplicationStatus,
} from '@/@types/api-schema';
export { default as mainContent } from './template.typ?raw';
