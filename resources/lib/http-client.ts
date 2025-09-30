import axios, { AxiosError, type AxiosResponse } from "axios";

import { env } from "@src/env";
import { includes } from "@src/lib/typed-fns";
import { isNotEmpty, isPlainObject } from "@src/lib/utils";

const httpClient = axios.create({
  baseURL: `${env.VITE_APP_URL}/api/v1`,
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

httpClient.interceptors.request.use((config) => {
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

httpClient.interceptors.response.use(
  (response) => {
    if (isPlainObject(response.data)) {
      return response.data as AxiosResponse;
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Token has expired
      window.location.assign("/");
    }

    const res = error.response;
    if (
      isNotEmpty(res) &&
      isPlainObject(res) &&
      "data" in res &&
      isPlainObject(res.data)
    ) {
      const newError = { ...res.data, status: res.status };

      return Promise.reject(newError as unknown as Error);
    }

    return Promise.reject(error);
  },
);

async function artificialDelay<T>(callback: Promise<T>, duration = 800) {
  const [response] = await Promise.allSettled([
    callback,
    new Promise((resolve) => {
      setTimeout(resolve, duration);
    }),
  ]);

  if (response.status === "rejected") {
    throw response.reason;
  }

  return response.value;
}

export function arrayBufferResponse(
  response: ArrayBufferLike,
  blobType: string,
  fileName: string,
) {
  // BE endpoint sends a readable stream of bytes
  const byteArray = new Uint8Array(response);

  // Convert to ArrayBuffer to ensure compatibility with Blob constructor
  const arrayBuffer =
    byteArray.buffer instanceof ArrayBuffer
      ? byteArray.buffer
      : byteArray.buffer.slice(0);

  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const newBlob = new Blob([arrayBuffer], {
    type: blobType,
  });

  const url = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(url);
  }, 100);
}

interface HTTPClientResponse {
  status: number;
  message: string;
}

interface SuccessResponse extends HTTPClientResponse {
  data: unknown;
}

interface SuccessResponseWithMetaPagination extends SuccessResponse {
  meta?: {
    pagination: {
      total: number;
      current_page: number;
      last_page: number;
      has_more_page: boolean;
      from: number;
      to: number;
    };
    [key: string]: unknown;
  };
}

interface ErrorResponse extends HTTPClientResponse {
  error: unknown;
}

function isHTTPErrorResponse(error: unknown): error is ErrorResponse {
  return isNotEmpty(error) && isPlainObject(error) && "error" in error;
}

export { httpClient, artificialDelay, isHTTPErrorResponse };
export type {
  SuccessResponse,
  SuccessResponseWithMetaPagination,
  ErrorResponse,
};
