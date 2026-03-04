import { useCallback, useEffect, useMemo } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { UserDtoRole } from '../models';
import { useGetInspector, useGetInspectors, useLogin, useLogout, useUser } from './queries';
import { useToken } from './stores';

const useIsInspector = () => {
  const { token } = useToken();
  const { data: user } = useUser();
  const { data: inspectors, isLoading: isLoadingInspectors } = useGetInspectors(!!token);

  const matchedInspector = useMemo(() => {
    if (!user || !inspectors) return null;
    return (
      inspectors.find(
        (insp) =>
          insp.studentNumber === user.studentNumber &&
          insp.email === user.email &&
          insp.name === user.name,
      ) ?? undefined
    );
  }, [user, inspectors]);

  const {
    data: inspectorData,
    isLoading: isLoadingInspector,
    error: inspectorError,
    refetch: refetchInspector,
  } = useGetInspector(matchedInspector?.uuid ?? '', !!matchedInspector);

  const inspector = useMemo(() => {
    if (!user || !matchedInspector) return undefined;
    if (isLoadingInspectors || isLoadingInspector) return undefined;
    if (inspectorError) return null;
    return inspectorData;
  }, [
    inspectorData,
    inspectorError,
    isLoadingInspector,
    isLoadingInspectors,
    matchedInspector,
    user,
  ]);

  useEffect(() => {
    if (!token) return;

    if (matchedInspector) {
      refetchInspector();
    }
  }, [matchedInspector, refetchInspector, token]);

  return { inspector };
};

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

  const isAdmin = useMemo(
    () => (user === undefined ? undefined : user?.role === UserDtoRole.ADMIN),
    [user],
  );

  useEffect(() => {
    if (!token) return;

    refetchUser();
  }, [refetchUser, token]);

  const { inspector } = useIsInspector();

  return {
    user,
    inspector,
    isAdmin,
    refetchUser,
    idpLogIn,
    idpLogOut,
    logIn,
    logOut,
    logInMutation,
    logOutMutation,
  };
};
