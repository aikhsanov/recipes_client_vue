<template>
  <Suspense>
    <component :is="layout || 'div'">
      <RouterView :key="route?.fullPath" />
    </component>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';

import { useUIStore } from '@/stores/ui';
import Register from '@/views/Register.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, provide, shallowRef } from 'vue';
import layouts from '@/layouts/layouts.js';
import { onMounted } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { getToken } from '@/helpers/token';

const UIStore = useUIStore();
const auth = useAuthStore();
const route = useRoute();
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

router.afterEach((to) => {
  console.log(to, 'TO');
  layout.value = layouts[to.meta.layout] || 'div';
});
provide('app:layout', layout);
</script>

<style scoped></style>
