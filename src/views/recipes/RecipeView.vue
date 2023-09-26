<template>
  <div class="w-1/2 mx-auto">
    <h3 class="text-gray-400 text-2xl font-bold text-center">{{ currentRecipe.title }}</h3>
    <div class="my-3 flex flex-row items-center">
      <img v-if="currentRecipe?.user?.img_url" :src="currentRecipe?.user?.img_url" />
      <IconBase view-box="0 0 250 250" width="18" height="18"><IconAvatar /></IconBase>
      <h5>{{ currentRecipe?.user?.username || 'Имя пользователя' }}</h5>
    </div>
    <img :src="currentRecipe.img_url" class="w-full h-[40rem] object-cover object-bottom" />
    <div class="flex flex-row justify-around items-center my-3">
      <div class="flex flex-row items-center">
        <IconBase
          view-box="0 0 16 16"
          width="40"
          height="40"
          icon-color="black"
          stroke-color="none"
          class="mr-3"
        >
          <IconClock />
        </IconBase>
        <p class="font-bold">
          Приготовление: <br />
          <span>{{ currentRecipe?.cooking_time || '30 мин.' }}</span>
        </p>
      </div>
      <div class="flex flex-row items-center">
        <IconBase
          width="54"
          height="54"
          stroke-color="black"
          icon-color="white"
          class="mr-3"
          stroke-width="1.2"
        >
          <IconPie />
        </IconBase>
        <p class="font-bold">
          Рецепт на: <br />
          <span>{{ currentRecipe?.portion || '6 персон' }}</span>
        </p>
      </div>
    </div>
    <div class="my-5">
      <h4 class="text-lg font-bold">Описание:</h4>
      <p>
        {{ currentRecipe?.short_dsc }}
      </p>
    </div>
    <div class="my-5">
      <div
        class="flex flex-row justify-between items-center"
        v-for="ingridient in currentRecipe.recipe_ingridients"
      >
        <p>{{ ingridient.ingridient.title }}</p>
        <p>
          {{ ingridient.quantity }}<span>{{ ingridient.unit }}</span>
        </p>
      </div>
    </div>
    <!--    {{ currentRecipe }}-->
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, toRef } from 'vue';
import { storeToRefs } from 'pinia';
import IconBase from '@/components/icons/IconBase.vue';
import IconAvatar from '@/components/icons/IconAvatar.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconPie from '@/components/icons/IconPie.vue';
import collections from '@/api/collections';

const route = useRoute();
const recipes = useRecipesStore();
const units = ref({});

const { currentRecipe } = storeToRefs(useRecipesStore());

onMounted(async () => {
  await recipes.loadRecipeById(route.params.id);
  units.value = (
    await collections.getAllFiltered({
      filters: { collection: 'EQ(units)' },
      attributes: ['title'],
    })
  )?.data?.reduce((p, n) => {
    p[n.id] = n;
    return p;
  }, {});
});
</script>

<style scoped></style>
