<template>
  <div class="container mx-auto min-h-screen p-4">
    <!--    <header class=""></header>-->
    <main>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col w-full">
          <nav class="h-16 flex flex-row items-start justify-between">
            <Select placeholder="Поиск рецептов" class="w-64" searchable></Select>
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
          <slot />
        </div>
        <aside class="ml-6 w-1/4 h-[calc(100vh-32px)] templ" v-if="route.meta.aside">
          <slot name="aside" />
        </aside>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import Select from '@/components/base/Select.vue';
import ProfileMenu from '@/components/profile/ProfileMenu.vue';
import AuthForm from '@/components/forms/AuthForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const auth = useAuthStore();
onMounted(async () => {
  if (!auth.getMe) {
    await auth.fetchCurrentUser();
  }
});
console.log(route, 'ROUTE');
</script>

<style scoped></style>
