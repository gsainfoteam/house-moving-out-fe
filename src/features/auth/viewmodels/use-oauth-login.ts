import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { generateCodeChallenge, generateRandomString } from '../utils';

import { api } from '@/common/lib';
import { useOAuthState, useToken } from '@/common/viewmodels';

export const useOAuthLogin = () => {
  const [recentLogout, setRecentLogout] = useState(false);
  const { t } = useTranslation();

  const redirectToProvider = async () => {
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
  };

  const handleOAuthCallback = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const receivedState = searchParams.get('state');

    const { state: storedState, codeVerifier } = useOAuthState.getState();

    if (!code) {
      throw new Error(t('auth.error.noCode'));
    }

    if (!storedState || storedState !== receivedState) {
      throw new Error(t('auth.error.invalidState'));
    }

    const res = await api.post(
      import.meta.env.VITE_IDP_TOKEN_URL,
      {
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_IDP_CLIENT_ID,
        code,
        redirect_uri: import.meta.env.VITE_IDP_REDIRECT_URI,
        code_verifier: codeVerifier,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    useToken.getState().saveToken(res.data.access_token);
    setRecentLogout(false);
  };

  return {
    redirectToProvider,
    handleOAuthCallback,
  };
};
