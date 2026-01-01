import type { JwtToken } from './auth.type';

import { api } from '@/common/lib';

export const authApi = {
  adminLogin: async (code: string): Promise<JwtToken> => {
    const response = await api.post<JwtToken>(
      '/auth/admin/login',
      {},
      {
        headers: {
          Authorization: `Bearer ${code}`,
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
};
