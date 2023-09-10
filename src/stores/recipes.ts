import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/api/api';
import recipes from '@/api/recipes';
import { Recipe } from '@/types/recipes';
import { RecipeIngridient } from '@/types/ingridients';

export const useRecipesStore = defineStore({
  id: 'recipes',
  state: () => ({
    recipes: [] as Recipe[],
    recipeIngridients: [] as RecipeIngridient,
    currentRecipe: {} as Recipe,
  }),
  getters: {
    getRecipes: (state) => state.recipes as Recipe[],
    getCurrentRecipe: (state) => {
      if (Object.keys(state.currentRecipe as Recipe).length) {
        return state.currentRecipe;
      } else {
        return null;
      }
    },
    getRecipeIngridients: (state) => state.recipeIngridients as RecipeIngridient[],
    getRecipeById: (state) => {
      return (id: number) => {
        const index = state.recipes.findIndex((recipe: Recipe) => recipe.id === id);
        return index === -1 ? undefined : state.recipes[index];
      };
    },
  },
  actions: {
    async loadRecipes() {
      try {
        const url = '/recipes';
        const { data } = await api.get(url);
        this.recipes = data.data;
        // this.users = this.users.map((user) => {
        //     user.roleName = user.roles?.map((o) => o.name).join(", ");
        //     return user;
        // });
      } catch (err) {
        console.log((err as AxiosError).message);
      }
    },

    async loadRecipeById(id) {
      try {
        const res = (await recipes.getById(id)).data;
        if (res.data) {
          this.currentRecipe = res.data;
        }
      } catch (err) {
        console.log((err as AxiosError).message);
      }
    },

    async createRecipe(data: Recipe) {
      await recipes.create(data).then(() => {
        console.log('Новый рецепт добавлен');
      });
      await this.loadRecipes();
    },

    async uploadRecipeImage(data: File) {
      try {
        const res = (await recipes.uploadImage(data))?.data;
        return res;
      } catch (e) {
        throw new Error(e.message);
      }
    },

    async updateRecipe(id: number, data: FormData) {
      await recipes.update(id, data);
      // await this.loadRecipes();
    },
    async deleteRecipe(id: number) {
      await api.delete('/recipes/' + id).then(() => {
        console.log('Рецепт удален');
      });
      await this.loadRecipes();
    },
  },
});
