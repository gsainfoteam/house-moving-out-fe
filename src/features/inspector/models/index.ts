import type { components } from '@/@types/api-schema';

export type SubmitInspectionResultForm = components['schemas']['SubmitInspectionResultDto'];
export { ApiPaths, MoveOutScheduleResDtoStatus as ScheduleStatus } from '@/@types/api-schema';
export * as checklist from './checklist';
export { default as mainContent } from './template.typ?raw';
