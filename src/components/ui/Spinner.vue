<template>
  <div
    :class="`w-16 h-16 block top-1/3 left-1/2 -translate-x-1/2 - translate-y-1/2  ${
      customClass || 'absolute'
    }`"
  >
    <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-tomato-900"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  customClass?: string;
}>();
</script>

<style scoped></style>
