import { useCallback, useEffect, useMemo } from 'react';

import { useAccount } from '@gsainfoteam/account-react';

import { UserDtoRole } from '../models';
import { useUser } from './queries';

export const useAuth = () => {
  const { status, error, login, logout } = useAccount();
  const { data: userData, isLoading, error: userError, refetch: refetchUser } = useUser();

  const user = useMemo(() => {
    if (status === 'loading') return undefined;
    if (status === 'unauthenticated') return null;
    if (isLoading) return undefined;
    if (userError) return null;
    return userData;
  }, [status, userData, userError, isLoading]);

  const isSuperAdmin = useMemo(
    () => (user === undefined ? undefined : user?.role === UserDtoRole.SUPERADMIN),
    [user],
  );

  const isAdmin = useMemo(
    () => isSuperAdmin || (user === undefined ? undefined : user?.role === UserDtoRole.ADMIN),
    [user, isSuperAdmin],
  );

  const isInspector = useMemo(
    () => (user === undefined ? undefined : (user?.isInspector ?? false)),
    [user],
  );

  useEffect(() => {
    if (status !== 'authenticated') return;

    refetchUser();
  }, [refetchUser, status]);

  const logIn = useCallback(() => login({ returnTo: '/auth/login' }), [login]);
  const logOut = useCallback(() => logout(), [logout]);

  return {
    user,
    loginError: error,
    isInspector,
    isAdmin,
    isSuperAdmin,
    refetchUser,
    logIn,
    logOut,
  };
};
