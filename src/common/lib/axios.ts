import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

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

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/user/refresh'
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post<{ access_token: string }>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = response.data.access_token;
        useToken.getState().saveToken(newToken);

        // 원래 요청을 토큰 리프레시 후 재시도
        return api.request(originalRequest);
      } catch (refreshError) {
        useToken.getState().saveToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
