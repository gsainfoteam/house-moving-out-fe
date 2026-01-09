import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { useToken } from '@/features/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 동시 refresh 요청을 방지하기 위한 공유 promise
let refreshingTokenPromise: Promise<string> | null = null;

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
      !originalRequest.url?.includes('/auth/user/refresh') &&
      !originalRequest.url?.includes('/auth/user/logout')
    ) {
      originalRequest._retry = true;

      if (refreshingTokenPromise) {
        try {
          await refreshingTokenPromise;
          return api.request(originalRequest);
        } catch {
          return Promise.reject(error);
        }
      }

      refreshingTokenPromise = (async () => {
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
          return newToken;
        } catch (refreshError) {
          useToken.getState().saveToken(null);
          throw refreshError;
        } finally {
          refreshingTokenPromise = null;
        }
      })();

      try {
        await refreshingTokenPromise;
        return api.request(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
