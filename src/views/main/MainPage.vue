<template>
  <main>
    <div class="flex flex-row justify-between">
      <div class="flex flex-col w-full">
        <nav class="h-16 justify-between flex flex-row">
          <Select placeholder="Поиск рецептов" class="w-64"></Select>
          <Modal>
            <template #prepend>
              <div id="reg-img-wrap" class="w-full">
                <img src="../../assets/img/reg/reg_img.jpg" />
              </div>
            </template>
            <template #default>
              <RegistrationForm />
            </template>
            <template #activator="{ toggle }">
              <BaseButton type="button" text="Войти" @click="toggle"></BaseButton>
            </template>
          </Modal>
        </nav>
        <section class="mt-16">
          <!--          <h3 class="text-gray-600 text-2xl font-medium">Блок 1</h3>-->
          <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
            <div
              class="
                col-span-2
                h-80
                w-full
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
          </div>
        </section>
        <section class="mt-16">
          <h3 class="text-gray-600 text-2xl font-medium">Блок 2</h3>
          <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
            <div
              class="
                w-full
                h-80
                max-w-sm
                mx-auto
                rounded-md
                shadow-md
                overflow-hidden
                border-blue-500 border-2
              "
            ></div>
          </div>
        </section>
      </div>
      <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] border-blue-500 border-2"></aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import Select from '@/components/base/Select.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import Modal from '@/components/base/Modal.vue';
import RegistrationForm from '@/components/forms/RegistrationForm.vue';
</script>

<style scoped></style>
