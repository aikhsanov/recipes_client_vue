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
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Multiselect from '@vueform/multiselect';

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
  'update:modelValue': [val: number | string | object];
}>();

onMounted(async () => {
  if (props.searchable) {
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

const selectOptions = computed<Option[]>(() =>
  searchedData?.value?.map((e: DataItem) => ({
    label: e?.name || e?.title,
    value: e?.id || e?.value,
  }))
);

async function onSearch(val: any, open: boolean = false, initial: boolean = false): Promise<void> {
  if (val && !open && !initial) {
    const res: object | [] = (await props.searchFn(val))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
    }
    return;
  }
  if (val && !open && initial) {
    const filters = {
      filters: { id: `EQ(${val})` },
    };
    const res: object | [] = (await props.searchFn(val, filters))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
      model.value = res?.data[0].id;
    }

    return;
  }
  if (open) {
    const res: object | [] = (await props.searchFn(val))?.data;
    if (res?.data?.length) {
      searchedData.value = res?.data;
    }
  }
}
</script>

<style scoped></style>
