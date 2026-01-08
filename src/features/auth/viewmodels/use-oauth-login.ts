import { useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { authApi } from '../models';
import { generateCodeChallenge, generateRandomString } from '../utils';

import { useOAuthState } from './use-oauth-state';
import { useToken } from './use-token';

export const useOAuthLogin = () => {
  // TODO: 자세하게 이게 뭐하는건지 알아보기, 왜 필요한지 알아보기
  const [recentLogout, _] = useState(false);
  const navigate = useNavigate();
  const { token, logOut } = useAuthContext();

  const redirectToProvider = useCallback(async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);

    useOAuthState.setState({ state, codeVerifier });

    const prompt = recentLogout ? 'login' : 'consent';
    const scopes = [
      'offline_access',
      'profile',
      'email',
      'phone_number',
      'student_id',
    ];

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_IDP_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_IDP_REDIRECT_URI,
      scope: scopes.join(' '),
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      prompt,
    });

    window.location.href = `${import.meta.env.VITE_IDP_AUTHORIZE_URL}?${params.toString()}`;
  }, [recentLogout]);

  // TODO: onSubmit 측 코드랑 코드 중앙화 필요

  const tryLogin = useCallback(async () => {
    const goToIdpToken = () => navigate({ to: '/auth/login' });
    const goToConsentData = () => navigate({ to: '/auth/consent' });
    const goToHome = () => navigate({ to: '/' });

    // FIXME: 콘솔, 토스트 로그 지우기
    toast.info(`token: ${token}`);

    // FIXME: 콘솔, 토스트 로그 지우기
    if (!token) {
      toast.error('idp token is null, redirect to login');
      return await goToIdpToken();
    }

    try {
      const response = await authApi.userLogin(token);

      useToken.getState().saveToken(response.access_token);
      return await goToHome();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          logOut();
          toast.error('idp token is invalid, redirect to login');
          return await goToIdpToken();
        } else if (error.response?.status === 403) {
          // TODO: 약관 버전이 달라져도 403 에러 발생함 - 이 때 에러 스키마를 보고 처리해야 함
          toast.error('consent required, redirect to consent');
          return await goToConsentData();
        } else {
          toast.error('login failed, redirect to login 1');
          return await goToIdpToken();
        }
      } else {
        toast.error('login failed, redirect to login 2');
        return await goToIdpToken();
      }
    }
  }, [logOut, navigate, token]);

  return {
    redirectToProvider,
    tryLogin,
  };
};
