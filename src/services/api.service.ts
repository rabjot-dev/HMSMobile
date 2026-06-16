import axios from "axios";

import { API_BASE_URL }
from "../constants/api";

import {
  getToken,
  getRefreshToken,
  saveToken,
  removeTokens,
}
from "../storage/token.storage";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {

    const token =
      await getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (
      error.response?.status ===
        401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry =
        true;

      try {

        const refreshToken =
          await getRefreshToken();

        if (!refreshToken) {
          throw error;
        }

        const response =
          await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {
              refreshToken,
            }
          );

        const newAccessToken =
          response.data.data
            .accessToken;

        await saveToken(
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(
          originalRequest
        );

      } catch {

        await removeTokens();

        throw error;
      }
    }

    throw error;
  }
);

export default api;