<template>
  <div class="w-1/2 mx-auto">
    <h3 class="text-gray-400 text-2xl font-bold text-center">Добавление рецепта</h3>
    <AddRecipeForm />
  </div>
</template>

<script setup lang="ts">
import AddRecipeForm from '@/components/forms/AddRecipeForm.vue';
import { onMounted } from 'vue';
onMounted(() => {
  console.log('parent is mounted');
});
</script>

<style scoped></style>
