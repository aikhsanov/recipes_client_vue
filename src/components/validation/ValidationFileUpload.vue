<template>
  <div class="relative my-3">
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
      :preview="preview"
      @update:modelValue="setFieldDirty"
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
import { onMounted, watch, toRefs } from 'vue';
import { useFormStore } from '@/stores/form';

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

const form = useFormStore();

const emits = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

const { errorMessage, value, meta } = useField(() => props.name, undefined, {
  syncVModel: true,
});
function setFieldDirty() {
  console.log('setting field dirty');
  form.setField({ name: props.name, value: { dirty: true } });
}
const { name } = toRefs(props);
onMounted(() => {
  // if (props.modelValue) value.value = props.modelValue;
  form.setField({ name: name.value, value: { dirty: meta.dirty } });
});

// const form = useFormStore();
// onMounted(() => {
//   form.setField({ name: props.name, value: { dirty: meta.dirty } });
// });
//
// watch(
//   () => meta.dirty,
//   (nv, ov) => {
//     if (nv !== ov) {
//       form.setField({ name: props.name, value: { dirty: meta.dirty } });
//     }
//   }
// );
</script>
