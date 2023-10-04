<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
    <RecipeCard
      v-for="recipe in recipes.getFavoriteRecipes"
      :entry="recipe?.recipe"
      :key="recipe.recipe.title"
    />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '@/components/recipe/RecipeCard.vue';
import { onMounted } from 'vue';
import { useRecipesStore } from '@/stores/recipes';

const recipes = useRecipesStore();

onMounted(async () => {
  await recipes.loadFavorites();
});
</script>

<style scoped></style>
