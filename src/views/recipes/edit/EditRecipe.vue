<template>
  <div class="w-1/2 mx-auto">
    <h3 class="text-gray-400 text-2xl font-bold text-center">Редактирование рецепта</h3>
    <AddRecipeForm v-if="recipes.getCurrentRecipe" />
  </div>
</template>

<script setup lang="ts">
import AddRecipeForm from '@/components/forms/AddRecipeForm.vue';
import { useRecipesStore } from '@/stores/recipes';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const recipes = useRecipesStore();

onMounted(() => {
  recipes.loadRecipeById(route.params.id);
});
</script>

<style scoped></style>
