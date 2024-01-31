<template>
  <aside
    class="w-2/12 min-h-screen py-4 border-l border-l-gray-200 bg-zinc-800"
    v-if="route.meta.aside"
  >
    <!--    <h3 class="font-bold text-lg mb-2">Рубрики рецептов</h3>-->
    <slot name="aside">
      <router-link to="/" class="flex pb-5 mb-7 text-center items-center justify-center">
        <h1 class="text-4xl text-gray-500 text-orange-300">Едим Вкусно</h1>
      </router-link>
      <ul v-if="menu.getMenu.length">
        <li
          v-for="item in menu.getMenu"
          :key="item.id"
          class="
            mb-1
            hover:bg-zinc-700
            px-4
            py-2
            flex
            items-center
            text-center text-white
            w-full
            menu-item
            text-xl
          "
        >
          <template v-if="item?.children && item?.children?.length">
            <BaseAccordion :title="item?.name.toUpperCase()" noArrow>
              <template #content>
                <ul class="">
                  <li
                    v-for="child in item.children"
                    :key="child.id"
                    class="py-2 hover:bg-zinc-600 -mx-4 text-base"
                  >
                    <router-link class="font-semibold w-full text-white" :to="child?.path"
                      >{{ child?.name?.toUpperCase() }}
                    </router-link>
                  </li>
                </ul>
              </template>
            </BaseAccordion>
          </template>
          <router-link v-else class="font-bold text-white w-full" :to="item?.path"
            >{{ item?.name.toUpperCase() }}
          </router-link>
        </li>
      </ul>
    </slot>
  </aside>
</template>

<script setup lang="ts">
import BaseAccordion from '@/components/base/BaseAccordion.vue';
import { useRoute } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
const route = useRoute();
const menu = useMenuStore();
</script>

<style scoped lang="scss">
h1 {
  font-family: Pacifico;
}
.menu-item {
  position: relative;
  font-family: Bahnschrift;
  &:after {
    content: '';
    opacity: 0;
    background: #fdba74;
    position: absolute;
    right: 0;
    top: 0;
    width: 7px;
    height: 100%;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
}
</style>
