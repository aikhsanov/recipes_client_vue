<template>
  <button v-if="props.type !== 'link'" :type="props.type" :class="buttonMode">
    <span class="font-semibold text-white text-sm" v-if="props.text">{{ props.text }}</span>
    <slot name="icn"></slot>
  </button>
  <router-link
    v-else
    :to="props.to"
    :class="`cursor-pointer rounded-sm bg-light-slate-gray-900 hover:bg-light-slate-gray-800 min-w-28 h-11 shadow-md ${
      props.class || 'px-5 py-1 text-white w-auto'
    }`"
  >
    <span class="font-semibold text-white text-sm" v-if="props.text">{{ props.text }}</span>
    <slot name="icn"></slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
});
</script>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  class?: string;
  type?: string;
  text?: string;
  to?: string | object;
  mode?: string;
}>();

const buttonMode = computed(() => {
  const btnClass =
    'cursor-pointer px-5 py-1 w-auto text-white min-w-28  h-11 shadow-md flex items-center justify-center';
  let bg = 'bg-light-slate-gray-900 hover:bg-light-slate-gray-800';
  if (props.mode === 'danger') {
    bg = 'bg-tomato-900 hover:bg-tomato-800';
  }
  if (props.mode === 'confirm') {
    bg = 'bg-blue-400 hover:bg-blue-300';
  }
  return `${btnClass} ${bg} ${props?.class || ''}`;
});
</script>

<style scoped></style>
