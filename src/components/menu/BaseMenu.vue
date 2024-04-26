<template>
  <div class="relative">
    <ul v-if="menu?.getMenu?.length" :class="listClass">
      <li
        v-for="item in menu?.getMenu"
        :key="item?.id"
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
          <BaseAccordion :title="item?.name?.toUpperCase()" noArrow>
            <template #content>
              <ul class="">
                <li
                  v-for="child in item?.children"
                  :key="child?.id"
                  class="hover:bg-zinc-600 -mx-4 text-base"
                >
                  <router-link
                    class="font-semibold w-full text-white py-2 block"
                    :to="child?.path"
                    :key="child.id"
                    >{{ child?.name?.toUpperCase() }}
                  </router-link>
                </li>
              </ul>
            </template>
          </BaseAccordion>
        </template>
        <router-link v-else class="font-bold text-white w-full" :to="item?.path"
          >{{ item?.name?.toUpperCase() }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseAccordion from '@/components/base/BaseAccordion.vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menu';
import { ref } from 'vue';

const props = defineProps<{
  listClass?: string;
}>();

const route = useRoute();
const router = useRouter();
const menu = useMenuStore();

await menu.formMenu();
</script>

<style scoped lang="scss">
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
