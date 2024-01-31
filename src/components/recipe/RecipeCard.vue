<template>
  <router-link
    :to="to ? to : `/recipes/${entry?.id}`"
    :class="`${
      wrapClass
        ? wrapClass
        : 'w-full h-80 max-w-sm mx-auto shadow-md overflow-hidden relative group'
    }`"
  >
    <div class="w-full h-full group">
      <img :src="entry?.img_url" alt="" class="w-full h-full object-cover" />
      <div
        v-if="!isTrend"
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
          duration-300
        "
      >
        <h3 class="font-bold mb-2 line-clamp-2 text-base">{{ entry?.title }}</h3>
        <p
          :class="`w-full ${
            entry?.title?.length > 75 ? 'line-clamp-1' : 'line-clamp-2'
          } group-hover:line-clamp-5`"
        >
          {{ entry?.short_dsc }}
        </p>
      </div>
      <div
        v-else
        class="
          w-full
          h-full
          absolute
          top-0
          left-0
          flex
          items-center
          justify-center
          recipe-trend-card
        "
      >
        <h3 class="font-bold mb-2 line-clamp-2 text-5xl text-white">
          {{ entry?.title?.toUpperCase() }}
        </h3>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  entry?: object;
  wrapClass?: string;
  to?: string;
  isTrend?: boolean;
}>();
</script>

<style scoped>
h3,
p {
  font-family: Bahnschrift;
}
.recipe-trend-card {
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.9) inset;
}
</style>
