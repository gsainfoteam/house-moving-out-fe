import { z } from 'zod';

import { ApiPaths, UserDtoRole } from '@/@types/api-schema';

const ConsentVersionInfoSchema = z.object({
  currentVersion: z.string().nullish(),
  requiredVersion: z.string(),
});

// 로그인을 거절한 403 의 details 다. 백엔드 swagger 에는 없어서 직접 정의한다
export const ConsentRejectionSchema = z.object({
  requiredConsents: z.object({
    terms: ConsentVersionInfoSchema,
    privacy: ConsentVersionInfoSchema,
  }),
});

export type ConsentVersionInfo = z.infer<typeof ConsentVersionInfoSchema>;
export type RequiredConsents = z.infer<typeof ConsentRejectionSchema>['requiredConsents'];
export { ApiPaths, UserDtoRole };
