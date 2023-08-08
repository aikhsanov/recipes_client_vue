<template>
  <div class="relative mb-8">
    <input
      v-model="value"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :id="props.name"
      :class="`peer w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 ${props.customInputClass}`"
    />
    <label
      v-if="props.label"
      :for="props.name"
      :class="`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${props.customLabelClass}`"
    >
      {{ props.label }}</label
    >
    <span
      v-if="errorMessage && meta.touched"
      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
});
</script>
<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue';
import type { Ref } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
  modelValue?: string | number | object;
  label?: string;
  placeholder?: string;
  customInputClass?: string;
  customLabelClass?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

// onMounted(() => {
//   if (props.modelValue) value.value = props.modelValue;
// });

// const model = computed({
//   get() {
//     return value?.value;
//   },
//   set(newVal) {
//     console.log(newVal, 'newVal');
//     value.value = newVal;
//     if (newVal !== props.modelValue) {
//       emits('update:modelValue', newVal);
//     }
//   },
// });

const { errorMessage, value, meta } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>

<style scoped></style>
