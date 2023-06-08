<template>
  <input
    type="password"
    v-model="pass"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  />
  <button
    class="w-full inline-flex items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
    @click="checkPass"
  >
    Go
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUIStore } from '@/stores/ui';

const UIStore = useUIStore();

const pass = ref('');

const checkPass = () => {
  if (pass.value === '0000') {
    UIStore.setSuperUser('1');
  }
};
</script>
