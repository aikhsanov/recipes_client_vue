<template>
  <main>
    <div class="flex flex-col w-full">
      <section class="mt-5">
        <h3 class="text-gray-600 text-2xl font-medium">Результаты поиска</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          <!--          <InfiniteScroll-->
          <!--            customWrapperClass="mt-5 w-full"-->
          <!--            :loadFn="loadSearchedRecipes"-->
          <!--            :pageMeta="recipes.getDataMeta"-->
          <!--            v-if="recipes.getRecipes.length"-->
          <!--          >-->
          <!--      -->
          <!--          </InfiniteScroll>-->
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
  </main>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import RecipeCard from '@/components/recipe/RecipeCard.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

const recipes = useRecipesStore();
const route = useRoute();
const text = computed<string>(() => route.query.text);

// async function loadSearchedRecipes(page = 1) {
//   await recipes.searchRecipes(text.value, { params: { limit: 20, page } });
// }
// onMounted(async () => {
//   await loadSearchedRecipes();
// });
</script>

<style scoped></style>
