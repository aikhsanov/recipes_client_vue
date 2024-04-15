<template>
  <div class="w-full flex flex-row">
    <div class="min-h-screen w-10/12">
      <Header />
      <main>
        <InfiniteScroll customWrapperClass="w-full overflow-auto">
          <div class="container mx-auto min-h-screen py-4">
            <div class="flex flex-row justify-between">
              <div class="flex flex-col w-full">
                <slot />
              </div>
            </div>
          </div>
        </InfiniteScroll>
      </main>
      <footer></footer>
    </div>
    <SideMenu />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import SideMenu from '@/components/menu/SideMenu.vue';
import { useRoute, useRouter } from 'vue-router';
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
