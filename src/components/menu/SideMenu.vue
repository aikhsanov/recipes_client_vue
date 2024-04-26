<template>
  <aside class="w-2/12 min-h-screen py-4 border-l border-l-gray-200 bg-zinc-800">
    <!--    <h3 class="font-bold text-lg mb-2">Рубрики рецептов</h3>-->
    <slot name="aside"
      ><div>
        <MenuLogo />
        <BaseMenu />
      </div>
    </slot>
  </aside>
</template>

<script setup lang="ts">
import BaseMenu from '@/components/menu/BaseMenu.vue';
import MenuLogo from '@/components/menu/MenuLogo.vue';
</script>
<style scoped lang="scss"></style>
