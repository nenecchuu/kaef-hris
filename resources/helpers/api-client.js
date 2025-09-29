import axios from "axios";

import { env } from "@src/env";
import { includes } from "@src/lib/typed-fns";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_URL}/api/v1`,
  withCredentials: true,
});

const CSRF_METHODS = [
  "post",
  "POST",
  "put",
  "PUT",
  "patch",
  "PATCH",
  "delete",
  "DELETE",
];

apiClient.interceptors.request.use((config) => {
  if (
    includes(CSRF_METHODS, config.method) &&
    !/^(.*;)?\s*XSRF-TOKEN\s*=\s*[^;]+(.*)?$/.exec(document.cookie)
  ) {
    return axios
      .get(`${env.VITE_APP_URL}/sanctum/csrf-cookie`)
      .then(() => config);
  }

  return config;
}, null);

export class ErrorResponse {
  /**
   * @param {number} status
   * @param {string} message
   * @param {{[key: string]: any}} error
   */
  constructor(status, message, error) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

apiClient.interceptors.response.use(
  (res) => {
    const { data, status, statusText } = res;

    return data || { status, message: statusText, data: null };
  },
  (err) => {
    const { data, status, statusText } = err.response;

    let message = "Something went wrong. Please try again.";
    let error = {};

    if (data) {
      message = data.message || statusText;

      if (data.error) {
        error = data.error;
      }
    }

    if (status === 401) {
      window.location.assign("/");
    }

    return Promise.reject(new ErrorResponse(status, message, error));
  },
);
