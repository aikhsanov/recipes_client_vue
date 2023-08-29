<template>
  <div class="relative mb-8">
    <template v-if="props.type !== 'textarea'"
      ><input
        v-model.trim="value"
        :type="props.type"
        :placeholder="props.placeholder || ''"
        :disabled="props.disabled"
        :id="props.name"
        :class="`peer h-10 w-full text-gray-900 placeholder-transparent border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-light-slate-gray-900 ${
          props.customInputClass || ''
        }`"
      />

      <label
        v-if="props.label"
        :for="props.name"
        :class="`absolute w-full left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm pointer-events-none ${
          props.customLabelClass || ''
        }`"
      >
        {{ props.label }}</label
      >
    </template>
    <template v-else>
      <textarea
        v-model.trim="value"
        :type="props.type"
        :placeholder="props.placeholder || ''"
        :disabled="props.disabled"
        :id="props.name"
        :class="`
         peer h-56 w-full p-2 text-gray-900 placeholder-transparent rounded-lg border-2 bg-transparent border-gray-300 focus:outline-none resize-none
         focus:border-light-slate-gray-900 ${props.customInputClass || ''}`"
      />
      <label
        v-if="props.label"
        :for="props.name"
        :class="`absolute w-auto left-3 px-0.5 -top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-white pointer-events-none
          ${props.customLabelClass || ''}`"
      >
        {{ props.label }}
      </label>
    </template>
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
import { computed, onMounted, ref, toRef, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useField } from 'vee-validate';
import { useFormStore } from '@/stores/form';

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

const form = useFormStore();
const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

const { name } = toRefs(props);
onMounted(() => {
  // if (props.modelValue) value.value = props.modelValue;
  form.setField({ name: name.value, value: { dirty: meta.dirty } });
});

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

const { errorMessage, value, meta } = useField(name, undefined, {
  syncVModel: true,
});

watch(
  () => meta.dirty,
  (nv, ov) => {
    if (nv !== ov) {
      form.setField({ name: name.value, value: { dirty: meta.dirty } });
    }
  }
);
</script>

<style scoped></style>
