<template>
  <TableComponent
    :columns="columns"
    :rows="recipes.getRecipes"
    :on-click-fn="redirectToRecipe"
    :page-meta="recipes.getDataMeta"
    :fetch-fn="recipes.loadRecipesToApprove"
    :onEdit="onEdit"
    :onDelete="onDelete"
  />
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import { onMounted } from 'vue';
import TableComponent from '@/components/base/TableComponent.vue';
import { useRouter } from 'vue-router';
import useToaster from '@/composables/useToaster';
import useModal from '@/composables/useModal';
import { toasts } from '@/composables/useToaster';

const recipes = useRecipesStore();
const router = useRouter();
const { confirm } = useModal();

onMounted(async () => {
  await recipes.loadRecipesToApprove();
});

const redirectToRecipe = (id: number | string): void => {
  router.push(`/admin-panel/recipes/preview/${id}`);
};
const onEdit = async (id: number | string): Promise<void> => {
  try {
    redirectToRecipe(id);
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
};

const onDelete = async (id: number | string): Promise<void> => {
  try {
    const conf = await confirm();
    if (conf) {
      const res = await recipes.deleteRecipe(id);
      toasts.success();
    }
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
};

const columns: { name: string; value: string }[] = [
  { name: '#', value: 'id' },
  { name: 'Название', value: 'title' },
  { name: 'Статус', value: 'status' },
  { name: 'Категории', value: 'category_id' },
];
</script>

<style scoped></style>
