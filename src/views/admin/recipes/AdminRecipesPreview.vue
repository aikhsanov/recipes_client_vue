<template>
  <div class="w-1/2 mx-auto">
    <h3 class="text-gray-400 text-2xl font-bold text-center">Предпросмотр рецепта</h3>
    <AddRecipeForm v-if="recipes.getCurrentRecipe" />
    <div class="grid grid-cols-2 gap-6 mt-5">
      <BaseButton text="Опубликовать" @click="approveRecipe" />
      <BaseButton
        class="bg-tomato-900 hover:bg-tomato-700"
        text="Отказать"
        @click="declineRecipe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddRecipeForm from '@/components/forms/AddRecipeForm.vue';
import { useRoute } from 'vue-router';
import { useRecipesStore } from '@/stores/recipes';
import { onMounted } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import recipesApi from '@/api/recipes';

const route = useRoute();
const recipes = useRecipesStore();

onMounted(() => {
  recipes.loadRecipeById(route.params.id);
});

async function approveRecipe(): Promise<void> {
  await recipesApi.approveRecipe(route?.params?.id);
}

async function declineRecipe(): Promise<void> {
  await recipesApi.declineRecipe(route?.params?.id);
}
</script>

<style scoped></style>
