import axios, { CreateAxiosDefaults } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import router from '@/router';

const options = {
  // baseURL: 'http://api.receipts.haemmid.ru/',
  baseURL: 'http://localhost:3000/api',
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
    if (resp.response.status === 500) {
      window.localStorage.token = null;
      router.push({ name: 'login' }).then();
    } else {
      return Promise.reject(resp);
    }
  }
);

const api = (axios) => ({
  get: (url, config, body) => axios.get(url, config, body),
  post: (url, body, config) => axios.post(url, body, config),
  patch: (url, body, config) => axios.patch(url, body, config),
  delete: (url, config) => axios.delete(url, config),
});

export default api(AxiosInstance);
