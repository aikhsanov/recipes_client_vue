import axios, { CreateAxiosDefaults } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import router from '@/router';

const options = {
  baseURL: 'http://api.receipts.haemmid.ru/',
  headers: {
    Accept: 'application/json',
  },
} as CreateAxiosDefaults;

const api = axios.create(options);
api.interceptors.response.use(
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
export default api;
