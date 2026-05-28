import { useCallback, useEffect, useMemo } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { UserDtoRole } from '../models';
import { useLogin, useLogout, useUser } from './queries';
import { useToken } from './stores';

export const useAuth = ({ showToast = false }: { showToast?: boolean } = {}) => {
  const { token: idpToken, logIn: idpLogIn, logOut: idpLogOut } = useAuthContext();
  const { mutate: logInMutate, ...logInMutation } = useLogin({ showToast });
  const { mutate: logOut, ...logOutMutation } = useLogout({ showToast });
  const { token } = useToken();
  const { data: userData, isLoading, error: userError, refetch: refetchUser } = useUser();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const logIn = useCallback(
    (...args: Parameters<typeof logInMutate>) => {
      if (!idpToken) {
        navigate({ to: '/auth/login' });
        if (showToast) {
          toast.error(t('error.noIdpToken'));
        }
        return;
      }

      return logInMutate(...args);
    },
    [idpToken, navigate, showToast, t, logInMutate],
  );

  const user = useMemo(() => {
    if (!token) return null;
    if (isLoading) return undefined;
    if (userError) return null;
    return userData;
  }, [userData, userError, isLoading, token]);

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
    if (!token) return;

    refetchUser();
  }, [refetchUser, token]);

  return {
    user,
    isInspector,
    isAdmin,
    isSuperAdmin,
    refetchUser,
    idpLogIn,
    idpLogOut,
    logIn,
    logOut,
    logInMutation,
    logOutMutation,
  };
};
