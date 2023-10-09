<template>
  <main>
    <div class="flex flex-col w-full">
      <section class="mt-5">
        <h3 class="text-gray-600 text-2xl font-medium">Новые рецепты</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          <InfiniteScroll
            customWrapperClass="mt-5"
            :loadFn="loadSearchedRecipes"
            :pageMeta="recipes.getDataMeta"
            v-if="recipes.getRecipes.length"
          >
            <RecipeCard
              v-for="(recipe, ind) in recipes.getRecipes"
              :key="recipe.title"
              :entry="recipe"
              :wrap-class="`w-full h-80  mx-auto rounded-md shadow-md overflow-hidden relative ${
                ind !== 0 ? 'max-w-sm' : 'col-span-2 '
              }`"
            >
            </RecipeCard>
          </InfiniteScroll>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import InfiniteScroll from '@/components/tools/InfiniteScroll';
import RecipeCard from '@/components/recipe/RecipeCard';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const recipes = useRecipesStore();
const route = useRoute();
const text = computed<string>(() => route.query.text);

function loadSearchedRecipes() {
  recipes.searchRecipes(text);
}
</script>

<style scoped></style>
