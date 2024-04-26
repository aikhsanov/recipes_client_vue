<template>
  <header class="py-4 xs:px-1 md:px-5 lg:px-10 w-full">
    <nav class="h-auto flex flex-row items-center w-full justify-between">
      <!--      <router-link to="/" class="w-3/12">-->
      <!--        <h1 class="text-4xl text-gray-500 font-bold">Едим Вкусно</h1>-->
      <!--      </router-link>-->

      <RecipesSearchInput wrapperClass="w-7/12" />

      <div class="xs:f">
        <BaseButton
          v-if="!auth.getIsAuthed"
          type="button"
          text="Вход"
          @click="toggleModal"
          class="mt-0 w-20 text-white font-bold bg-orange-300 hover:bg-orange-400"
        ></BaseButton>
        <AuthForm v-if="!auth.getIsAuthed" />
        <div class="flex flex-row" v-else>
          <ProfileMenu />
          <BaseButton
            class="
              mt-0
              w-auto
              text-white
              font-bold
              bg-tomato-800
              hover:bg-tomato-900
              px-5
              ml-5
              py-2
            "
            type="link"
            to="/recipes/add"
            text="Добавить рецепт"
          />
        </div>
      </div>
    </nav>
    <div id="line" class="border-b-2 border-b-gray-200 mt-4"></div>
  </header>
</template>

<script setup lang="ts">
import AuthForm from '@/components/forms/AuthForm.vue';
import ProfileMenu from '@/components/profile/ProfileMenu.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import useModal from '@/composables/useModal';
import BaseModal from '@/components/base/BaseModal.vue';
import RecipesSearchInput from '@/components/base/RecipesSearchInput.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import { ref } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import HeaderMenu from '@/components/menu/HeaderMenu.vue';
const auth = useAuthStore();
const { isOpen, toggleModal } = useModal();
</script>

<style scoped></style>
