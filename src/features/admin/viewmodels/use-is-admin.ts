import { useAuth } from '@/features/auth';

import { UserDtoRole } from '../models';

export const useIsAdmin = () => {
  const { user } = useAuth();

  return user === undefined ? undefined : user?.role === UserDtoRole.ADMIN;
};
