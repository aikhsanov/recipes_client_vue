<template>
  <div class="w-1/2 mx-auto">
    <h3 class="text-gray-700 mb-5 text-2xl font-bold text-center">{{ currentRecipe.title }}</h3>
    <div class="my-3 flex flex-row items-center justify-between">
      <div class="flex flex-row">
        <div class="mr-1">
          <img v-if="currentRecipe?.user?.img_url" :src="currentRecipe?.user?.img_url" />
          <IconBase v-else view-box="0 0 250 250" width="18" height="18">
            <IconAvatar />
          </IconBase>
        </div>
        <h5>{{ currentRecipe?.user?.username || 'Имя пользователя' }}</h5>
      </div>
      <div class="flex flex-row items-center justify-between w-2/12">
        <IconBase
          width="24"
          height="24"
          icon-color="none"
          stroke-color="black"
          class="hover:cursor-pointer hover:scale-125"
        >
          <IconHeart />
        </IconBase>
        <IconBase
          width="24"
          height="24"
          icon-color="none"
          stroke-color="black"
          class="hover:cursor-pointer hover:scale-125"
        >
          <IconThumbUp />
        </IconBase>
        <IconBase
          width="24"
          height="24"
          icon-color="none"
          stroke-color="black"
          class="hover:cursor-pointer hover:scale-125"
        >
          <IconComments />
        </IconBase>
      </div>
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
      <h4 class="text-lg font-bold mb-2">Описание:</h4>
      <p>
        {{ currentRecipe?.short_dsc }}
      </p>
    </div>
    <hr />
    <div class="my-5">
      <h4 class="text-lg font-bold mb-2">Ингредиенты:</h4>
      <div v-for="ingridient in currentRecipe.recipe_ingridients">
        <div class="flex flex-row justify-between items-center">
          <p>{{ ingridient.ingridient.title }}</p>
          <p class="font-bold">
            {{ ingridient.quantity
            }}<span class="ml-2 font-bold">{{ units[ingridient.unit_cid]?.title }}</span>
          </p>
        </div>
        <hr class="my-2" />
      </div>
    </div>
    <div class="my-5">
      <div class="mb-2" v-for="step in currentRecipe.recipe_steps">
        <h5 class="text-xl font-bold mb-2">Шаг {{ step.order }}</h5>
        <img :src="step.img_url" />
        <p class="mt-2">
          {{ step.description }}
        </p>
        <hr class="my-2" />
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
import { useAuthStore } from '@/stores/auth';
import IconThumbUp from '@/components/icons/IconThumbUp.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconComments from '@/components/icons/IconComments.vue';

const route = useRoute();
const recipes = useRecipesStore();
const units = ref({});

const { currentRecipe } = storeToRefs(useRecipesStore());

onMounted(async () => {
  await recipes.loadRecipeById(route.params.id);
  units.value = (
    await collections.getAllFiltered({
      filters: { collection: 'EQ(units)' },
      attributes: ['title', 'id'],
    })
  )?.data?.data.reduce((p, n) => {
    p[n.id] = n;
    return p;
  }, {});
});
</script>

<style scoped></style>
