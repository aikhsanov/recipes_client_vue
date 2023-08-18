<template>
  <div class="flex-col w-1/3">
    <h3>Добавление и просмотр доступных ингридиентов</h3>
    <form @submit="onSubmit" class="mt-12">
      <ValidationInput id="ingridient-name" placeholder="username" label="Название" name="name" />
      <ValidationInput
        id="ingridient-desc"
        placeholder=" "
        label="Описание"
        name="description"
        type="textarea"
      />
      <ValidationFileUpload id="ingridient-img" name="ingridientImg" label="Изображение" preview />
      <BaseButton type="submit" text="Добавить" />
      {{ IngridientFiltered }}
      <!--      <ValidationSelect />-->
    </form>
    <h5 class="mt-5 mb-2">Тест инфинит скролла</h5>
    <InfiniteScroll
      customWrapperClass="mt-5"
      :loadFn="fetchIngridients"
      :pageMeta="store.getDataMeta"
      v-if="store.getIngridients.length"
    >
      <div v-for="ingr in store.getIngridients" :key="ingr.name">
        <h5>{{ ingr.name }}</h5>
      </div>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import { onMounted, ref, toRefs } from 'vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import { useIngridientsStore } from '@/stores/ingridients';
import ingridients from '@/api/ingridients';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';

const IngridientFiltered = ref('');
const allIngridients = ref([]);

const store = useIngridientsStore();

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    name: 'required',
    description: 'required',
    ingridientImg: 'required',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const res = (
      await ingridients.create({
        name: values.name,
        description: values.description,
      })
    ).data;
    if (res.data) {
      console.log(values.ingridientImg);
      await ingridients.uploadImage(res.data.id, values.ingridientImg);
    }
    console.log(res);
  } catch (e) {
    actions.setErrors({ password: error.response.data.error });
  }
});

onMounted(async () => {
  await store.loadIngridients({ params: { limit: 6, page: 1 } }, true);
});

async function fetchIngridients(page) {
  await store.loadIngridients({ params: { limit: 6, page } }, true);
}
</script>

<style scoped></style>
