<template>
  <div
    :class="`scroll-wrapper ${props.customWrapperClass || 'overflow-y-scroll h-24'}`"
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
  pageMeta?: object;
}>();

const scrollWrapper = ref(null);
const sentinel = ref(null);
const page = ref<number>(1);
const canLoadMore = ref<boolean>(true);
const isLoadingMore = ref<boolean>(false);
const observer = ref(null);
const target = ref(null);

let options = {
  root: scrollWrapper.value,
  rootMargin: '10px',
};
async function handleIntersection([entry]) {
  if (entry.isIntersecting) {
    console.log('sentinel intersecting');
  }
  if (entry.isIntersecting && canLoadMore.value && !isLoadingMore.value) {
    await fetchFn();
  }
}
async function fetchFn() {
  try {
    isLoadingMore.value = true;
    page.value += 1;
    if (page.value <= props.pageMeta?.pages) {
      await props.loadFn(page.value);
    } else {
      canLoadMore.value = false;
    }
  } catch (e) {
    throw new Error(e);
  } finally {
    isLoadingMore.value = false;
  }
}

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, options);
  target.value = sentinel.value;
  observer.value.observe(target.value);
});
</script>

<style scoped></style>
