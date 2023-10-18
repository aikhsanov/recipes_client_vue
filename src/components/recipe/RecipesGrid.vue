<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
    <RecipeCard
      v-for="(recipe, ind) in recipes"
      :key="recipe.title"
      :entry="recipe"
      :wrap-class="`w-full h-80  mx-auto rounded-md shadow-md overflow-hidden relative`"
    >
    </RecipeCard>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '@/components/recipe/RecipeCard.vue';
const props = defineProps<{ recipes?: [] }>();
</script>

<style scoped></style>
