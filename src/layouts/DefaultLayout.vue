<template>
  <div class="w-full flex flex-row">
    <div class="min-h-screen w-10/12">
      <Header />
      <main class="px-10 py-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col w-full">
            <slot />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
    <SideMenu />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import RecipesSearchInput from '@/components/base/RecipesSearchInput.vue';
import { useMenuStore } from '@/stores/menu';
import { onMounted } from 'vue';
import SideMenu from '@/components/menu/SideMenu.vue';

const route = useRoute();

const router = useRouter();
const menu = useMenuStore();
await menu.formMenu();
console.log(route, 'ROUTE');
</script>

<style scoped></style>
