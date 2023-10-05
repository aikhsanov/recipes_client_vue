<template>
  <BaseDropdown :dropdownItems="menu" links activatorClass="pt-0 pl-5 ml-0">
    <template #activator>
      <button
        class="
          h-11
          w-11
          block
          rounded-full
          border border-gray-100
          hover:bg-gray-100
          shadow-md
          flex
          items-center
          justify-center
        "
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img
          v-if="auth?.getMe?.user_img"
          :src="auth?.getMe?.user_img"
          class="rounded-full object-cover w-full h-full"
        />
        <IconBase v-else view-box="0 0 250 250" class="h-9 w-9 avatar-icon" icon-color="#ced59d"
          ><IconAvatar
        /></IconBase>
      </button>
    </template>
    <template #info>
      <p class="text-sm leading-5">Вы вошли как:</p>
      <p class="text-sm font-medium leading-5 text-gray-900 truncate">
        {{ auth?.getMe?.username || 'Имя пользователя не указано' }}
      </p>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import { useAuthStore } from '@/stores/auth';
import imageUrl from '@/assets/img/icons/avatar-green.svg';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconBook from '@/components/icons/IconBook.vue';

const auth = useAuthStore();

const menu = [
  { text: 'Настройки', to: '/user/settings', type: 'link', icon: IconSettings },
  { text: 'Избранное', to: '/user/favorites', type: 'link', icon: IconHeart },
  { text: 'Мои рецепты', to: '/user/myrecipes', type: 'link', icon: IconBook },
  { text: 'Выйти', action: () => auth.logout(), type: 'button' },
];
</script>

<style>
.avatar-icon g {
  fill: #ced59d !important;
}
</style>
