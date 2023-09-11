<template>
  <div class="relative my-3">
    <Select
      v-model="value"
      :id="props.name"
      :mode="props.mode"
      :close-on-select="props.closeOnSelect"
      :searchable="props.searchable"
      :create-option="props.createOption"
      :multiple="props.multiple"
      :disabled="props.disabled"
      :label="props.label"
      :trackBy="props.trackBy"
      :placeholder="props.placeholder"
      :inputType="props.inputType"
      :searchFilter="props.searchFilter"
      :openDirection="props.openDirection"
      :noResultsText="props.noResultsText"
      :noOptionsText="props.noOptionsText"
      :clearOnBlur="props.clearOnBlur"
      :options="props.options"
      :class="`${customClass || ''}`"
      :searchFn="searchFn"
      @initial="onInitialFetch"
      @update:modelValue="onModelUpdate"
    />
    <span
      v-if="errorMessage && meta.touched"
      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRef, watch } from 'vue';
import Select from '@/components/base/Select.vue';
import { useField } from 'vee-validate';
import { useFormStore } from '@/stores/form';

const props = defineProps<{
  modelValue?: string | number | object;
  label?: string;
  mode?: string;
  name?: string;
  customClass?: string;
  customLabelClass?: string;
  searchable?: boolean;
  clearOnBlur?: boolean;
  options?: [];
  createOption?: boolean;
  closeOnSelect?: boolean;
  disabled?: boolean;
  trackBy?: string;
  placeholder?: string;
  inputType?: string;
  searchFilter?: Function;
  searchFn?: Function;
  openDirection?: string;
  noResultsText?: string;
  noOptionsText?: string;
}>();

const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();
const form = useFormStore();
const initial = ref(false);

onMounted(() => {
  form.setField({ name: props.name, value: { dirty: meta.dirty } });
});

function onInitialFetch(): void {
  initial.value = true;
}
function onModelUpdate(): void {
  if (initial.value) {
    form.setField({ name: props.name, value: { dirty: false } });
    initial.value = false;
    return;
  }
  form.setField({ name: props.name, value: { dirty: meta.dirty } });
}

const { errorMessage, value, meta } = useField(() => props.name, undefined, {
  syncVModel: true,
});
// watch(
//   () => meta.dirty,
//   (nv, ov) => {
//     if (nv !== ov) {
//       console.log(initial.value);
//       if (initial.value) {
//         form.setField({ name: props.name, value: { dirty: false } });
//         initial.value = false;
//         return;
//       }
//       form.setField({ name: props.name, value: { dirty: meta.dirty } });
//     }
//   }
// );
</script>

<style scoped></style>
