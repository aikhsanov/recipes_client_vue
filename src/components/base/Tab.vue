<template>
  <div class="w-full h-full">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<style scoped></style>
