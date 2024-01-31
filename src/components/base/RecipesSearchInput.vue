<template>
  <Select
    placeholder="Поиск рецептов"
    :class="wrapperClass ? wrapperClass : `w-full`"
    searchable
    :noInitSearch="true"
    :searchFn="mainSearchFn"
    @select="redirectToRecipe"
    @keydown.enter="onMainSearch"
  ></Select>
</template>

<script setup lang="ts">
import recipes from '@/api/recipes';
import Select from '@/components/base/Select.vue';
import { useRoute, useRouter } from 'vue-router';
import searchFn from '@/helpers/searchFn';
import recipesApi from '@/api/recipes';

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  apiMethod?: string;
  wrapperClass?: string;
  route?: {};
  filters?: {};
}>();

async function onMainSearch(e) {
  await router.push(`/recipes/search?text=${e.target.value}`);
}
async function redirectToRecipe(e) {
  await router.push(`/recipes/${e}`);
}

const mainSearchFn = (val) =>
  searchFn({
    val,
    route: recipesApi,
    apiMethod: props.apiMethod,
    filters: { title: `LIKE(${val})`, ...props.filters },
  });
</script>

<style scoped></style>
