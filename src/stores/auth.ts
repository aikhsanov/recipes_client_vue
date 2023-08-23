import { defineStore } from 'pinia';
import { User } from '@/types/user';
import { AxiosError } from 'axios';
import auth from '@/api/auth';
import { Ingridient } from '@/types/ingridients';
import ingridients from '@/api/ingridients';

type userData = {
  username: string;
  email: string;
  password: string;
};

type userLoginData = {
  email: string;
  password: string;
};

const useAuthStore = defineStore({
  id: 'users',
  state: () => ({
    me: [] as User[],
  }),
  getters: {
    getMe: (state) => state.me,
  },
  actions: {
    async register(data: userData) {
      try {
        const res = (
          await auth.register({
            username: data.username,
            email: data.email,
            password: data.password,
          })
        ).data;
      } catch (e) {
        throw new Error(e);
      }
    },

    async login(data: userLoginData) {
      const res = (await auth.login(data)).data;
      return res;
    },
  },
});
