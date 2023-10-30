<template>
  <BaseModal class="px-5 pb-5">
    <template #default> {{ confirmText || 'Подтвердите действие' }} </template>
    <template #controls>
      <div class="confirm-controls flex flex-row justify-around">
        <BaseButton text="Ок" @click="resConfirm(true)" />
        <BaseButton text="Отмена" @click="resConfirm(false)" />
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
