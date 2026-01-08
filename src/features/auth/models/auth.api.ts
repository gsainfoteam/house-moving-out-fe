import type {
  CreateNewPolicyDto,
  CreateNewPolicyResponseDto,
  JwtToken,
  UserLoginDto,
} from './auth.type';

import { api } from '@/common/lib';

export const authApi = {
  /**
   * Admin Login
   * Issue JWT token for admin
   * @param idpToken OAuth2 IDP token
   */
  adminLogin: async (idpToken: string): Promise<JwtToken> => {
    const response = await api.post<JwtToken>(
      '/auth/admin/login',
      {},
      {
        headers: {
          Authorization: `Bearer ${idpToken}`,
        },
      },
    );
    return response.data;
  },

  /**
   * Admin Refresh Token
   * Refresh the access token for admin
   */
  adminRefresh: async (): Promise<JwtToken> => {
    const response = await api.post<JwtToken>('/auth/admin/refresh');
    return response.data;
  },

  /**
   * Admin Logout
   * Logout the admin from the cookie. Delete the refresh token from DB.
   */
  adminLogout: async (): Promise<void> => {
    await api.post('/auth/admin/logout');
  },

  /**
   * Create New Policy Version
   * Create a new policy version and set it as the latest active version.
   * @param data Policy creation data
   */
  createNewPolicyVersion: async (
    data: CreateNewPolicyDto,
  ): Promise<CreateNewPolicyResponseDto> => {
    const response = await api.post<CreateNewPolicyResponseDto>(
      '/auth/admin/policy',
      data,
    );
    return response.data;
  },

  /**
   * User Login
   * Issue JWT token. If consent required, returns 403 with CONSENT_REQUIRED or CONSENT_UPDATE_REQUIRED error.
   * @param idpToken OAuth2 IDP token
   * @param consentData Optional consent information (required only when consent needed)
   */
  userLogin: async (
    idpToken: string,
    consentData?: UserLoginDto,
  ): Promise<JwtToken> => {
    const response = await api.post<JwtToken>('/auth/user/login', consentData, {
      headers: {
        Authorization: `Bearer ${idpToken}`,
      },
    });
    return response.data;
  },

  /**
   * User Refresh Token
   * Refresh the access token for user
   */
  userRefresh: async (): Promise<JwtToken> => {
    const response = await api.post<JwtToken>('/auth/user/refresh');
    return response.data;
  },

  /**
   * User Logout
   * Logout the user from the cookie. Delete the refresh token.
   */
  userLogout: async (): Promise<void> => {
    await api.post('/auth/user/logout');
  },
};
