<template>
  <Header />
  <InfiniteScroll customWrapperClass="h-2/3 w-full overflow-auto">
    <div class="container mx-auto min-h-screen py-4">
      <main>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col w-full">
            <MainSearchInput />
            <slot />
          </div>
          <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ" v-if="route.meta.aside">
            <slot name="aside" />
          </aside>
        </div>
      </main>
    </div>
  </InfiniteScroll>
  <footer></footer>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import MainSearchInput from '@/components/base/MainSearchInput.vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import { useRecipesStore } from '@/stores/recipes';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';
import { computed, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const recipes = useRecipesStore();
const { loadFn, pageMeta } = storeToRefs(useInfiniteScrollStore());

const text = computed<string>(() => route.query.text);

async function loadSearchedRecipes(page = 1) {
  await recipes.searchRecipes(text.value, { params: { limit: 20, page } }, true);
}
onMounted(async () => {
  nextTick(async () => await loadFn());
});

// onMounted(async () => {
//   if (!auth.getMe) {
//     await auth.fetchCurrentUser();
//   }
// });
</script>

<style scoped></style>
