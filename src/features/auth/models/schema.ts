import { z } from 'zod';

// ===== 공통 타입 =====
const _PolicyTypeSchema = z.enum(['TERMS_OF_SERVICE', 'PRIVACY_POLICY']);
export type PolicyType = z.infer<typeof _PolicyTypeSchema>;

// ===== 인자 스키마 =====
const _AdminLoginArgsSchema = z.object({
  idpToken: z.string(),
});
export type AdminLoginArgs = z.infer<typeof _AdminLoginArgsSchema>;

const _UserLoginArgsSchema = z.object({
  idpToken: z.string(),
  consentData: z
    .object({
      agreedToTerms: z.boolean().optional(),
      agreedToPrivacy: z.boolean().optional(),
      termsVersion: z.string().optional(),
      privacyVersion: z.string().optional(),
    })
    .optional(),
});
export type UserLoginArgs = z.infer<typeof _UserLoginArgsSchema>;

const _CreateNewPolicyDtoSchema = z.object({
  type: _PolicyTypeSchema,
  version: z.string(),
});
export type CreateNewPolicyDto = z.infer<typeof _CreateNewPolicyDtoSchema>;

// ===== 성공 스키마 =====
const _JwtTokenSchema = z.object({
  access_token: z.string(),
});
export type JwtToken = z.infer<typeof _JwtTokenSchema>;

const _CreateNewPolicyResponseDtoSchema = z.object({
  uuid: z.string(),
  type: _PolicyTypeSchema,
  version: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
});
export type CreateNewPolicyResponseDto = z.infer<typeof _CreateNewPolicyResponseDtoSchema>;

const _UserLoginDtoSchema = z.object({
  agreedToTerms: z.boolean().optional(),
  agreedToPrivacy: z.boolean().optional(),
  termsVersion: z.string().optional(),
  privacyVersion: z.string().optional(),
});
export type UserLoginDto = z.infer<typeof _UserLoginDtoSchema>;

// ===== 실패 스키마 =====
/**
 * `/auth/user/login`에서만 내려오는 403 에러(동의 필요) 스키마.
 * 인터셉터에서 파싱하지 않고, 해당 mutation 훅에서만 추가 파싱한다.
 */
export const ConsentErrorCodeSchema = z.enum(['CONSENT_REQUIRED', 'CONSENT_UPDATE_REQUIRED']);
export type ConsentErrorCode = z.infer<typeof ConsentErrorCodeSchema>;

export const ConsentVersionInfoSchema = z.object({
  currentVersion: z
    .object({
      version: z.string(),
      agreedAt: z.string(),
    })
    .nullable(),
  requiredVersion: z.string(),
});
export type ConsentVersionInfo = z.infer<typeof ConsentVersionInfoSchema>;

export const RequiredConsentsSchema = z.object({
  terms: ConsentVersionInfoSchema,
  privacy: ConsentVersionInfoSchema,
});
export type RequiredConsents = z.infer<typeof RequiredConsentsSchema>;

export const ConsentRequiredErrorSchema = z.object({
  message: z.string(),
  errorCode: ConsentErrorCodeSchema,
  statusCode: z.number(),
  requiredConsents: RequiredConsentsSchema.optional(),
});
export type ConsentRequiredError = z.infer<typeof ConsentRequiredErrorSchema>;

// ===== React Query 키 =====
export const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  admin: () => [...authQueryKeys.all, 'admin'] as const,
} as const;
