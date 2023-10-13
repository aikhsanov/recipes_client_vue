<template>
  <MainSearchInput :route="recipesApi" />
  <div class="flex flex-col w-full">
    <section class="mt-5">
      <h3 class="text-gray-600 text-2xl font-medium">Результаты поиска</h3>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
        <RecipeCard
          v-for="(recipe, ind) in recipes.getRecipes"
          :key="recipe.title"
          :entry="recipe"
          :wrap-class="`w-full h-80  mx-auto rounded-md shadow-md overflow-hidden relative`"
        >
        </RecipeCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import RecipeCard from '@/components/recipe/RecipeCard.vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';
import MainSearchInput from '@/components/base/MainSearchInput.vue';
import recipesApi from '@/api/recipes';

const recipes = useRecipesStore();
const route = useRoute();
const text = computed<string>(() => route?.query?.text);

async function loadSearchedRecipes(page = 1) {
  await recipes.searchRecipes(text.value, { params: { limit: 20, page } }, true);
}

const scrollStore = useInfiniteScrollStore();
scrollStore.setScrollFetchFn(loadSearchedRecipes);

onMounted(async () => {
  await loadSearchedRecipes(1);
  scrollStore.setPageMeta({ ...recipes.getDataMeta });
});

onBeforeRouteLeave(() => {
  scrollStore.clearState();
  recipes.clearState();
});
</script>

<style scoped></style>
