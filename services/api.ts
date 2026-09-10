import axios from "axios";
import { ENV } from "@/config/env";
import { AUTH_STORAGE_KEY, useBoundStore } from "@/store";

const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const authDataSerialized = localStorage.getItem(AUTH_STORAGE_KEY);

  if (authDataSerialized) {
    try {
      const authData = JSON.parse(authDataSerialized) as {
        token?: { value?: string } | string;
      };

      const tokenValue =
        typeof authData.token === "string"
          ? authData.token
          : authData.token?.value;

      if (tokenValue) {
        config.headers.Authorization = `Bearer ${tokenValue}`;
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useBoundStore.getState().signOut();
    }
    return Promise.reject(error);
  }
);

export { api, AUTH_STORAGE_KEY };
