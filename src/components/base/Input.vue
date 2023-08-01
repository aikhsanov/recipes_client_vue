<template>
  <div class="relative mb-8">
    <input
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :id="uid"
      @input="emit('update:modelValue', $event?.target?.value)"
      class="peer w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600"
    />
    <label
      v-if="props.label"
      :for="uid"
      class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
    >
      {{ props.label }}</label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
});
</script>
<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import type { Ref } from 'vue';

interface Props {
  modelValue?: string | number | object;
  label?: string;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  modelValue: null,
});

const emit = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

const uid: Ref<string | number> = ref(uuidv4());
</script>

<style scoped></style>
