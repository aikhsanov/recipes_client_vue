<template>
  <div class="flex flex-col justify-center items-center min-h-screen py-4 light">
    <div
      class="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto border border-blue-200 rounded-lg p-4 flex-grow"
    >
      <header class="mb-4">
        <div class="logo flex items-center justify-center mb-4">
          <h1 class="text-3xl">Рецепты без глютена</h1>
        </div>
        <div class="menu flex flex-col md:flex-row items-center justify-center gap-2">
          <router-link
            :to="{ name: 'home' }"
            class="bg-gray-100 hover:bg-gray-200 py-2 px-4 text-sm font-medium text-gray-800 border border-transparent rounded-lg focus:outline-none"
          >
            Главная
          </router-link>

          <router-link
            :to="{ name: 'receipts' }"
            class="bg-gray-100 hover:bg-gray-200 py-2 px-4 text-sm font-medium text-gray-800 border border-transparent rounded-lg focus:outline-none"
          >
            Рецепты
          </router-link>

          <BaseButton :to="{ name: 'register' }" text="Тест Регистрации" type="link" />

          <router-link
            v-if="UIStore.getSuperUser === '1'"
            :to="{ name: 'addReceipt' }"
            class="bg-gray-100 hover:bg-gray-200 py-2 px-4 text-sm font-medium text-gray-800 border border-transparent rounded-lg focus:outline-none"
          >
            Добавить
          </router-link>

          <router-link
            v-if="UIStore.getSuperUser === '1'"
            :to="{ name: 'exit' }"
            class="bg-gray-100 hover:bg-gray-200 py-2 px-4 text-sm font-medium text-gray-800 border border-transparent rounded-lg focus:outline-none"
          >
            Выйти
          </router-link>
        </div>
      </header>
      <main class="mb-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useUIStore } from '@/stores/ui';
import Register from '@/views/Register.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const UIStore = useUIStore();
</script>

<style scoped></style>
