<template>
  <Header />
  <div class="container mx-auto min-h-screen py-4">
    <main>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col w-full">
          <RecipesSearchInput />
          <slot />
        </div>
        <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ p-4" v-if="route.meta.aside">
          <h3 class="font-bold text-lg mb-2">Рубрики рецептов</h3>
          <slot name="aside">
            <ul v-if="menu.getMenu.length">
              <li v-for="item in menu.getMenu" :key="item.id" class="mb-1">
                <template v-if="item?.children && item?.children?.length"
                  ><p class="font-bold">{{ item?.name }}</p>
                  <ul class="ml-3">
                    <li v-for="child in item.children" :key="child.id" class="mb-1">
                      <router-link class="hover:underline" :to="child?.path">{{
                        child?.name
                      }}</router-link>
                    </li>
                  </ul>
                </template>
                <router-link v-else class="font-bold hover:underline" :to="item?.path">{{
                  item?.name
                }}</router-link>
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
