<template>
  <div class="relative my-3">
    <label
      v-if="props.label"
      :class="`block mb-2 text-gray-600 dark:text-gray-300 font-semibold ${props.customLabelClass}`"
      :for="props.name"
      >{{ props.label || 'Выберите файл' }}</label
    >
    <div class="image-preview h-32 w-auto my-2" v-if="img && props.preview">
      <img :src="img" class="w-auto h-full object-contain" />
    </div>
    <input
      :class="`block file:h-11 w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-5 file:border-0 file:text-sm file:font-semibold file:bg-light-slate-gray-900 file:text-white hover:file:bg-light-slate-gray-800 hover:cursor-pointer hover:file:cursor-pointer ${props.customClass}`"
      :id="props.name"
      :name="props.name"
      type="file"
      ref="fileInput"
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
  getForm?: boolean;
  uploadFn?: Function;
  entityId?: string;
}>();

const value = ref<FormData | object>({});
const img = ref<string>('');
const fileInput = ref(null);

const emits = defineEmits<{
  'update:modelValue': [val: number | string | object];
}>();

onMounted(() => {
  img.value = props.modelValue ? props.modelValue : '';
});

async function onUpload(e: EventTarget): Promise<void> {
  const { files } = e.target;
  if (!props.getForm) {
    value.value = files[0];
  } else {
    let data = new FormData();
    data.append('file', files[0]);
    value.value = data;
  }

  img.value = URL.createObjectURL(files[0]);

  let res;
  if (props.uploadFn) {
    res = (await props.uploadFn())?.data;
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
    console.log(typeof newVal, 'typeof newVal');
    if (typeof newVal === 'string') {
      img.value = newVal;
    }
    if (!newVal && fileInput.value.value) {
      fileInput.value.value = '';
    }
  }
);
</script>

<style scoped></style>
