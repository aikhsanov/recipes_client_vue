<template>
  <BaseModal class="w-96" contentClass="px-3 pb-3 pt-5">
    <template #default>
      <div class="mb-6 text-center font-bold min-h-[60px] flex items-center justify-center">
        {{ confirmText || 'Подтвердите действие' }}
      </div>
      <hr class="-mx-3" />
    </template>
    <template #controls>
      <div class="confirm-controls flex flex-row w-1/2 ml-auto mt-3 justify-end">
        <BaseButton text="Ок" @click="resConfirm(true)" class="mr-2" mode="confirm" />
        <BaseButton text="Отмена" @click="resConfirm(false)" mode="danger" />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import useModal from '@/composables/useModal';

const props = defineProps<{
  confirmText?: string;
}>();

const emits = defineEmits<{
  confirmResult: [val: boolean];
}>();

const { resConfirm } = useModal();
</script>

<style scoped></style>
