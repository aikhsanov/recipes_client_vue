import { defineStore } from 'pinia';
import categories from '@/api/categories';

type Category = {
  id: string | number;
  title: string;
};

export const useCategoryStore = defineStore({
  id: 'users',
  state: () => ({
    categories: [] as Category[],
  }),
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    async loadCategories() {
      const res = (await categories.getAll()).data;
      if (res?.data) {
        this.categories = res.data;
      }
      return res;
    },
  },
});
