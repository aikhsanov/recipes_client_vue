import { defineStore } from 'pinia';
import { User } from '@/types/user';

const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as User[],
    currentUser: {} as User,
  }),
  getters: {
    getUsers: (state) => this.state.users,
  },
});
