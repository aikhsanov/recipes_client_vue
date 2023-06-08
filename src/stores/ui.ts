import { defineStore } from 'pinia';

export const useUIStore = defineStore({
  id: 'ui',
  state: () => ({
    superuser: '',
  }),
  getters: {
    getSuperUser: (state) => state.superuser,
  },
  actions: {
    async setSuperUser(text: string) {
      this.superuser = text;
    },
  },
});
