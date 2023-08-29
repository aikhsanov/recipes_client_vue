<template>
  <button
    v-if="props.type !== 'link'"
    :class="`mr-2 my-2 cursor-pointer rounded-sm bg-light-slate-gray-900 hover:bg-light-slate-gray-800 min-w-28 w-auto h-11 shadow-md ${
      props.class || 'px-5 py-1 text-white'
    } `"
  >
    {{ props.text }}
  </button>
  <router-link
    v-else
    :to="props.to"
    :class="`mr-2 my-2 cursor-pointer rounded-sm bg-light-slate-gray-900 hover:bg-light-slate-gray-800 min-w-28 w-auto h-11 shadow-md ${
      props.class || 'px-5 py-1 text-white '
    }`"
    >{{ props.text }}</router-link
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
});
</script>
<script setup lang="ts">
interface BaseButtonProps {
  class?: string;
  type?: string;
  text?: string;
  to?: string | object;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: '',
  text: 'text',
});
</script>

<style scoped></style>
