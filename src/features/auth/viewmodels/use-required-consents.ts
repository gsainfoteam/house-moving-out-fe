import { useAccount } from '@gsainfoteam/account-react';

import type { ConsentRequiredError, RequiredConsents } from '../models';

export const useRequiredConsents = (): RequiredConsents | null => {
  const { error, canRetryLogin } = useAccount();
  if (error?.code !== 'session_rejected' || !canRetryLogin) return null;

  return (error.details as ConsentRequiredError).requiredConsents;
};
