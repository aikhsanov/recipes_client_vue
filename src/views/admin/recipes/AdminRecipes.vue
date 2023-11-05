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

const recipes = useRecipesStore();
const router = useRouter();
const { confirm } = useModal();

onMounted(async () => {
  await recipes.loadRecipesToApprove();
});

const redirectToRecipe = (id: number | string): void => {
  router.push(`/admin-panel/recipes/preview/${id}`);
};
const onEdit = async (id) => {
  try {
    console.log('onEdit');
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
};

const onDelete = async () => {
  try {
    const conf = await confirm();
    console.log(conf, 'CONF');
    // const res = await ingridients.deleteIngridient(values.selectedIngr);
    // console.log(res, 'RES');
    // useToaster(res.message, 'success');
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
