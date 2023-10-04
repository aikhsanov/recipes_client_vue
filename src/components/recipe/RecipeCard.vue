<template>
  <router-link :to="`/recipes/${entry?.id}`" :class="wrapClass">
    <div class="w-full h-full">
      <img :src="entry?.img_url" alt="" class="w-full h-full object-cover" />
      <div class="recipe-preview-text w-full absolute bottom-0 p-2 opacity-80 h-2/5 bg-white">
        <h3 class="font-bold mb-2 line-clamp-2">{{ entry?.title }}</h3>
        <p :class="`w-full ${entry?.title?.length > 75 ? 'line-clamp-1' : 'line-clamp-2'}`">
          {{ entry?.short_dsc }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  entry?: object;
  wrapClass?: string;
}>();
</script>

<style scoped></style>
