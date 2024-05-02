<template>
  <div
    class="w-full min-h-[100px] max-h-[500px] py-4 border-l border-l-gray-200 bg-zinc-800 relative"
  >
    <slot name="header-menu">
      <div>
        <div
          id="toggleMenu"
          :class="`grid place-content-center w-20 h-20 p-3 mx-auto absolute -top-0 right-0 ${
            isOpen ? 'hamburger-toggle' : ''
          }`"
          @click="toggleMenu"
        >
          <div
            :class="`w-8
          h-1
          bg-white
          rounded-full
          transition-all
          duration-150
          before:content-['']
          before:absolute
          before:w-8
          before:h-1
          before:bg-white
          before:rounded-full
          before:-translate-y-2.5
          before:transition-all
          before:duration-150
          after:content-['']
          after:absolute
          after:w-8
          after:h-1
          after:bg-white
          after:rounded-full
          after:translate-y-2.5
          after:transition-all
          after:duration-150`"
          ></div>
        </div>
        <MenuLogo />
        <transition-group
          enter-active-class="duration-700 ease-in-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[100vh] opacity-100"
          leave-active-class="duration-500 ease-in-out"
          leave-from-class="max-h-[100vh] opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <RecipesSearchInput
            wrapperClass="w-11/12 mb-3 md:hidden header-recipe-search mx-auto pr-3"
            iconColor="white"
            noToggleSearch
            show-search
            v-show="isOpen"
            :key="isOpen"
          />
          <BaseMenu list-class="flex flex-col items-start" v-show="isOpen" :key="2" />
        </transition-group>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BaseMenu from '@/components/menu/BaseMenu.vue';
import RecipesSearchInput from '@/components/base/RecipesSearchInput.vue';
import { ref } from 'vue';
import MenuLogo from '@/components/menu/MenuLogo.vue';
const isOpen = ref(false);
function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>
<style scoped lang="scss"></style>
