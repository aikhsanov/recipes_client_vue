<template>
  <div class="relative mb-3" data-te-input-wrapper-init>
    <input
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :id="uid"
      @input="emit('update:modelValue', $event?.target?.value)"
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    />
    <label
      v-if="props.labelText"
      :for="uid"
      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >
      {{ props.labelText }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
});
</script>
<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import type { Ref } from 'vue';

interface Props {
  modelValue?: string;
  labelText?: string;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelText: '',
  placeholder: '',
  type: 'text',
  modelValue: null,
});

const emit = defineEmits<{
  'update:modelValue': [val: number | string];
}>();

const uid: Ref<string | number> = ref(uuidv4());
</script>

<style scoped></style>
