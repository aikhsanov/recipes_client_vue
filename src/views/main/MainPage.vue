<template>
  <div class="flex flex-col w-full">
    <section class="mt-5" id="trends">
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <RecipeCard
          :entry="recipes.getLatestRecipes[1]"
          :wrap-class="`w-full h-full  mx-auto shadow-md overflow-hidden relative`"
          isTrend
        >
        </RecipeCard>
        <RecipeCard
          :entry="recipes.getLatestRecipes[2]"
          :wrap-class="`w-full h-full  mx-auto shadow-md overflow-hidden relative`"
          isTrend
        >
        </RecipeCard>
      </div>
    </section>
    <section class="mt-2">
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <RecipeCard
          v-for="(recipe, ind) in recipes.getLatestRecipes"
          :key="recipe.title"
          :entry="recipe"
          :wrap-class="`w-full h-80  mx-auto shadow-md overflow-hidden relative`"
        >
        </RecipeCard>
      </div>
    </section>
    <section class="mt-16">
      <h3 class="text-gray-600 text-2xl font-medium">Рецепты с огурцами</h3>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <RecipeCard
          v-for="recipe in recipes.getRecipeByIngridients"
          :key="recipe.title"
          :entry="recipe"
        >
        </RecipeCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';

import RecipeCard from '@/components/recipe/RecipeCard.vue';

import searchFn from '@/helpers/searchFn';

const auth = useAuthStore();
const recipes = useRecipesStore();

onMounted(async () => {
  await recipes.loadLatestRecipes();

  // await recipes.loadRecipeByIngridients(1);
});
</script>

<style scoped></style>
