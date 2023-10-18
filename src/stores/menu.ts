import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import categories from '@/api/categories';

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    menu: [
      { name: 'Сегодняшние рецепты', path: '', id: 1 },
      { name: 'Категории', children: [], id: 2 },
    ],
  }),
  getters: {
    getMenu: (state) => state.menu,
  },
  actions: {
    async formMenu() {
      try {
        const categoriesList = (await categories.getAll()).data.data;
        console.log(categoriesList);
        const catMenu = this.menu.find((el) => el.id === 2);
        catMenu.children = categoriesList.map((c) => ({
          name: c.title,
          path: `recipes/by/category/${c.id}`,
        }));
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },
  },
});
