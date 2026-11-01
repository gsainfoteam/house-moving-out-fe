import { useAccount } from '@gsainfoteam/account-react';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useUser = () => {
  const { status } = useAccount();

  return $api.useQuery(
    'get',
    ApiPaths.UserController_getMe,
    {},
    {
      enabled: status === 'authenticated',
    },
  );
};
