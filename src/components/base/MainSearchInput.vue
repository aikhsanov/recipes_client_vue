<template>
  <Select
    placeholder="Поиск рецептов"
    class="w-full"
    searchable
    v-if="route.meta.search"
    :noInitSearch="true"
    :searchFn="
      (val, filters) =>
        searchFn({
          val,
          route: recipes,
          apiMethod: 'getAllByTitle',
          filters: filters || { title: `LIKE(${val})` },
        })
    "
    @keydown.enter="onMainSearch"
  ></Select>
</template>

<script setup lang="ts">
import Select from '@/components/base/Select.vue';
import { useRoute, useRouter } from 'vue-router';
import searchFn from '@/helpers/searchFn';

const route = useRoute();
const router = useRouter();

async function onMainSearch(e) {
  await router.push(`/recipes/search?text=${e.target.value}`);
}
</script>

<style scoped></style>
