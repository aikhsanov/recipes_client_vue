<template>
  <div class="w-full flex flex-row">
    <div class="min-h-screen xl:w-10/12 xs:w-full">
      <HeaderMenu class="md:block xl:hidden mb-5" />
      <Header />
      <main class="xs:px-2 sm:px-5 lg:px-10 py-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col w-full">
            <slot />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
    <SideMenu class="xs:hidden xl:block" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import HeaderMenu from '@/components/menu/HeaderMenu.vue';
import { useRoute, useRouter } from 'vue-router';
import RecipesSearchInput from '@/components/base/RecipesSearchInput.vue';
import { useMenuStore } from '@/stores/menu';
import { onMounted } from 'vue';
import SideMenu from '@/components/menu/SideMenu.vue';

const route = useRoute();

const router = useRouter();

console.log(route, 'ROUTE');
</script>

<style scoped></style>
