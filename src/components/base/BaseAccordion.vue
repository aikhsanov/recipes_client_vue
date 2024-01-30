<template>
  <div class="group flex flex-col gap-2 font-bold" tabindex="2" @click="toggle">
    <div class="flex cursor-pointer items-center justify-between">
      <span>{{ title }}</span>
      <IconBase
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
          ? 'visible max-h-screen opacity-100 duration-1000'
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
}>();
const show = ref(false);

function toggle() {
  show.value = !show.value;
}
</script>

<style scoped></style>
