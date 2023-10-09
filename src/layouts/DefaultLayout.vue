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
  <div class="container mx-auto min-h-screen py-4">
    <main>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col w-full">
          <Select
            placeholder="Поиск рецептов"
            class="w-full"
            searchable
            v-if="route.meta.search"
            :noInitSearch="true"
            :searchFn="
              (val, filters) =>
                searchFn({
                  val,
                  route: recipes,
                  apiMethod: 'getAllByTitle',
                  filters: filters || { title: `LIKE(${val})` },
                })
            "
            @keydown.enter="onMainSearch"
          ></Select>
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
import { useRoute, useRouter } from 'vue-router';
import searchFn from '@/helpers/searchFn';
import { useRecipesStore } from '@/stores/recipes';
import recipes from '@/api/recipes';

const route = useRoute();
const auth = useAuthStore();
const router = useRouter();
// onMounted(async () => {
//   if (!auth.getMe) {
//     await auth.fetchCurrentUser();
//   }
// });
console.log(route, 'ROUTE');
async function onMainSearch(e) {
  await router.push(`/recipes/search?text=${e.target.value}`);
}
</script>

<style scoped></style>
