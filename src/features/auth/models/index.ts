import { z } from 'zod';

import { ApiPaths, UserDtoRole } from '@/@types/api-schema';

const ConsentVersionInfoSchema = z.object({
  currentVersion: z.string().nullish(),
  requiredVersion: z.string(),
});

export const ConsentRejectionSchema = z.object({
  requiredConsents: z.object({
    terms: ConsentVersionInfoSchema,
    privacy: ConsentVersionInfoSchema,
  }),
});

export type ConsentVersionInfo = z.infer<typeof ConsentVersionInfoSchema>;
export type RequiredConsents = z.infer<typeof ConsentRejectionSchema>['requiredConsents'];
export { ApiPaths, UserDtoRole };
