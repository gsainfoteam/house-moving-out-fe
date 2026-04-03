import { type components } from '@/@types/api-schema';

export type MoveOutSchedule = components['schemas']['MoveOutScheduleResDto'];
export type InspectionSlot = components['schemas']['InspectionSlotResDto'];
export type Target = components['schemas']['InspectionTargetsGroupedByRoomResDto'];
export type Article = components['schemas']['ArticleResDto'];
export type ArticleDetail = components['schemas']['ArticleDetailResDto'];
export type FindArticlesResponse = components['schemas']['FindArticlesResDto'];
export type CreateArticleRequest = components['schemas']['CreateArticleReqDto'];
export type UpdateArticleVisibilityRequest = components['schemas']['UpdateArticleVisibilityReqDto'];
export type MoveOutScheduleWithSlots = components['schemas']['MoveOutScheduleWithSlotsResDto'];
export type Inspector = components['schemas']['InspectorResDto'];
export type Application = components['schemas']['ApplicationResDto'];
export {
  CreateMoveOutScheduleWithTargetsFormDtoCurrentSeason as Season,
  CreateMoveOutScheduleWithTargetsFormDtoResidentGenderByHouseFloorKey as Gender,
  MoveOutScheduleResDtoStatus as ScheduleStatus,
  TargetInfoResDtoInspectionType as InspectionType,
  PathsArticleGetParametersQueryType as ArticleType,
  ArticleDtoLanguage as ArticleLanguage,
  ApplicationResDtoStatus as ApplicationStatus,
} from '@/@types/api-schema';
export { ApiPaths } from '@/@types/api-schema';
