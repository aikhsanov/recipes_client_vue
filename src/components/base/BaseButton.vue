<template>
  <button
    v-if="props.type !== 'link'"
    :class="`mr-2 my-2 rounded-lg px-3 py-2 text-white cursor-pointer ${props.class}`"
  >
    {{ props.text }}
  </button>
  <router-link
    v-else
    :to="props.to"
    :class="`mr-2 my-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 text-sm font-medium text-gray-800 border border-transparent rounded-lg focus:outline-none ${props.class}`"
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
