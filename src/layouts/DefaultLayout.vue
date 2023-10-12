<template>
  <Header />
  <div class="container mx-auto min-h-screen py-4">
    <main>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col w-full">
          <slot />
        </div>
        <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ" v-if="route.meta.aside">
          <slot name="aside" />
        </aside>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import MainSearchInput from '@/components/base/MainSearchInput.vue';

const route = useRoute();

const router = useRouter();
// onMounted(async () => {
//   if (!auth.getMe) {
//     await auth.fetchCurrentUser();
//   }
// });
console.log(route, 'ROUTE');
</script>

<style scoped></style>
