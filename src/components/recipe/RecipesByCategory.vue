<template>
  <h3 class="text-gray-600 text-2xl font-medium" v-if="recipes.getRecipes.length">
    Представлены все рецепты в категории: {{ catName }}
  </h3>
  <h3 class="text-gray-600 text-2xl font-medium" v-else>
    Рецепты в данной категории отсутствуют...
  </h3>
  <RecipesGrid :recipes="recipes.getRecipes" />
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import RecipesGrid from '@/components/recipe/RecipesGrid.vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';
import { useMenuStore } from '@/stores/menu';

const recipes = useRecipesStore();
const route = useRoute();
const menu = useMenuStore();
const id = computed<string>(() => route?.params?.id);
const catName = computed<string>(() => recipes?.getRecipes[0]?.categories[0]?.title);

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
