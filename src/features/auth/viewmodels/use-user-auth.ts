import { useAuthContext } from 'react-oauth2-code-pkce';

import { useUserLogin, useUserLogout } from './queries';

export const useUserAuth = ({ showToast = false }: { showToast?: boolean } = {}) => {
  const { logIn: idpLogIn } = useAuthContext();
  const { mutate: logIn, ...logInMutation } = useUserLogin({ showToast });
  const { mutate: logOut, ...logOutMutation } = useUserLogout({ showToast });

  // TODO: 로그아웃 2번 눌러야 되는 거 수정 필요 -> 엄청 오래 걸리는(>10s) 로그아웃이 가끔 발생하는데 이 때 에러는 invalid session 401 에러.
  return {
    idpLogIn,
    logIn,
    logOut,
    logInMutation,
    logOutMutation,
  };
};
