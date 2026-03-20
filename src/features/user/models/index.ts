import type { components } from '@/@types/api-schema';

export type ApplicationUuidDto = components['schemas']['ApplicationUuidResDto'];
export type MoveOutScheduleWithSlots = components['schemas']['MoveOutScheduleWithSlotsResDto'];
export type Article = components['schemas']['ArticleResDto'];
export type ArticleDetail = components['schemas']['ArticleDetailResDto'];
export type FindArticlesResponse = components['schemas']['FindArticlesResDto'];
export type CreateArticleRequest = components['schemas']['CreateArticleReqDto'];
export {
  ApiPaths,
  PathsArticleGetParametersQueryType as ArticleType,
  CreateMoveOutScheduleWithTargetsFormDtoResidentGenderByHouseFloorKey as Gender,
} from '@/@types/api-schema';
