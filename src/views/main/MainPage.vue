<template>
  <div class="flex flex-col w-full">
    <section class="mt-2" id="trends" v-if="recipes.getLatestRecipes?.length">
      <h2 class="text-center text-3xl font-bold mb-6 mt-3 text-zinc-600">Тренды</h2>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <RecipeCard
          :entry="recipes.getLatestRecipes[0]"
          :wrap-class="`w-full h-[400px]  mx-auto shadow-md overflow-hidden relative text-center`"
          isTrend
        >
        </RecipeCard>
        <RecipeCard
          :entry="recipes.getLatestRecipes[1]"
          :wrap-class="`w-full h-[400px]  mx-auto shadow-md overflow-hidden relative text-center`"
          isTrend
        >
        </RecipeCard>
      </div>
    </section>
    <section class="mt-2">
      <h2 class="text-center text-3xl font-bold my-6 text-zinc-600 header-separator">Рецепты</h2>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <RecipeCard
          v-for="(recipe, ind) in recipes.getLatestRecipes"
          :key="recipe.title"
          :entry="recipe"
          :wrap-class="`w-full h-[450px]  mx-auto shadow-md overflow-hidden relative`"
        >
        </RecipeCard>
      </div>
    </section>
    <!--    <section class="mt-16">-->
    <!--      <h3 class="text-gray-600 text-2xl font-medium">Рецепты с огурцами</h3>-->
    <!--      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">-->
    <!--        <RecipeCard-->
    <!--          v-for="recipe in recipes.getRecipeByIngridients"-->
    <!--          :key="recipe.title"-->
    <!--          :entry="recipe"-->
    <!--        >-->
    <!--        </RecipeCard>-->
    <!--      </div>-->
    <!--    </section>-->
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

<style scoped lang="scss"></style>
