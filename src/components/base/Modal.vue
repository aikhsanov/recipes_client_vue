<template>
  <div class="w-1/2 border-blue-950 border-2 min-h-[calc(50vh)]" v-if="isOpen">
    <slot>
      <h4>Это контент модалки ахахахахахаха</h4>
    </slot>
  </div>
  <slot name="activator" :toggle="toggleOpen"></slot>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref<boolean>(false);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped></style>
