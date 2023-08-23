import { defineStore } from 'pinia';
import { User } from '@/types/user';
import { AxiosError } from 'axios';
import users from '@/api/users';

const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as User[],
    currentUser: {} as User,
  }),
  getters: {
    getUsers: (state) => state.users,
    getСurrentUser: (state) => state.currentUser,
  },
  actions: {
    async loadUsers(config: object, infinite: boolean = false) {
      try {
        const { data }: User[] = await users.getAll(config);
        this.users = infinite ? [...this.users, ...data.data] : data?.data;
        this.dataMeta = data?._meta;
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },
    async loadUserById(id: string | number, config?: object) {
      try {
        const { data }: User = await users.getById(id, config);
        this.currentUser = data?.data;
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },

    async loadFilteredUsers(payload: {}, config?: object, infinite: boolean = false) {
      try {
        return await users.getAllFiltered(payload);
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },
  },
});
