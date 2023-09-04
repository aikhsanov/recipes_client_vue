<template>
  <div>
    {{ recipes.getCurrentRecipe }}
  </div>
</template>

<script setup lang="ts">
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
