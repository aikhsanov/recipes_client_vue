<template>
  <div class="relative mb-8">
    <Multiselect
      v-model="value"
      :id="props.name"
      :mode="props.mode"
      :close-on-select="props.closeOnSelect"
      :searchable="props.searchable"
      :create-option="props.createOption"
      :disabled="props.disabled"
      :trackBy="props.trackBy"
      :placeholder="props.placeholder"
      :inputType="props.inputType"
      :searchFilter="props.searchFilter"
      :openDirection="props.openDirection"
      :noResultsText="props.noResultsText"
      :noOptionsText="props.noOptionsText"
      :options="props.options"
      :class="`${customClass || ''}`"
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
import { computed, onMounted, ref, toRef } from 'vue';
import type { Ref } from 'vue';
import Multiselect from '@vueform/multiselect';
import { useField } from 'vee-validate';

const props = defineProps<{
  modelValue?: string | number | object;
  label?: string;
  mode?: string;
  name?: string;
  customClass?: string;
  customLabelClass?: string;
  searchable?: boolean;
  options?: [];
  createOption?: boolean;
  closeOnSelect?: boolean;
  disabled?: boolean;
  trackBy?: string;
  placeholder?: string;
  inputType?: string;
  searchFilter?: Function;
  openDirection?: string;
  noResultsText?: string;
  noOptionsText?: string;
}>();

const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

const { errorMessage, value, meta } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>

<style scoped></style>
