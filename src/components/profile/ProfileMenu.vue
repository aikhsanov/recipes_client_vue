<template>
  <BaseDropdown :dropdownItems="menu" links />
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/base/BaseDropdown.vue';

const menu = [
  { text: 'Настройки', to: '/settings', type: 'link', icon: 'icn icn-settings' },
  { text: 'Выйти', action: () => console.log('logout'), type: 'button' },
];
</script>

<style scoped></style>
