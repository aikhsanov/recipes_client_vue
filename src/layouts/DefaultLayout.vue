<template>
  <Header />
  <div class="container mx-auto min-h-screen py-4">
    <main>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col w-full">
          <RecipesSearchInput />
          <slot />
        </div>
        <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ" v-if="route.meta.aside">
          <slot name="aside">
            <ul v-if="menu.getMenu.length">
              <li v-for="item in menu.getMenu" :key="item.id">
                <ul v-if="item?.children && item?.children?.length">
                  <li v-for="child in item.children" :key="child.id">
                    <router-link :to="child?.path">{{ child?.name }}</router-link>
                  </li>
                </ul>
                <router-link v-else :to="item?.path">{{ item?.name }}</router-link>
              </li>
            </ul>
          </slot>
        </aside>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/base/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import RecipesSearchInput from '@/components/base/RecipesSearchInput.vue';
import { useMenuStore } from '@/stores/menu';
import { onMounted } from 'vue';

const route = useRoute();

const router = useRouter();
const menu = useMenuStore();
await menu.formMenu();
console.log(route, 'ROUTE');
</script>

<style scoped></style>
