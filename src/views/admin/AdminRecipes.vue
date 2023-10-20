<template>
  <table class="table-auto min-w-full text-left text-sm font-light">
    <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
      <tr>
        <th scope="col" class="px-6 py-4">#</th>
        <th scope="col" class="px-6 py-4">Название</th>
        <th scope="col" class="px-6 py-4">Статус</th>
        <th scope="col" class="px-6 py-4">В категориях</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(recipe, ind) in recipes.getRecipes"
        :key="recipe.id"
        :class="`border-b ${
          ind % 2 === 0 ? 'bg-neutral-100' : 'bg-white'
        } dark:border-neutral-500 dark:bg-neutral-700`"
      >
        <td class="whitespace-nowrap px-6 py-4">{{ recipe.id }}</td>
        <td class="whitespace-nowrap px-6 py-4">{{ recipe.title }}</td>
        <td class="whitespace-nowrap px-6 py-4">{{ recipe?.status }}</td>
        <td class="whitespace-nowrap px-6 py-4">{{ recipe?.category_id }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination :page-meta="{ pages: 45, currentPage: 9 }" />
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import { onMounted } from 'vue';
import Pagination from '@/components/base/Pagination.vue';

const recipes = useRecipesStore();

onMounted(async () => {
  await recipes.loadRecipesToApprove();
});
</script>

<style scoped></style>
