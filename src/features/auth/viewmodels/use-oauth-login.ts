import { useState } from 'react';

import { generateCodeChallenge, generateRandomString } from '../utils';

import { useAdminLogin } from './use-admin-login';

import { useOAuthState } from '@/common/viewmodels';

const AUTHORIZE_URL = import.meta.env.DEV
  ? 'https://idp.gistory.me/authorize'
  : 'https://idp.gistory.me/authorize';

export const useOAuthLogin = () => {
  const [recentLogout, setRecentLogout] = useState(false);
  const { mutateAsync: adminLogin } = useAdminLogin();

  const redirectToProvider = async () => {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const nonce = generateRandomString();

    useOAuthState.setState({ state, codeVerifier, nonce });

    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const prompt = recentLogout ? 'login' : 'consent';
    const scopes = [
      'openid',
      'offline_access',
      'profile',
      'email',
      'phone_number',
      'student_id',
    ];

    const url = new URL(AUTHORIZE_URL);
    url.searchParams.set('client_id', import.meta.env.VITE_IDP_CLIENT_ID);
    url.searchParams.set('redirect_uri', import.meta.env.VITE_IDP_REDIRECT_URI);
    url.searchParams.set('scope', scopes.join(' '));
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);
    url.searchParams.set('nonce', nonce);
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('prompt', prompt);

    window.location.href = url.toString();
  };

  const handleOAuthCallback = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const receivedState = searchParams.get('state');

    if (!code) {
      throw new Error('인증 코드가 없습니다.');
    }

    const storedState = useOAuthState.getState().state;
    if (!storedState || storedState !== receivedState) {
      throw new Error(
        '유효하지 않은 state입니다. CSRF 공격 가능성이 있습니다.',
      );
    }

    useOAuthState.getState().clear();
    const data = await adminLogin(code);
    setRecentLogout(false);

    return data;
  };

  return {
    redirectToProvider,
    handleOAuthCallback,
  };
};
