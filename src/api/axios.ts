import { apiURL, authURL } from "constants/urls";

import axios from "axios";

import { postRefresh } from "./auth/refresh";

declare module "axios" {
  export interface AxiosRequestConfig {
    retries?: number;
    retryCount?: number;
  }
}

export const apiClient = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  retries: 1,
  retryCount: 0,
});

export const authClient = axios.create({
  baseURL: authURL,
  withCredentials: true,
  retries: 1,
  retryCount: 0,
});

authClient.interceptors.response.use(
  (response) => response,
  async function (error) {
    switch (error.response?.status) {
      case 401:
        if ((error.config.retries ?? 0) > (error.config.retryCount ?? 0)) {
          await postRefresh();
          return authClient.request(error.config);
        }
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async function (error) {
    switch (error.response?.status) {
      case 401:
        if ((error.config.retries ?? 0) > (error.config.retryCount ?? 0)) {
          await postRefresh();
          return apiClient.request(error.config);
        }
    }
    return Promise.reject(error);
  }
);
