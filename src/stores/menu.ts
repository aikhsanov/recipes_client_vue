import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import categories from '@/api/categories';

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    menu: [
      { name: 'Сегодняшние рецепты', path: '', slug: 'recipesbytoday' },
      { name: 'Топ за месяц', path: '', slug: 'topmonth' },
      { name: 'Категории', path: '', children: [], slug: 'categories' },
    ],
  }),
  getters: {
    getMenu: (state) => state.menu,
    getCategoriesMenu: (state) => state.menu.find((el) => el.slug === 'categories')?.children,
  },
  actions: {
    async formMenu() {
      try {
        const categoriesList = (await categories.getAll()).data.data;
        if (!categoriesList.length) return;
        const catMenu = this.menu.find((el) => el?.slug === 'categories');
        catMenu.children = categoriesList.map((c) => ({
          name: c?.title,
          path: `recipes/by/category/${c?.id}`,
        }));
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },
  },
});
