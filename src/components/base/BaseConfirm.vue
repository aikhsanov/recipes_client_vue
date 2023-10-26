<template>
  <BaseModal>
    <template #default> Подтвердите действие </template>
    <template #controls> <BaseButton text="Confirm" /><BaseButton text="Decline" /> </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';
</script>

<style scoped></style>
