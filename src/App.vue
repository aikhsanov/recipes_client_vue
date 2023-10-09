<template>
  <Suspense>
    <component :is="layout || 'div'">
      <RouterView />
    </component>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import { useUIStore } from '@/stores/ui';
import Register from '@/views/Register.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, provide, shallowRef } from 'vue';
import router from '@/router';
import layouts from '@/layouts/layouts.js';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getToken } from '@/helpers/token';

const UIStore = useUIStore();
const auth = useAuthStore();

const layout = shallowRef('div');

router.beforeEach(async (to, from) => {
  if (!auth.getMe) {
    await auth.fetchCurrentUser();
  }

  if (to?.meta?.auth && !auth.getIsAuthed) {
    return { name: 'home' };
  }
  if (to?.meta?.auth && auth.getIsAuthed && to?.meta?.role && to?.meta?.role !== auth.getMe.role) {
    return { name: 'home' };
  }
});

router.beforeEach((to) => {
  layout.value = layouts[to.meta.layout] || 'div';
});
provide('app:layout', layout);
</script>

<style scoped></style>
