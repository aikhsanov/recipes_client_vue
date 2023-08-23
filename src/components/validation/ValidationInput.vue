<template>
  <div class="relative mb-8">
    <template v-if="props.type !== 'textarea'"
      ><input
        v-model.trim="value"
        :type="props.type"
        :placeholder="props.placeholder"
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
         peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-light-slate-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 ${props.customInputClass}`"
      />
      <label
        v-if="props.label"
        :for="props.name"
        :class="`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none  font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[16px] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-light-slate-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-light-slate-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500
          ${props.customLabelClass}`"
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
