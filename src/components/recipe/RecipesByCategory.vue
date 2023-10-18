<template>
  <h3 class="text-gray-600 text-2xl font-medium">Результаты поиска</h3>
  <RecipesGrid :recipes="recipes.getRecipes" />
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import RecipesGrid from '@/components/recipe/RecipesGrid.vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';

const recipes = useRecipesStore();
const route = useRoute();
const id = computed<string>(() => route?.params?.id);

const scrollStore = useInfiniteScrollStore();
scrollStore.setScrollFetchFn(loadRecipes);

async function loadRecipes(page = 1) {
  await recipes.loadRecipesByCategory(id.value, { params: { limit: 20, page } }, true);
}

onMounted(async () => {
  await loadRecipes(1);
  scrollStore.setPageMeta({ ...recipes.getDataMeta });
});

onBeforeRouteLeave(() => {
  scrollStore.clearState();
  recipes.clearState();
});
</script>

<style scoped></style>
