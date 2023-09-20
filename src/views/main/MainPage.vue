<template>
  <main>
    <div class="flex flex-col w-full">
      <section class="mt-16">
        <!--          <h3 class="text-gray-600 text-2xl font-medium">Блок 1</h3>-->
        <h3 class="text-gray-600 text-2xl font-medium">Новые рецепты</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          <!--          <div-->
          <!--            class="templ col-span-2 h-80 w-full mx-auto rounded-md shadow-md overflow-hidden"-->
          <!--          ></div>-->
          <!--          <div-->
          <!--            class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"-->
          <!--          ></div>-->
          <!--          <div-->
          <!--            class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"-->
          <!--          ></div>-->
          <!--          <div-->
          <!--            class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"-->
          <!--          ></div>-->
          <!--          <div-->
          <!--            class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"-->
          <!--          ></div>-->

          <router-link
            v-for="(recipe, ind) in recipes.getLatestRecipes"
            :key="recipe.title"
            :to="`/recipes/${recipe.id}`"
            :class="`w-full h-80  mx-auto rounded-md shadow-md overflow-hidden relative ${
              ind !== 0 ? 'max-w-sm' : 'col-span-2 '
            }`"
          >
            <div class="w-full h-full">
              <img :src="recipe.img_url" alt="" class="w-full h-full object-cover" />
              <div
                class="recipe-preview-text w-full absolute bottom-0 p-2 opacity-80 h-2/5 bg-white"
              >
                <h3 class="font-bold mb-2 line-clamp-2">{{ recipe.title }}</h3>
                <p :class="`w-full ${recipe.title.length > 40 ? 'line-clamp-1' : 'line-clamp-2'}`">
                  {{ recipe.short_dsc }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </section>
      <section class="mt-16">
        <h3 class="text-gray-600 text-2xl font-medium">Рецепты с огурцами</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          <router-link
            v-for="(recipe, ind) in recipes.getRecipeByIngridients"
            :key="recipe.title"
            :to="`/recipes/${recipe.id}`"
            class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden relative"
          >
            <div class="w-full h-full">
              <img :src="recipe.img_url" alt="" class="w-full h-full object-cover" />
              <div
                class="recipe-preview-text w-full absolute bottom-0 p-2 opacity-80 h-2/5 bg-white"
              >
                <h3 class="font-bold mb-2 line-clamp-2">{{ recipe.title }}</h3>
                <p :class="`w-full ${recipe.title.length > 75 ? 'line-clamp-1' : 'line-clamp-2'}`">
                  {{ recipe.short_dsc }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';

const auth = useAuthStore();
const recipes = useRecipesStore();
onMounted(async () => {
  await recipes.loadLatestRecipes();
  await recipes.loadRecipeByIngridients(1);
});
</script>

<style scoped></style>
