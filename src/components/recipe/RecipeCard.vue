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
      <img
        :src="entry?.img_url"
        alt=""
        :class="`w-full  object-cover ${isTrend ? 'h-full' : 'h-1/2'}`"
      />
      <div
        v-if="!isTrend"
        class="recipe-preview-text w-full bottom-0 p-2 opacity-80 h-1/2 bg-white"
      >
        <h3 class="font-bold mb-2 line-clamp-2 text-base">{{ entry?.title }}</h3>
        <p :class="`w-full line-clamp-4 border-b border-gray-200`">
          {{ entry?.short_dsc }}
        </p>
        <div class="flex flex-row jusify-center items-center">
          <div class="flex flex-row items-center">
            <IconBase
              view-box="0 0 16 16"
              width="16"
              height="16"
              icon-color="black"
              stroke-color="none"
              class="mr-3"
            >
              <IconClock />
            </IconBase>
            <span>{{ entry?.cooking_time || '30 мин.' }}</span>
          </div>
          <div class="flex flex-row items-center">
            <IconBase
              width="16"
              height="16"
              stroke-color="black"
              icon-color="white"
              class="mr-3"
              stroke-width="1.2"
            >
              <IconPie />
            </IconBase>
            <IconBase
              width="16"
              height="16"
              :icon-color="`${inFavorites ? 'black' : 'none'}`"
              stroke-color="black"
              class="hover:cursor-pointer hover:scale-125"
              @click="addFavs"
            >
              <IconHeart />
            </IconBase>
            <IconBase
              width="16"
              height="16"
              icon-color="none"
              stroke-color="black"
              class="hover:cursor-pointer hover:scale-125"
            >
              <IconThumbUp />
            </IconBase>
            <p>{{ currentRecipe?.likes }}</p>
          </div>
          <span>{{ entry?.portion || '6 персон' }}</span>
        </div>
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
import IconBase from '@/components/icons/IconBase.vue';
import IconThumbUp from '@/components/icons/IconThumbUp.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconPie from '@/components/icons/IconPie.vue';
import { storeToRefs } from 'pinia';
import { useRecipesStore } from '@/stores/recipes';
import useToaster from '@/composables/useToaster';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const { currentRecipe, inFavorites } = storeToRefs(useRecipesStore());

const props = defineProps<{
  entry?: object;
  wrapClass?: string;
  to?: string;
  isTrend?: boolean;
}>();
const { me } = storeToRefs(useAuthStore());

const userId = computed<number>(() => me?.value?.id);
async function addFavs() {
  if (!userId.value) {
    useToaster('Войдите, чтобы добавить в избранное', 'warning');
    return;
  }
  await recipes.addToFavorites({ userId: userId.value, recipeId: recipeId.value });
}
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
