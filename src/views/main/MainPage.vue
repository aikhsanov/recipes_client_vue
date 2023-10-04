<template>
  <main>
    <div class="flex flex-col w-full">
      <section class="mt-5">
        <h3 class="text-gray-600 text-2xl font-medium">Новые рецепты</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          <RecipeCard
            v-for="(recipe, ind) in recipes.getLatestRecipes"
            :key="recipe.title"
            :entry="recipe"
            :wrap-class="`w-full h-80  mx-auto rounded-md shadow-md overflow-hidden relative ${
              ind !== 0 ? 'max-w-sm' : 'col-span-2 '
            }`"
          >
          </RecipeCard>
        </div>
      </section>
      <section class="mt-16">
        <h3 class="text-gray-600 text-2xl font-medium">Рецепты с огурцами</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          <RecipeCard
            v-for="recipe in recipes.getRecipeByIngridients"
            :key="recipe.title"
            :entry="recipe"
          >
          </RecipeCard>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';
import RecipeCard from '@/components/recipe/RecipeCard.vue';

const auth = useAuthStore();
const recipes = useRecipesStore();
onMounted(async () => {
  await recipes.loadLatestRecipes();
  await recipes.loadRecipeByIngridients(1);
});
</script>

<style scoped></style>
