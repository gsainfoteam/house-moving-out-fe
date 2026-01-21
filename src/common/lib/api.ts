import createFetchClient, { type Middleware } from "openapi-fetch";
import createQueryClient from "openapi-react-query";

import { ApiPaths, type paths } from "@/@types/api-schema";
import { useToken } from "@/features/auth";

interface AuxiliaryRequest extends Request {
  retry?: boolean;
  keepToken?: boolean;
}

const middleware: Middleware = {
  async onRequest({ request }) {
    const token = useToken.getState().token;
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  },
  async onResponse({ request, response, options }) {
    const auxiliaryRequest = request as AuxiliaryRequest;
    
    if (response.status == 401) {
      if (auxiliaryRequest.retry || request.url.includes(ApiPaths.AuthController_userRefresh)) {
        if (!auxiliaryRequest.keepToken) {
          useToken.getState().saveToken(null);
        }
      } else {
        const { data } = await api.POST(ApiPaths.AuthController_userRefresh);

        if (data) {
          useToken.getState().saveToken(data.access_token);
          auxiliaryRequest.retry = true;
          return options.fetch(auxiliaryRequest);
        } else if (!auxiliaryRequest.keepToken) {
          useToken.getState().saveToken(null);
        }
      }
    }

    if (response.status >= 400) {
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  async onError({ error, request }) {
    if (request.url.includes(ApiPaths.AuthController_userRefresh))
      return Promise.reject(`Error refreshing user token: ${error}`);
    
    if (request.url.includes(ApiPaths.AuthController_userLogin))
      return Promise.reject(`Error in user login: ${error}`);

    return Promise.reject(`Error in request: ${error}`);
  },
};

export const api = createFetchClient<paths>({
  baseUrl: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
});
api.use(middleware);

export const $api = createQueryClient(api);
