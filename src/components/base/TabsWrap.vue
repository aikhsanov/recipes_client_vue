<template>
  <div class="">
    <div class="flex flex-row justify-start items-center my-5 border-b-2 px-5 py-1">
      <span
        :key="ind"
        v-for="(tab, ind) in slotsChildren"
        @click="() => changeIndex(ind)"
        :class="`mr-5 text-md hover:cursor-pointer tab-title ${tabIndex === ind ? 'active' : ''}`"
      >
        {{ tab?.props?.title }}
      </span>
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

<style scoped>
.tab-title {
  position: relative;
}
.tab-title::after {
  content: '';
  position: absolute;
  height: 2px;
  bottom: -5px;
  left: 0;
  width: 100%;
  background: #357ba1;
  opacity: 0;
}
.tab-title:hover::after {
  opacity: 1;
}
.tab-title.active:after {
  opacity: 1;
}
</style>
