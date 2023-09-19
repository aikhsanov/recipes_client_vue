import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/api/api';
import recipes from '@/api/recipes';
import { Recipe } from '@/types/recipes';
import { RecipeIngridient } from '@/types/ingridients';
import useToaster from '@/composables/useToaster';
import ingridients from '@/api/ingridients';

export const useRecipesStore = defineStore({
  id: 'recipes',
  state: () => ({
    recipes: [] as Recipe[],
    latestRecipes: [] as Recipe[],
    recipesByIngridient: [] as RecipeIngridient,
    currentRecipe: {} as Recipe,
  }),
  getters: {
    getRecipes: (state) => state.recipes as Recipe[],
    getLatestRecipes: (state) => state.latestRecipes as Recipe[],
    getCurrentRecipe: (state) => {
      if (Object.keys(state.currentRecipe as Recipe).length) {
        return state.currentRecipe;
      } else {
        return null;
      }
    },
    getRecipeByIngridients: (state) => state.recipesByIngridient as RecipeIngridient[],
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
        const res = (await recipes.getAll()).data;
        this.recipes = res.data;
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },

    async loadLatestRecipes() {
      try {
        const config = { params: { order: { createdAt: 'desc' }, limit: 6 } };
        const res = (await recipes.getAll(config)).data;
        this.latestRecipes = res.data;
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },
    async loadRecipeByIngridients(id?: number, config?: any) {
      try {
        const res = (await ingridients.getRecipesByIngridient(id, config)).data;
        this.recipesByIngridient = res.data;
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },

    async loadRecipeById(id) {
      try {
        const res = (await recipes.getById(id)).data;
        if (res.data) {
          this.currentRecipe = res.data;
        }
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },

    async createRecipe(data: FormData) {
      try {
        await recipes.create(data);
        useToaster('Рецепт добавлен!', 'success');
        await this.loadRecipes();
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
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
      try {
        await recipes.update(id, data);
        useToaster('Изменения сохранены!', 'success');
        await this.loadRecipeById(id);
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
    },

    async deleteRecipe(id: number) {
      await recipes.delete(id);
      await this.loadRecipes();
    },
  },
});
