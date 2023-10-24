<template>
  <TableComponent
    :columns="columns"
    :rows="recipes.getRecipes"
    :on-click-fn="redirectToRecipe"
    :page-meta="recipes.getDataMeta"
    :fetch-fn="recipes.loadRecipesToApprove"
  />
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import { onMounted } from 'vue';
import TableComponent from '@/components/base/TableComponent.vue';
import { useRouter } from 'vue-router';

const recipes = useRecipesStore();
const router = useRouter();

onMounted(async () => {
  await recipes.loadRecipesToApprove();
});

const redirectToRecipe = (id: number | string): void => {
  router.push(`/admin-panel/recipes/preview/${id}`);
};

const columns: { name: string; value: string }[] = [
  { name: '#', value: 'id' },
  { name: 'Название', value: 'title' },
  { name: 'Статус', value: 'status' },
  { name: 'Категории', value: 'category_id' },
];
</script>

<style scoped></style>
