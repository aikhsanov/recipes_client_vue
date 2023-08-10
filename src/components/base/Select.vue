<template>
  <div class="relative mb-8">
    <Multiselect
      v-model="model"
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
      :clearOnBlur="props.clearOnBlur"
      :options="props.options || selectOptions"
      :class="`${customClass || ''}`"
      @search-change="(val) => onSearch(val)"
      @open="onSearch('', true)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Multiselect from '@vueform/multiselect';

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

const searchedData = ref<[]>([]);
const value = ref<any>(props.modelValue || null);

const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

onMounted(async () => {
  props.searchable ? await searchData('') : null;
});

const model = computed({
  get() {
    return value;
  },
  set(newVal) {
    value.value = newVal;
    if (newVal !== props.modelValue) {
      emits('update:modelValue', newVal);
    }
  },
});

const selectOptions = computed(() =>
  searchedData?.value?.map((e) => ({
    label: e?.name || e?.title,
    value: e?.id || e?.value,
  }))
);

async function onSearch(val: any, open: boolean = false) {
  if (val && !open) {
    const res = (await props.searchFn(val))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
    }
  }
  if (open) {
    const res = (await props.searchFn(val))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
    }
  }
}
</script>

<style scoped></style>
