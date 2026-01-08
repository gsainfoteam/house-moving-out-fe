import type {
  CreateNewPolicyDto,
  CreateNewPolicyResponseDto,
  JwtToken,
  UserLoginDto,
} from './auth.type';

import { api } from '@/common/lib';

export const authApi = {
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

  adminRefresh: async (): Promise<JwtToken> => {
    const response = await api.post<JwtToken>('/auth/admin/refresh');
    return response.data;
  },

  adminLogout: async (): Promise<void> => {
    await api.post('/auth/admin/logout');
  },

  createNewPolicyVersion: async (
    data: CreateNewPolicyDto,
  ): Promise<CreateNewPolicyResponseDto> => {
    const response = await api.post<CreateNewPolicyResponseDto>(
      '/auth/admin/policy',
      data,
    );
    return response.data;
  },

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

  userRefresh: async (): Promise<JwtToken> => {
    const response = await api.post<JwtToken>('/auth/user/refresh');
    return response.data;
  },

  userLogout: async (): Promise<void> => {
    await api.post('/auth/user/logout');
  },
};
