<template>
  <AddRecipeForm v-if="recipes.getCurrentRecipe" />
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
