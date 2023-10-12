<template>
  <MainSearchInput :route="recipesApi" :filters="{ userId: `EQ(${auth.getMe.id})` }" />
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
    <RecipeCard
      v-for="recipe in recipes.getRecipes"
      :to="`/recipes/edit/${recipe.id}`"
      :entry="recipe"
      :key="recipe.title"
    />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '@/components/recipe/RecipeCard.vue';
import { onMounted } from 'vue';
import { useRecipesStore } from '@/stores/recipes';
import MainSearchInput from '@/components/base/MainSearchInput.vue';
import recipesApi from '@/api/recipes';
import { useAuthStore } from '@/stores/auth';

const recipes = useRecipesStore();
const auth = useAuthStore();

onMounted(async () => {
  await recipes.loadUserRecipes();
});
</script>

<style scoped></style>
