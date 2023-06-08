<template>aaaaa</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import router from '@/router';
import { useUIStore } from '@/stores/ui';

const UIStore = useUIStore();

onMounted(async () => {
  await UIStore.setSuperUser('');
  await router.push('/');
});
</script>
