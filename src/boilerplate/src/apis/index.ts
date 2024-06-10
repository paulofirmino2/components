import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';

import { getToken, logout } from '@/utils/services/auth';

const request = async (params: AxiosRequestConfig) => {
  const headers: RawAxiosRequestHeaders | AxiosHeaders = {
    Accept: '*/*',
  };
  if (
    params.url?.includes('company/company-user') &&
    params.method === 'POST'
  ) {
    headers['Content-Type'] = 'multipart/form-data';
  } else if (
    params.url?.includes('user/temp/detail') &&
    params.method === 'PATCH'
  ) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const token = getToken();
    if (token) {
      headers.AUTHORIZATION = `Bearer ${token}`;
    }
  } catch (ex) {
    if (ex !== 'No current user') {
      throw ex;
    }
  }
  const paramsReceived = params;
  paramsReceived.headers = headers;

  return axios({
    ...params,
  }).then(
    event => event,
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        logout();
      }
      throw error;
    }
  );
};

const getBaseUrl = (baseUrl?: string) =>
  baseUrl || (import.meta.env.VITE_APP_WEB_API as string);

export const get = (props: AxiosRequestConfig, baseURL?: string) =>
  request({
    baseURL: getBaseUrl(baseURL),
    ...props,
    method: 'GET',
  });

export const post = (props: AxiosRequestConfig, baseURL?: string) =>
  request({
    baseURL: getBaseUrl(baseURL),
    ...props,
    method: 'POST',
  });

export const put = (props: AxiosRequestConfig, baseURL?: string) =>
  request({
    baseURL: getBaseUrl(baseURL),
    ...props,
    method: 'PUT',
  });

export const patch = (props: AxiosRequestConfig, baseURL?: string) =>
  request({
    baseURL: getBaseUrl(baseURL),
    ...props,
    method: 'PATCH',
  });

export const del = (props: AxiosRequestConfig, baseURL?: string) =>
  request({
    baseURL: getBaseUrl(baseURL),
    ...props,
    method: 'DELETE',
  });

export default {
  del,
  get,
  patch,
  post,
  put,
};
