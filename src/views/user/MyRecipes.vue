<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
    <RecipeCard
      v-for="recipe in recipes.getRecipes"
      :to="`/recipes/${recipe.id}`"
      :entry="recipe"
      :key="recipe.title"
    />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '@/components/recipe/RecipeCard.vue';
import { computed, onMounted } from 'vue';
import { useRecipesStore } from '@/stores/recipes';
import recipesApi from '@/api/recipes';
import { useAuthStore } from '@/stores/auth';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';
import { onBeforeRouteLeave } from 'vue-router';

const recipes = useRecipesStore();
const auth = useAuthStore();
const scrollStore = useInfiniteScrollStore();

const mainSearchFilter = computed<number | string>(() => ({
  userId: `EQ(${auth.getMe.id})`,
}));

async function loadRecipes(page = 1) {
  await recipes.loadUserRecipes(null, { params: { limit: 20, page } }, true);
}
scrollStore.setScrollFetchFn(loadRecipes);

onMounted(async () => {
  await loadRecipes();
  scrollStore.setPageMeta(recipes.getDataMeta);
});

onBeforeRouteLeave(() => {
  scrollStore.clearState();
  recipes.clearState();
});
</script>

<style scoped></style>
