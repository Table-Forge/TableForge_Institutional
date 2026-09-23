import axios from "axios";

import { AUTH_STORAGE_KEY } from "@/store/slices/auth-slice";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "http://localhost:5017";
};

const api = axios.create({
  baseURL: getBaseUrl(),
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
      let tokenValue = "";

      if (authDataSerialized.startsWith("{")) {
        const authData = JSON.parse(authDataSerialized) as {
          token?: { value?: string } | string;
        };
        tokenValue =
          typeof authData.token === "string"
            ? authData.token
            : authData.token?.value || "";
      } else {
        tokenValue = authDataSerialized;
      }

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
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event("tableforge_auth_change"));
    }
    return Promise.reject(error);
  },
);

export { api };
