import axios from 'axios';

import { useToken } from '@/features/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useToken.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// TODO: refresh token 인터셉터 추가, idp token과 house token 모두 refresh 필요
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.config?.url === '/auth/admin/refresh')
//       return Promise.reject(error);

//     if (error.response?.status === 401 && !error.config?.retry) {
//       const refreshRes = await authApi.adminRefresh().catch(() => null);
//       if (refreshRes) {
//         useToken.getState().saveToken(refreshRes.access_token);
//         error.config.retry = true;
//         return api.request(error.config);
//       } else {
//         useToken.getState().saveToken(null);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
