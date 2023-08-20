<template>
  <div class="relative mb-8">
    <div class="image-preview h-64 w-64" v-if="img && props.preview">
      <img :src="img" class="" />
    </div>
    <label
      v-if="props.label"
      :class="`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${props.customLabelClass}`"
      :for="props.name"
      >Upload file</label
    >
    <input
      :class="`block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300 ${props.customClass}`"
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
