<template>
  <div class="flex flex-col font-bold w-full cursor-pointer" tabindex="2" @click="toggle">
    <div
      class="flex items-center w-full transition-all"
      :class="[noArrow ? 'justify-center' : 'justify-between', show ? 'mb-2' : '', wrapperClass]"
    >
      <span class="text-white">{{ title }}</span>
      <IconBase
        v-if="!noArrow"
        iconColor="black"
        strokeColor="black"
        :class="show ? 'rotate-180 duration-500' : 'transition-all duration-500'"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        ><IconChevronDown
      /></IconBase>
    </div>
    <div
      :class="
        show
          ? 'visible max-h-screen opacity-100 duration-500'
          : 'invisible h-auto max-h-0 items-center opacity-0 transition-all'
      "
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBase from '@/components/icons/IconBase.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import { ref } from 'vue';

const props = defineProps<{
  title?: string;
  noArrow?: boolean;
  wrapperClass?: string;
}>();
const show = ref(false);

function toggle() {
  show.value = !show.value;
}
</script>

<style scoped></style>
