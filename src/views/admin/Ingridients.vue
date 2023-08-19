<template>
  <div class="flex flex-row">
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
        <ValidationFileUpload
          id="ingridient-img"
          name="ingridientImg"
          label="Изображение"
          preview
        />
        <BaseButton type="submit" text="Добавить" />
        {{ IngridientFiltered }}
        <!--      <ValidationSelect />-->
      </form>
      <ValidationSelect
        name="selectedIngr"
        placeholder="Выберите ингредиент"
        searchable
        :searchFn="searchFn"
        :clearOnBlur="false"
        closeOnSelect
      />
      <BaseButton type="button" text="Редактировать" @click="onEdit" />
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
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';

const IngridientFiltered = ref('');

const store = useIngridientsStore();

const { handleSubmit, isSubmitting, setValues } = useForm({
  validationSchema: {
    name: '',
    description: '',
    ingridientImg: '',
    selectedIngr: '',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const data = { name: values.name, description: values.description, img: values.ingridientImg };
    await store.createIngridient(data);
  } catch (e) {
    actions.setErrors({ password: error.response.data.error });
  }
});
const onEdit = handleSubmit(async (values, actions) => {
  try {
    console.log(values.selectedIngr, 'selectedIngr');
    await store.loadIngridientById(values.selectedIngr);
    if (store?.getCurrentIngridient) {
      console.log('settingVals');
      const { name, description, img_url } = store.getCurrentIngridient;
      console.log(name, description, img_url);
      setValues({
        name,
        description,
        ingridientImg: img_url,
      });
    }
  } catch (e) {
    actions.setErrors({ password: error.response.data.error });
  }
});

onMounted(async () => {
  await fetchIngridients(1);
});

async function fetchIngridients(page) {
  await store.loadIngridients({ params: { limit: 6, page } }, true);
}

async function searchFn(val, data = null) {
  data = data
    ? data
    : {
        filters: { name: `LIKE(${val})` },
      };
  return await store.loadFilteredIngridients(data);
}
</script>

<style scoped></style>
