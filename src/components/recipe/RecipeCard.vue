<template>
  <router-link
    :to="to ? to : `/recipes/${entry?.id}`"
    :class="
      wrapClass
        ? `${wrapClass} group `
        : 'w-full h-[450px] max-w-sm mx-auto shadow-md overflow-hidden relative group'
    "
  >
    <div class="w-full h-full">
      <div :class="`${isTrend ? 'h-full' : 'h-1/2'} relative`">
        <img
          :src="entry?.img_url"
          alt=""
          class="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div
          id="user"
          class="
            absolute
            -top-10
            left-0
            flex flex-row
            items-center
            bg-zinc-700
            py-1
            px-2
            bg-opacity-40
            group-hover:top-0
            transition-all
            duration-500
          "
          v-if="!isTrend"
        >
          <img :src="entry.user.user_img" alt="" class="w-7 h-7 rounded-full mr-2" />
          <span class="text-lg text-white">{{ entry.user.username }}</span>
        </div>
      </div>
      <div
        v-if="!isTrend"
        class="recipe-preview-text w-full flex flex-col justify-between bottom-0 p-2 h-1/2 bg-white"
      >
        <div class="h-5/6">
          <h3 class="font-bold mb-2 line-clamp-2 text-2xl">{{ entry?.title }}</h3>
          <p :class="`w-full line-clamp-4 `">
            {{ entry?.short_dsc }}
          </p>
        </div>
        <!--        <div id="user" class="flex flex-row items-center justify-start my-2" v-if="!isTrend">-->
        <!--          <img :src="entry.user.user_img" alt="" class="w-7 h-7 rounded-full mr-2" />-->
        <!--          <span class="text-lg text-black">{{ entry.user.username }}</span>-->
        <!--        </div>-->
        <div class="flex flex-row justify-around items-center h-1/6 border-t border-gray-200">
          <div class="flex flex-row items-center">
            <IconBase
              view-box="0 0 16 16"
              width="16"
              height="16"
              icon-color="black"
              stroke-color="none"
              class="mr-2"
            >
              <IconClock />
            </IconBase>
            <span>{{ entry?.cooking_time || 30 }}мин.</span>
          </div>
          <div class="flex flex-row items-center">
            <IconBase
              width="19"
              height="19"
              stroke-color="black"
              icon-color="white"
              class="mr-1"
              stroke-width="1.5"
            >
              <IconPie />
            </IconBase>
            <span>{{ entry?.portion || '6' }}п.</span>
          </div>

          <div class="flex flex-row items-center">
            <IconBase
              width="18"
              height="18"
              icon-color="none"
              stroke-color="black"
              class="hover:cursor-pointer hover:scale-125 mr-1"
            >
              <IconThumbUp />
            </IconBase>
            <span>{{ currentRecipe?.likes || 0 }}</span>
          </div>
          <IconBase
            width="18"
            height="18"
            :icon-color="`${inFavorites ? 'black' : 'none'}`"
            stroke-color="black"
            class="hover:cursor-pointer hover:scale-125"
            @click="addFavs"
          >
            <IconHeart />
          </IconBase>
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
