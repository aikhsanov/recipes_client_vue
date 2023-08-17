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
import { provide, shallowRef } from 'vue';
import router from '@/router';
import layouts from '@/layouts/layouts.js';

const UIStore = useUIStore();

const layout = shallowRef('div');
router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || 'div';
});
provide('app:layout', layout);
</script>

<style scoped></style>
