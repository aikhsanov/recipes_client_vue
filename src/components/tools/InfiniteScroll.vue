<template>
  <div
    :class="`scroll-wrapper overflow-y-scroll h-64 ${props.customWrapperClass || ''}`"
    ref="scrollWrapper"
  >
    <slot />
    <div class="sentinel h-0" ref="sentinel"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  customWrapperClass?: string;
  loadFn?: Function;
}>();

const scrollWrapper = ref(null);
const sentinel = ref(null);
const page = ref<number>(1);
const canFetch = ref<boolean>(true);
const observer = ref(null);
const target = ref(null);

let options = {
  root: scrollWrapper.value,
  rootMargin: '10px',
};

async function fetchFn() {
  try {
    page.value++;
    await props.loadFn(page);
  } catch (e) {
    throw new Error(e);
  }
}

onMounted(() => {
  observer.value = new IntersectionObserver(fetchFn, options);
  target.value = sentinel.value;
  observer.value.observe(target.value);
});
</script>

<style scoped></style>
