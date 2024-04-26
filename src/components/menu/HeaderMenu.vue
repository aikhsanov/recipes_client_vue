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
            :class="`w-10
          h-2
          bg-white
          rounded-full
          transition-all
          duration-150
          before:content-['']
          before:absolute
          before:w-10
          before:h-2
          before:bg-white
          before:rounded-full
          before:-translate-y-4
          before:transition-all
          before:duration-150
          after:content-['']
          after:absolute
          after:w-10
          after:h-2
          after:bg-white
          after:rounded-full
          after:translate-y-4
          after:transition-all
          after:duration-150`"
          ></div>
        </div>
        <MenuLogo />
        <transition
          enter-active-class="duration-700 ease-in-out"
          enter-from-class="max-h-0"
          enter-to-class="max-h-[100vh]"
          leave-active-class="duration-500 ease-in-out"
          leave-from-class="max-h-[100vh]"
          leave-to-class="max-h-0"
        >
          <BaseMenu list-class="flex flex-col items-start" v-show="isOpen" />
        </transition>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BaseMenu from '@/components/menu/BaseMenu.vue';
import { ref } from 'vue';
import MenuLogo from '@/components/menu/MenuLogo.vue';
const isOpen = ref(false);
function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>
<style scoped lang="scss"></style>
