<template>
  <h3 class="text-center text-3xl font-bold mb-9 mt-0 text-zinc-600">Результаты поиска</h3>
  <RecipesGrid :recipes="recipes?.getRecipes" />
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import RecipesGrid from '@/components/recipe/RecipesGrid.vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';

const recipes = useRecipesStore();
const route = useRoute();
const text = computed<string>(() => route?.query?.text);

const scrollStore = useInfiniteScrollStore();
scrollStore.setScrollFetchFn(loadRecipes);

async function loadRecipes(page = 1, init) {
  await recipes.searchRecipes(text.value, { params: { limit: 20, page } }, true, init);
}

onMounted(async () => {
  await loadRecipes(1, true);
  scrollStore.setPageMeta({ ...recipes.getDataMeta });
});

onBeforeRouteLeave(() => {
  scrollStore.clearState();
  recipes.clearState();
});
</script>

<style scoped></style>
