<template>
  <div class="w-1/2 mx-auto">
    <h3 class="text-gray-700 mb-5 text-2xl font-bold text-center">{{ currentRecipe.title }}</h3>
    <BaseButton
      v-if="isOwner"
      @click="toEdit"
      text="Редактировать"
      class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-800 my-5"
    />
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
          :icon-color="`${inFavorites ? 'black' : 'none'}`"
          stroke-color="black"
          class="hover:cursor-pointer hover:scale-125"
          @click="addFavs"
        >
          <IconHeart />
        </IconBase>
        <IconBase
          width="24"
          height="24"
          icon-color="none"
          stroke-color="black"
          class="hover:cursor-pointer hover:scale-125"
          @click="addLikes"
        >
          <IconThumbUp />
        </IconBase>
        <p>{{ currentRecipe?.likes }}</p>
        <IconBase
          width="24"
          height="24"
          icon-color="none"
          stroke-color="black"
          class="hover:cursor-pointer hover:scale-125"
          @click="
            toggleComments();
            scrollToComments();
          "
        >
          <IconComments />
        </IconBase>
        <p>{{ commentsAmount }}</p>
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
      <div v-for="ingridient in currentRecipe.recipe_ingridients" :key="ingridient.id">
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
      <div class="mb-2" v-for="step in currentRecipe.recipe_steps" :key="step.id">
        <h5 class="text-xl font-bold mb-2">Шаг {{ step.order }}</h5>
        <img :src="step.img_url" />
        <p class="mt-2">
          {{ step.description }}
        </p>
        <hr class="my-2" />
      </div>
    </div>
    <!--    {{ currentRecipe }}-->

    <div class="my-5" v-if="commentsOpen" ref="comments">
      <h5 class="text-xl font-bold mb-2">Комментарии</h5>
      <div class="mb-2" v-for="comment in currentRecipe.recipe_comments" :key="comment.id">
        <div class="flex flex-row justify-between">
          <div class="w-1/3 flex items-center justify-start">
            <div
              v-if="comment.user.user_img"
              class="
                h-6
                w-6
                rounded-full
                border border-gray-100
                hover:bg-gray-100
                shadow-md
                inline-flex
                items-center
                justify-center
              "
            >
              <img :src="comment.user.user_img" class="rounded-full object-cover w-full h-full" />
            </div>
            <IconBase v-else view-box="0 0 250 250" width="18" height="18">
              <IconAvatar />
            </IconBase>
            <span class="font-bold ml-2">
              {{ comment.user.username }}
            </span>
          </div>
          <span class="text-gray-500">
            {{ moment(comment.createdAt).format('DD.MM.YYYY HH:mm') }}
          </span>
        </div>

        <p class="mt-2">
          {{ comment.comment }}
        </p>
        <hr class="my-2" />
      </div>
    </div>
    <BaseButton
      type="submit"
      text="Показать комментарии"
      class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-800"
      @click="toggleComments"
      v-if="commentsAmount && !commentsOpen"
    />
    <AddComment v-if="userId" />
    <AuthForm v-else>
      <template #activator-btn="{ toggle }">
        <BaseButton
          @click="toggle"
          text="Войдите, чтобы оставить комментарий"
          class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-800 my-5"
        />
      </template>
    </AuthForm>
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes';
import { useRoute, useRouter } from 'vue-router';
import { computed, nextTick, onMounted, ref, toRef } from 'vue';
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
import AddComment from '@/components/forms/AddComment.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import moment from 'moment';
import useToaster from '@/composables/useToaster';
import AuthForm from '@/components/forms/AuthForm.vue';

const route = useRoute();
const router = useRouter();
const recipes = useRecipesStore();
const units = ref<object>({});
const commentsOpen = ref<boolean>(false);
const comments = ref<HTMLDivElement>();

const { currentRecipe, inFavorites } = storeToRefs(useRecipesStore());
const { me } = storeToRefs(useAuthStore());

const userId = computed<number>(() => me?.value?.id);
const isOwner = computed<boolean>(
  () => userId?.value && userId?.value == currentRecipe?.value?.userId
);
const commentsAmount = computed<number>(() => currentRecipe?.value?.recipe_comments?.length);
const recipeId = computed<number>(() => parseInt(route.params.id));

function toEdit() {
  router.push(`/recipes/edit/${recipeId.value}`);
}

async function addFavs() {
  if (!userId.value) {
    useToaster('Войдите, чтобы добавить в избранное', 'warning');
    return;
  }
  await recipes.addToFavorites({ userId: userId.value, recipeId: recipeId.value });
}
async function addLikes() {
  if (!userId.value) {
    useToaster('Войдите, чтобы оценить пост', 'warning');
    return;
  }
  await recipes.addToLikes({ userId: userId.value, recipeId: recipeId.value });
}

function toggleComments() {
  commentsOpen.value = !commentsOpen.value;
}

async function scrollToComments() {
  await nextTick();
  comments.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(async () => {
  await recipes.loadRecipeById(recipeId.value);
  if (userId.value) {
    await recipes.loadFavoriteRecipe({ userId: userId.value, recipeId: recipeId.value });
  }

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
