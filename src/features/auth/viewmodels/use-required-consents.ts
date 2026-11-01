import { useAccount } from '@gsainfoteam/account-react';

import { ConsentRejectionSchema, type RequiredConsents } from '../models';

/** 백엔드가 약관 동의를 요구하며 로그인을 거절했으면 그 내용을, 아니면 `null` 을 돌려준다. */
export const useRequiredConsents = (): RequiredConsents | null => {
  const { error, canRetryLogin } = useAccount();
  if (error?.code !== 'session_rejected' || !canRetryLogin) return null;

  return ConsentRejectionSchema.safeParse(error.details).data?.requiredConsents ?? null;
};
