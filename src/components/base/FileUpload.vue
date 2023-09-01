<template>
  <div class="relative my-2">
    <div class="image-preview h-64 w-64" v-if="img && props.preview">
      <img :src="img" class="" />
    </div>
    <label
      v-if="props.label"
      :class="`block mb-2 text-[16px] font-medium text-gray-400 dark:text-gray-300 font-normal ${props.customLabelClass}`"
      :for="props.name"
      >{{ props.label || 'Выберите файл' }}</label
    >
    <input
      :class="`block file:h-11 text-white w-auto text-sm text-slate-500 file:mr-4 file:py-1 file:px-5 file:border-0 file:text-sm file:font-semibold file:bg-light-slate-gray-900 file:text-white hover:file:bg-light-slate-gray-800 hover:cursor-pointer hover:file:cursor-pointer ${props.customClass}`"
      :id="props.name"
      :name="props.name"
      type="file"
      :disabled="props.disabled"
      @change="onUpload($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  modelValue?: string | number | object;
  label?: string;
  name?: string;
  customClass?: string;
  customLabelClass?: string;
  disabled?: boolean;
  preview?: boolean;
  uploadFn?: Function;
  apiName?: string;
  entityId?: string;
}>();

const value = ref<FormData | object>({});
const img = ref<string>('');
const apiName = ref<string>('');

if (props.apiName) {
  apiName.value = await import(`../../api/${props.apiName}.ts`);
}

const emits = defineEmits<{
  'update:modelValue': [val: number | string | object];
}>();

async function onUpload(e: EventTarget): Promise<void> {
  const { files } = e.target;
  let data = new FormData();
  data.append('file', files[0]);
  value.value = data;
  let res;
  if (props.uploadFn) {
    res = (await props.uploadFn())?.data;
  } else if (props.apiName) {
    res = (await apiName.value.default.uploadImage(props.entityId, data))?.data;
  }

  if (res?.data) {
    img.value = res.data.img_url;
  }

  emits('update:modelValue', value.value);
}

watch(
  () => props.modelValue,
  (newVal) => {
    console.log(newVal);
    if (typeof newVal === 'string') {
      img.value = newVal;
    }
  }
);
</script>

<style scoped></style>
