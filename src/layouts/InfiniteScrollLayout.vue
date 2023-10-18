<template>
  <Header />
  <main>
    <InfiniteScroll customWrapperClass="w-full overflow-auto">
      <div class="container mx-auto min-h-screen py-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col w-full">
            <RecipesSearchInput />
            <slot />
          </div>
          <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ" v-if="route.meta.aside">
            <slot name="aside" />
          </aside>
        </div>
      </div>
    </InfiniteScroll>
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import RecipesSearchInput from '@/components/base/RecipesSearchInput.vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import { useRecipesStore } from '@/stores/recipes';

import { useInfiniteScrollStore } from '@/stores/infinite_scroll';
import { computed, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const recipes = useRecipesStore();

// onMounted(async () => {
//   if (!auth.getMe) {
//     await auth.fetchCurrentUser();
//   }
// });
</script>

<style scoped></style>
