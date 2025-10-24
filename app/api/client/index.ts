import type { AxiosError, AxiosRequestConfig } from "axios";

import axios from "axios";

type APIResolved<T> = (response: T) => void;
type APIRejected = (error: AxiosError) => void;

export function api<T>(payload: AxiosRequestConfig) {
  return new Promise((resolve: APIResolved<T>, reject: APIRejected) => {
    const config = useConfig();

    const baseClient = axios.create({
      baseURL: config.apiBaseUrl,
      validateStatus: status => status >= 200 && status < 300,
    });

    baseClient.interceptors.request.use((config) => {
      /** HERE IF YOU WANT TO SEND AUTH TOKEN */
      return config;
    });

    baseClient.interceptors.response.use(
      response => response,
      (error) => {
        /** HERE IF YOU WANT TO HANDLE API ERROR */
        return Promise.reject(error);
      },
    );

    baseClient<T>(payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        if (error.response) {
          resolve(error.response.data);
        }
        else {
          reject(error);
        }
      });
  });
}
