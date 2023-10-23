import { defineStore } from 'pinia';
import { User } from '@/types/user';
import { AxiosError } from 'axios';
import auth from '@/api/auth';
import { Ingridient } from '@/types/ingridients';
import ingridients from '@/api/ingridients';
import { storeToken, removeToken, getToken } from '@/helpers/token';
import useToaster from '@/composables/useToaster';

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
    isAuthed: false,
  }),
  getters: {
    getMe: (state) => (Object.keys(state.me).length ? (state.me as User) : null),
    getIsAuthed: (state) => state.isAuthed,
    isAdmin: (state) => state.me.role === 'admin',
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
        this.isAuthed = true;
      }
      return res;
    },

    async logout() {
      removeToken();
      this.me = {};
      this.isAuthed = false;
    },

    async fetchCurrentUser() {
      try {
        const res = (await auth.me()).data;
        if (res?.data) {
          this.me = res.data;
          this.isAuthed = true;
          return res;
        }
      } catch (e) {
        console.error(e);
        return;
      }
    },

    async updateCurrentUser(data) {
      try {
        const res = (await auth.update(data)).data;
        if (res?.data) {
          this.me = res.data;
          useToaster('Изменения сохранения', 'success');
          return res;
        }
      } catch (e) {
        console.error(e);
        return;
      }
    },
  },
});
