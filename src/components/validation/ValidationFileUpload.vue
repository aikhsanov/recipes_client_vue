<template>
  <div class="relative mb-8">
    <FileUpload
      v-model="value"
      :label="label"
      :name="name"
      :customClass="customClass"
      :customLabelClass="customLabelClass"
      :disabled="disabled"
      :uploadFn="uploadFn"
      :apiName="apiName"
      :entityId="entityId"
    />
    <span
      v-if="errorMessage && meta.touched"
      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import FileUpload from '@/components/base/FileUpload.vue';
import { useField } from 'vee-validate';
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

const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

const { errorMessage, value, meta } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>
