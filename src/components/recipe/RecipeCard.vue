<template>
  <router-link
    :to="to ? to : `/recipes/${entry?.id}`"
    :class="`${
      wrapClass
        ? wrapClass
        : 'w-full h-80 max-w-sm mx-auto rounded-md shadow-md overflow-hidden relative group'
    }`"
  >
    <div class="w-full h-full">
      <img :src="entry?.img_url" alt="" class="w-full h-full object-cover" />
      <div
        class="
          recipe-preview-text
          w-full
          absolute
          bottom-0
          p-2
          opacity-80
          h-2/5
          bg-white
          group-hover:h-4/5
          transition-all
          duration-500
        "
      >
        <h3 class="font-bold mb-2 line-clamp-2">{{ entry?.title }}</h3>
        <p
          :class="`w-full ${
            entry?.title?.length > 75 ? 'line-clamp-1' : 'line-clamp-2'
          } group-hover:line-clamp-5`"
        >
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
  to?: string;
}>();
</script>

<style scoped></style>
