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
          p-1
          hover:bg-gray-100
          shadow-md
          flex
          items-center
        "
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img v-if="auth?.getMe?.img_url" :src="auth?.getMe?.img_url" />
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

const auth = useAuthStore();

const menu = [
  { text: 'Настройки', to: '/settings', type: 'link', icon: IconSettings },
  { text: 'Выйти', action: () => auth.logout(), type: 'button' },
];
</script>

<style>
.avatar-icon g {
  fill: #ced59d !important;
}
</style>
