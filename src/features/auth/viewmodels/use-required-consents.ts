import { useAccount } from '@gsainfoteam/account-react';

import { ConsentRejectionSchema, type RequiredConsents } from '../models';

export const useRequiredConsents = (): RequiredConsents | null => {
  const { error, canRetryLogin } = useAccount();
  if (error?.code !== 'session_rejected' || !canRetryLogin) return null;

  return ConsentRejectionSchema.safeParse(error.details).data?.requiredConsents ?? null;
};
