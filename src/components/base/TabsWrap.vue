<template>
  <div class="">
    <div class="flex flex-row">
      <h2 v-for="(tab, ind) in slotsChildren" @click="() => changeIndex(ind)">
        {{ tab?.props?.title }}
      </h2>
    </div>
    <component :is="slotsChildren?.[tabIndex]" :key="tabIndex" />
  </div>
</template>

<script setup>
import useTabs from '@/composables/useTabs';

const slots = defineSlots();
const slotsChildren = slots.default();
const { tabIndex, changeIndex } = useTabs();
console.log(slotsChildren);
</script>

<style scoped></style>
