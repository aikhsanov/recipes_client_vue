<template>
  <main>
    <div class="flex flex-row justify-between">
      <div class="flex flex-col w-full">
        <nav class="h-16 justify-between flex flex-row">
          <Select placeholder="Поиск рецептов" class="w-64"></Select>
          <RegistrationForm />
        </nav>
        <section class="mt-16">
          <!--          <h3 class="text-gray-600 text-2xl font-medium">Блок 1</h3>-->
          <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
            <div
              class="templ col-span-2 h-80 w-full mx-auto rounded-md shadow-md overflow-hidden"
            ></div>
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"
            ></div>
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"
            ></div>
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"
            ></div>
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden templ"
            ></div>
          </div>
        </section>
        <section class="mt-16">
          <h3 class="text-gray-600 text-2xl font-medium">Блок 2</h3>
          <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-[#B6C454]"
            ></div>
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-[#B6C454]"
            ></div>
            <div
              class="w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-[#B6C454]"
            ></div>
          </div>
        </section>
      </div>
      <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ"></aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import Select from '@/components/base/Select.vue';
import RegistrationForm from '@/components/forms/RegistrationForm.vue';
</script>

<style scoped></style>
