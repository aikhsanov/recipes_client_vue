<template>
  <BaseModal>
    <template #default> {{ confirmText || 'Подтвердите действие' }} </template>
    <template #controls>
      <BaseButton text="Ок" @click="resConfirm(true)" />
      <BaseButton text="Отмена" @click="resConfirm(false)" />
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
