<template>
  <div
    :class="`recipes-search-wrap recipes-search flex flex-row items-center ${wrapperClass || ''}`"
  >
    <div class="p-3 cursor-pointer hover:scale-110" @click="toggleSearch">
      <IconBase :iconColor="iconColor" viewBox="0 0 16 16" width="20" height="20" stroke-width="0">
        <IconSearch />
      </IconBase>
    </div>
    <div
      :class="`transition-all duration-500 ease-in-out ${
        showSearch ? 'w-full border-b border-1' : 'w-0'
      }`"
    >
      <Select
        :caret="false"
        :customClass="customClass || ''"
        placeholder=""
        searchable
        :noInitSearch="true"
        :searchFn="mainSearchFn"
        :closeOnSelect="true"
        :clearOnSelect="true"
        @select="redirectToRecipe"
        @keydown.enter="onMainSearch"
      ></Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import recipes from '@/api/recipes';
import Select from '@/components/base/Select.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import { useRoute, useRouter } from 'vue-router';
import searchFn from '@/helpers/searchFn';
import recipesApi from '@/api/recipes';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  apiMethod?: string;
  wrapperClass?: string;
  customClass?: string;
  placeholder?: string;
  iconColor?: string;
  showSearch?: boolean;
  noToggleSearch?: boolean;
  route?: {};
  filters?: {};
}>();

async function onMainSearch(e) {
  await router.push(`/recipes/search?text=${e.target.value}`);
}

async function redirectToRecipe(e, select) {
  select.clear();
  await router.push(`/recipes/${e}`);
}

const showSearch = ref(props.showSearch || false);
const search = ref(null);

function toggleSearch() {
  if (props.noToggleSearch) return;
  if (!showSearch.value) {
    document.querySelector('input.multiselect-search')?.focus();
  }
  showSearch.value = !showSearch.value;
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
