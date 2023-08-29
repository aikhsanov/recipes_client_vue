<template>
  <div class="container mx-auto min-h-screen p-4">
    <header>
      <nav class="h-16 flex flex-row items-start justify-between">
        <Select placeholder="Поиск рецептов" class="w-64" searchable></Select>
        <AuthForm v-if="isSignedIn" />
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
    <slot />
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import Select from '@/components/base/Select.vue';
import ProfileMenu from '@/components/profile/ProfileMenu.vue';
import AuthForm from '@/components/forms/AuthForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const auth = useAuthStore();

const isSignedIn = computed<boolean>(() => Object.values(auth.getMe).length > 0);
</script>

<style scoped></style>
