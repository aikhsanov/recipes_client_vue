import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/api/api';
import recipes from '@/api/recipes';
import { Recipe, RecipeFavData } from '@/types/recipes';
import { RecipeIngridient } from '@/types/ingridients';
import useToaster from '@/composables/useToaster';
import ingridients from '@/api/ingridients';
import { useAuthStore } from '@/stores/auth';

export const useRecipesStore = defineStore({
  id: 'recipes',
  state: () => ({
    recipes: [] as Recipe[],
    latestRecipes: [] as Recipe[],
    recipesByIngridient: [] as RecipeIngridient,
    favoriteRecipes: [] as Recipe,
    currentRecipe: {} as Recipe,
    inFavorites: false as Boolean,
    meta: {},
  }),
  getters: {
    getRecipes: (state) => state.recipes as Recipe[],
    getLatestRecipes: (state) => state.latestRecipes as Recipe[],
    getDataMeta: (state) => state.meta,
    getCurrentRecipe: (state) => {
      if (Object.keys(state.currentRecipe as Recipe).length) {
        return state.currentRecipe;
      } else {
        return null;
      }
    },
    getRecipeByIngridients: (state) => state.recipesByIngridient as RecipeIngridient[],
    getInFavorites: (state) => state.inFavorites,
    getFavoriteRecipes: (state) => state.favoriteRecipes,
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

    async loadRecipesToApprove(page = 1) {
      try {
        const res = (
          await recipes.getAllFiltered(
            { filters: { status: 'EQ(new)' } },
            { params: { limit: 20, page } }
          )
        ).data;
        this.recipes = res.data;
        this.meta = res._meta;
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },

    async loadLatestRecipes() {
      try {
        const config = { params: { order: { createdAt: 'desc' }, limit: 5 } };
        const res = (await recipes.getAll(config)).data;
        this.latestRecipes = res.data;
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },
    async searchRecipes(val: string, config: {}, infinite: boolean = false) {
      try {
        const res = (await recipes.getAllByTitle({ filters: { title: `LIKE(${val})` } }, config))
          .data;
        this.recipes = infinite ? [...this.recipes, ...res.data] : res?.data;
        this.meta = res._meta;
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

    async loadUserRecipes(id?: number, config?: any, infinite = false) {
      try {
        const auth = useAuthStore();
        const res = (await recipes.getAllByUser(id || auth.getMe.id, config)).data;
        if (res.data) {
          this.recipes = infinite ? [...this.recipes, ...res.data] : res.data;
          this.meta = res._meta;
        }
      } catch (err) {
        console.log((err as AxiosError)?.message || err);
      }
    },

    async loadRecipesByCategory(id, config: {}, infinite: boolean = false) {
      try {
        const res = (await recipes.getAllRecipesByCategory(id, config)).data;
        this.recipes = infinite ? [...this.recipes, ...res.data] : res?.data;
        this.meta = res._meta;
        if (res.data) {
          this.recipes = res.data;
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

    async loadFavoriteRecipe(data: RecipeFavData) {
      try {
        this.inFavorites = !!(await recipes.getFavoriteRecipe(data)).data?.data;
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
    },

    async loadFavorites() {
      try {
        const auth = useAuthStore();
        this.favoriteRecipes = (
          await recipes.getAllFavoriteRecipes({ userId: auth.getMe.id })
        ).data?.data;
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
    },

    async addToFavorites(data: RecipeFavData) {
      try {
        await recipes.addFavorites(data);
        await this.loadFavoriteRecipe(data);
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
    },
    async addComment(id: number, data: RecipeFavData) {
      try {
        await recipes.addComment(id, data);

        await this.loadRecipeById(this.currentRecipe.id);
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
    },

    async addToLikes(data: RecipeFavData) {
      try {
        const updatedData = (await recipes.addLikes(data))?.data?.data;
        if (Object.keys(this.currentRecipe).length) {
          await this.loadRecipeById(this.currentRecipe.id);
        }
        return updatedData?.likes;
      } catch (e) {
        throw new Error((e as AxiosError)?.message || e);
      }
    },

    async deleteRecipe(id: number) {
      await recipes.delete(id);
    },

    clearState() {
      this.recipes = [];
      this.latestRecipes = [];
      this.recipesByIngridient = [];
      this.favoriteRecipes = [];
      this.currentRecipe = {};
      this.inFavorites = false;
      this.meta = {};
    },
  },
});
