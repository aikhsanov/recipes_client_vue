<template>
  <div>
    <Suspense>
      <main class="mb-4">
        <component :is="layout || 'div'">
          <RouterView />
        </component>
      </main>
    </Suspense>
  </div>
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

router.beforeEach((to) => {
  if (to?.meta?.auth && !auth.getIsAuthed) {
    return { name: 'home' };
  }
  // return to;
});
router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || 'div';
});
provide('app:layout', layout);
</script>

<style scoped></style>
