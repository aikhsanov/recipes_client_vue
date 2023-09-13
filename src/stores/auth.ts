import { defineStore } from 'pinia';
import { User } from '@/types/user';
import { AxiosError } from 'axios';
import auth from '@/api/auth';
import { Ingridient } from '@/types/ingridients';
import ingridients from '@/api/ingridients';
import { storeToken, removeToken, getToken } from '@/helpers/token';

type userData = {
  username: string;
  email: string;
  password: string;
};

type userLoginData = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore({
  id: 'users',
  state: () => ({
    me: {} as User,
    isAuthed: !!getToken() as boolean,
  }),
  getters: {
    getMe: (state) => (Object.keys(state.me).length ? (state.me as User) : null),
    getIsAuthed: (state) => state.isAuthed,
  },
  actions: {
    async register(data: userData) {
      try {
        const res = (await auth.register(data)).data;
        if (res.data) {
          storeToken(res?.data?.user?.token);
        }
      } catch (e) {
        throw new Error(e);
      }
    },

    async login(data: userLoginData) {
      const res = (await auth.login(data)).data;
      if (res.data) {
        storeToken(res?.data?.token);
        this.me = res.data;
      }
      return res;
    },

    async logout() {
      removeToken();
      this.me = {};
    },

    async fetchCurrentUser() {
      const res = (await auth.me()).data;
      if (res?.data) {
        this.me = res.data;
      }
    },
  },
});
