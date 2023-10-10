<template>
  <header class="p-4 border-2 border-b-gray-200">
    <nav class="h-11 flex flex-row items-start container justify-between container mx-auto">
      <router-link to="/" class="w-3/12">
        <h1 class="text-4xl text-gray-500 font-bold">Едим Вкусно</h1>
      </router-link>

      <AuthForm v-if="!auth.getIsAuthed" />
      <div class="flex flex-row" v-else>
        <ProfileMenu />
        <BaseButton
          class="mt-0 w-auto text-white font-bold bg-tomato-800 hover:bg-tomato-900 px-5 ml-5 py-2"
          type="link"
          to="/recipes/add"
          text="Добавить рецепт"
        />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import AuthForm from '@/components/forms/AuthForm.vue';
import ProfileMenu from '@/components/profile/ProfileMenu.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>

<style scoped></style>
