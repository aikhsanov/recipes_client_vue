<template>
  <div class="relative">
    <label
      v-if="props.label"
      :for="props.name"
      :class="`text-gray-600 text-md font-semibold
          ${props.customLabelClass || ''}`"
    >
      {{ props.label }}
    </label>
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
      :delay="delay"
      :options="computedOptions || selectOptions"
      :class="`${customClass}`"
      @search-change="debouncedSearch"
      @open="!noInitSearch ? onSearch('', true) : null"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Multiselect from '@vueform/multiselect';
import { watch } from 'vue';
import debounce from 'lodash.debounce';

interface Option {
  label: string;
  value: string | number | object | [];
}

interface DataItem {
  name?: string;
  title?: string;
  id?: string | number;
  description?: string | number;
  value?: string | number | object | [];
}

interface resData {
  data?: object | [];
}

const props = defineProps<{
  modelValue?: string | number | object;
  label?: string;
  mode?: string;
  name?: string;
  customClass?: string;
  customLabelClass?: string;
  searchable?: boolean;
  clearOnBlur?: boolean;
  noInitSearch?: boolean;
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
  delay?: number;
}>();

const searchedData = ref<[]>([]);
const value = ref<any>(props.modelValue || null);

const emits = defineEmits<{
  'update:modelValue': [val: number | string | object];
  initial;
}>();

onMounted(async () => {
  if (props.searchable && !props.noInitSearch) {
    if (props.modelValue) {
      await onSearch(props.modelValue, false, true);
      return;
    }
    await onSearch('', true);
  }
});

const model = computed<number | string | object>({
  get() {
    return value;
  },
  set(newVal: string | number | object) {
    value.value = newVal;
    if (newVal !== props.modelValue) {
      emits('update:modelValue', newVal);
    }
  },
});

const computedOptions = computed<Option[]>(() => {
  if (!props?.options?.length) return null;
  return props.options?.map((e: DataItem) => ({
    label: e?.name || e?.title,
    value: e?.id || e?.value,
  }));
});

const selectOptions = computed<Option[]>(() =>
  searchedData?.value?.map((e: DataItem) => ({
    label: e?.name || e?.title,
    value: e?.id || e?.value,
  }))
);

const debouncedSearch = debounce((val) => onSearch(val), 800);

async function onSearch(val: any, open: boolean = false, initial: boolean = false): Promise<void> {
  if (val && !open && !initial && props?.searchFn) {
    const res: object | [] = (await props?.searchFn(val))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
    }
    return;
  }
  if (val && !open && initial) {
    const filters = {
      id: `EQ(${val})`,
    };
    const res: object | [] = (await props.searchFn(val, filters))?.data;
    emits('initial');
    if (res?.data?.length) {
      searchedData.value = res?.data;
      model.value = res?.data[0].id;
    }

    return;
  }
  if (open && props?.searchFn) {
    const res: object | [] = (await props.searchFn(val))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
    }
  }
}

watch(
  () => props.modelValue,
  (nv, ov) => {
    if (nv !== ov) {
      model.value = nv;
    }
  }
);
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
