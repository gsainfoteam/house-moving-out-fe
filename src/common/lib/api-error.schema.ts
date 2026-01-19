import { z } from 'zod';

/**
 * NestJS 기본 HttpException 응답 포맷을 기준으로 한 공통 에러 스키마.
 * - message는 string 또는 string[] 인 케이스가 존재함(ValidationPipe 등)
 * - error는 "Bad Request" 같은 요약 문자열이거나 생략될 수 있음
 *
 * 백엔드에서 추가 필드를 붙이는 경우를 고려해 code/details도 optional로 수용.
 */
export const NestHttpErrorSchema = z.object({
  statusCode: z.number(),
  message: z.union([z.string(), z.array(z.string())]),
  error: z.string().optional(),
  code: z.string().optional(),
  details: z.unknown().optional(),
});

export type NestHttpError = z.infer<typeof NestHttpErrorSchema>;

/**
 * message를 string으로 정규화한 에러 타입
 */
export type ApiHttpError = Omit<NestHttpError, 'message'> & {
  message: string; // 배열인 경우 join된 문자열
  raw?: unknown; // 원본 데이터 보존용
};

export function isApiHttpError(error: unknown): error is ApiHttpError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error &&
    typeof (error as ApiHttpError).statusCode === 'number' &&
    typeof (error as ApiHttpError).message === 'string'
  );
}

export function toApiHttpError(input: unknown): ApiHttpError | null {
  const parsed = NestHttpErrorSchema.safeParse(input);
  if (!parsed.success) return null;

  const data = parsed.data;
  const message =
    typeof data.message === 'string' ? data.message : data.message.join('\n');

  return {
    statusCode: data.statusCode,
    message,
    error: data.error,
    code: data.code,
    details: data.details,
    raw: input,
  };
}
