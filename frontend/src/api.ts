import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { Token } from './utils';
import { HttpCode } from './const';
import { TValidationErrorField } from './types/error';

const BACKEND_URL = 'http://localhost:4000';
const REQUEST_TIMEOUT = 50000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response) {
        switch (response.status) {
          case HttpCode.BadRequest:
            (response.data.details)
              ? response.data.details
                .forEach(
                  (detail: TValidationErrorField) =>
                    detail.messages
                      .forEach(
                        (message: string) => toast.warn(message),
                      ),
                )
              : toast.warn(`Error: ${response.data.errorType}. Message: ${response.data.error}`);
            break;
          case HttpCode.NoAuth:
          case HttpCode.Conflict:
            toast.warn(`Path: ${response.config.url}. Error: ${response.data.errorType}. Message: ${response.data.error}`);
            break;
          case HttpCode.NotFound:
            toast.warn(`Path: ${response.config.url}. Error: ${response.status}. Message: ${response.statusText}`);
            break;
          default:
            toast.warn('unknown error');
            break;
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
