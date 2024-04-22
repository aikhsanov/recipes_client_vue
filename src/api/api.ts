import axios, { CreateAxiosDefaults } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import router from '@/router';
import { getToken, removeToken } from '../helpers/token';
import useToaster from '@/composables/useToaster';

const options = {
  // baseURL: 'http://api.receipts.haemmid.ru/',
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'http://62.217.178.4/recipes-server/api',
  headers: {
    Accept: 'application/json',
  },
} as CreateAxiosDefaults;

const AxiosInstance = axios.create(options);

AxiosInstance.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (resp) => {
    if (resp?.response?.status === 500) {
      if (resp?.response?.data?.message?.includes('TokenExpiredError')) {
        removeToken();
        return Promise.reject(resp?.response?.data?.message || 'Неизвестная ошибка');
      }
    }
    if (resp?.response?.data?.message !== 'Unauthorized') {
      useToaster(resp?.response?.data?.message, 'error');
    }
    return Promise.reject(resp?.response?.data?.message || 'Неизвестная ошибка');
  }
);

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error.response.status, '-ERROR BAABY');
  }
);
const api = (axios) => ({
  get: (url, config, body?) => axios.get(url, config, body),
  post: (url, body, config?) => axios.post(url, body, config),
  patch: (url, body, config?) => axios.patch(url, body, config),
  delete: (url, config?) => axios.delete(url, config),
});

export default api(AxiosInstance);
