import { type components } from '@/@types/api-schema';

export type MoveOutSchedule = components['schemas']['MoveOutScheduleResDto'];
export type InspectionSlot = components['schemas']['InspectionSlotResDto'];
export type SlotInfo = components['schemas']['SlotInfoResDto'];
export type Target = components['schemas']['InspectionTargetsGroupedByRoomResDto'];
export type Article = components['schemas']['ArticleResDto'];
export type ArticleDetail = components['schemas']['ArticleDetailResDto'];
export type FindArticlesResponse = components['schemas']['FindArticlesResDto'];
export type CreateArticleRequest = components['schemas']['CreateArticleReqDto'];
export type UpdateArticleVisibilityRequest = components['schemas']['UpdateArticleVisibilityReqDto'];
export type MoveOutScheduleWithSlots = components['schemas']['MoveOutScheduleWithSlotsResDto'];
export type Inspector = components['schemas']['InspectorResDto'];
export type Application = components['schemas']['ApplicationResDto'];
export type AdminListItem = components['schemas']['AdminListItemDto'];
export type AdminList = components['schemas']['AdminListDto'];
export type CreateAdminRequest = components['schemas']['CreateAdminDto'];
export type TransferSuperAdminRequest = components['schemas']['TransferSuperAdminDto'];
export {
  CreateMoveOutScheduleWithTargetsFormDtoCurrentSeason as Season,
  CreateMoveOutScheduleWithTargetsFormDtoResidentGenderByHouseFloorKey as Gender,
  MoveOutScheduleResDtoStatus as ScheduleStatus,
  TargetInfoResDtoInspectionType as InspectionType,
  PathsArticleGetParametersQueryType as ArticleType,
  ArticleDtoLanguage as ArticleLanguage,
  ApplicationResDtoStatus as ApplicationStatus,
  UserDtoRole,
} from '@/@types/api-schema';
export { ApiPaths } from '@/@types/api-schema';
export { default as insertSignatureContent } from './insert-signature.typ?raw';
