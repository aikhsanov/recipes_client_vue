<template>
  <div
    :class="`scroll-wrapper ${props.customWrapperClass || 'overflow-y-scroll h-24'}`"
    ref="scrollWrapper"
  >
    <slot />
    <p class="text-center my-5">Показаны все результаты поиска...</p>
    <div class="sentinel h-0" ref="sentinel"></div>
    <Spinner
      :custom-class="`fixed top-1/2 ${route?.meta?.noSideMenu ? '' : 'spinner-left-pos'}`"
      v-if="isLoadingMore"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useInfiniteScrollStore } from '@/stores/infinite_scroll';
import { storeToRefs } from 'pinia';
import Spinner from '@/components/ui/Spinner.vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  customWrapperClass?: string;
}>();

const scrollWrapper = ref(null);
const sentinel = ref(null);
// const page = ref<number>(1);
// const canLoadMore = ref<boolean>(true);
// const isLoadingMore = ref<boolean>(false);
const observer = ref(null);
const target = ref(null);
const route = useRoute();

const scrollStore = useInfiniteScrollStore();
const { canLoadMore, isLoadingMore } = storeToRefs(scrollStore);
const { fetchFn } = scrollStore;

let options = {
  root: scrollWrapper.value,
  rootMargin: '10px',
};
async function handleIntersection([entry]) {
  if (entry.isIntersecting) {
    console.log('sentinel intersecting');
  }
  if (entry.isIntersecting && canLoadMore.value && !isLoadingMore.value) {
    await fetchFn(entry.isIntersecting);
  }
}

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, options);
  target.value = sentinel.value;
  observer.value.observe(target.value);
});
</script>

<style scoped></style>
