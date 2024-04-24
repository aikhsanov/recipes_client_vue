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
import moment from 'moment';

const recipes = useRecipesStore();
const route = useRoute();
const menu = useMenuStore();
const filterName = computed<string>(() => route?.params?.filter);
let filters;

const scrollStore = useInfiniteScrollStore();
scrollStore.setScrollFetchFn(loadRecipes);

async function loadRecipes(page = 1) {
  console.log(filterName.value);
  if (filterName.value === 'today') {
    // const date1 = `${moment().format('YYYY-MM-DD')} 00:00:00`;
    // const date2 = `${moment().format('YYYY-MM-DD')} 23:59:59`;
    const date1 = `${moment('2024-04-22 00:00:00').format('YYYY-MM-DD HH:mm:ss')}`;
    const date2 = `${moment('2024-04-24 23:59:59').format('YYYY-MM-DD HH:mm:ss')}`;
    filters = { createdAt: `BETWEEN(${date1}, ${date2})` };
  }
  await recipes.loadRecipesByFilter({ page, filters });
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
