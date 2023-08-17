<template>
  <div class="relative mb-8">
    <div class="image-preview h-64 w-64" v-if="value.img_url && props.preview">
      <img :src="value.img_url" />
    </div>
    <label
      v-if="props.label"
      :class="`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${props.customLabelClass}`"
      :for="props.name"
      >Upload file</label
    >
    <input
      :value="value"
      :class="`block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300 ${props.customClass}`"
      :id="props.name"
      type="file"
      :disabled="props.disabled"
      @change="onUpload($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ingridients from '@/api/ingridients';

const props = defineProps<{
  modelValue?: string | number | object;
  label?: string;
  name?: string;
  customClass?: string;
  customLabelClass?: string;
  disabled?: boolean;
  uploadFn?: Function;
  apiName?: string;
  entityId?: string;
}>();

const apiName = await import(`../../api/${props.apiName}.ts`);
const value = ref<string>('');
const img = ref<string>('');
// console.log(await apiName());
console.log(apiName);

async function onUpload(e: EventTarget): Promise<void> {
  const { files } = e.target;
  let data = new FormData();
  data.append('file', files[0]);
  // value.value = files[0].name;
  let res;
  if (props.uploadFn) {
    res = (await props.uploadFn())?.data;
  } else if (props.apiName) {
    res = (await apiName.default.uploadImage(props.entityId, data))?.data;
  }

  if (res?.data) {
    img.value = res.data.img_url;
  }
}
</script>

<style scoped></style>
