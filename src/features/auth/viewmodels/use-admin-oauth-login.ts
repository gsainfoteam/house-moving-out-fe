import { useCallback, useState } from 'react';

import { generateCodeChallenge, generateRandomString } from '../utils';
import { useAdminLogin } from './use-admin-login';

import { api } from '@/common/lib';
import { useOAuthState } from '@/common/viewmodels';

export const useAdminOAuthLogin = () => {
  const [recentLogout, setRecentLogout] = useState(false);
  const adminLoginMutation = useAdminLogin();

  const redirectToProvider = useCallback(async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);

    useOAuthState.getState().setState(state);
    useOAuthState.getState().setCodeVerifier(codeVerifier);

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

  const handleOAuthCallback = useCallback(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const receivedState = searchParams.get('state');

    const { state: storedState, codeVerifier } = useOAuthState.getState();

    if (!code) {
      useOAuthState.getState().clear();
      throw new Error('인증 코드를 받지 못했습니다');
    }

    if (!storedState || storedState !== receivedState) {
      useOAuthState.getState().clear();
      throw new Error('인증 상태가 일치하지 않습니다');
    }

    if (!codeVerifier) {
      useOAuthState.getState().clear();
      throw new Error('Code verifier가 없습니다');
    }

    try {
      // IdP에서 access token 받기 
      const idpTokenResponse = await api.post(
        import.meta.env.VITE_IDP_TOKEN_URL,
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_IDP_CLIENT_ID,
          code,
          redirect_uri: import.meta.env.VITE_IDP_REDIRECT_URI,
          code_verifier: codeVerifier,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const idpAccessToken = idpTokenResponse.data.access_token;

      // IdP access token으로 어드민 로그인
      await adminLoginMutation.mutateAsync(idpAccessToken);

      useOAuthState.getState().clear();
      setRecentLogout(false);
    } catch (error) {
      useOAuthState.getState().clear();
      throw error;
    }
  }, [adminLoginMutation]);

  return {
    redirectToProvider,
    handleOAuthCallback,
  };
};

