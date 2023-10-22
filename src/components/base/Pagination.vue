<template>
  <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
    <div class="lg:w-3/5 w-full flex items-center justify-between">
      <div
        class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
        @click="loadPreviousPage"
      >
        <IconBase width="14" height="8" view-box="0 0 14 8"><IconArrowLeft /></IconBase>
        <p class="text-sm ml-3 font-medium leading-none">Назад</p>
      </div>
      <div class="sm:flex hidden">
        <p
          v-for="page in pageCount"
          :class="`text-sm

            leading-none
            cursor-pointer
            text-gray-600
            hover:text-indigo-700
            border-t border-transparent
            hover:border-indigo-400
            pt-3
            mr-4
            px-2
            ${page == pageMeta?.currentPage ? 'font-bold' : 'font-medium'}
            `"
          @click="loadPageData(page)"
        >
          {{ page }}
        </p>
      </div>
      <div
        class="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
        @click="loadNextPage"
      >
        <p class="text-sm font-medium leading-none mr-3">Далее</p>
        <IconBase width="14" height="8" view-box="0 0 14 8"><IconArrowRight /></IconBase>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconBase from '@/components/icons/IconBase.vue';

const limit = 7;
const startModifier = 3;
const endModifier = 4;

const router = useRouter();

const props = defineProps<{
  pageMeta: [] | {};
  fetchFn: Function;
}>();

onMounted(() => {
  router.push({ query: { page: 1 } });
});

const pageCount = computed(() => {
  if (props.pageMeta.pages <= 10) {
    return props.pageMeta.pages;
  }
  let startPage =
    props.pageMeta.currentPage > limit ? props.pageMeta.currentPage - startModifier : 1;
  let endPage =
    props.pageMeta.currentPage > limit ? props.pageMeta.currentPage + endModifier : limit;
  const pages = [];
  for (let i = startPage; i <= props.pageMeta.pages; i++) {
    if (i <= endPage) {
      pages.push(i);
    }
    if (i === endPage + 1) {
      pages.push('...');
    }
    if (i > props.pageMeta.pages - 2) {
      pages.push(i);
    }
  }
  return pages;
});

async function loadPageData(page): Promise<void> {
  if (!isNaN(parseInt(page))) {
    router.push({ query: { page: page } });
    await props.fetchFn(page);
  }
}
async function loadPreviousPage(): Promise<void> {
  const page = +props.pageMeta.currentPage - 1;
  if (page < 1) return;
  router.push({ query: { page: page } });
  await props.fetchFn(page);
}
async function loadNextPage(): Promise<void> {
  const page = +props.pageMeta.currentPage + 1;
  if (page > props.pageMeta.pages) return;
  router.push({ query: { page: page } });
  await props.fetchFn(page);
}
</script>

<style scoped></style>
