<template>
  <RecipeCard v-for="recipe in recipes.getAllFavoriteRecipes" :entry="recipe" :key="recipe.title" />
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
