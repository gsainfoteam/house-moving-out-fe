import { useAuthContext } from 'react-oauth2-code-pkce';

import { authApi } from '../models';

import { useToken } from './use-token';

export const useLogout = () => {
  const { logOut: idpLogout } = useAuthContext();

  const logOut = async () => {
    await authApi.userLogout();
    idpLogout();
    useToken.getState().saveToken(null);
  };

  return { logOut };
};
