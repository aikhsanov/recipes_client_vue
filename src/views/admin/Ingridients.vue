<template>
  <div class="flex flex-row">
    <div class="flex-col w-1/3">
      <h3 class="font-bold">Добавление и просмотр доступных ингридиентов</h3>
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
        <!--        <ValidationSelect-->
        <!--          name="fetchedIng"-->
        <!--          placeholder="Выбранный ингредиент"-->
        <!--          searchable-->
        <!--          :searchFn="searchFn"-->
        <!--          :clearOnBlur="false"-->
        <!--          closeOnSelect-->
        <!--        />-->
        <BaseButton type="submit" text="Добавить" />
        {{ IngridientFiltered }}
        <!--      <ValidationSelect />-->
      </form>
      <h3 class="mt-10 mb-2 font-bold">Тест инфинит скролла</h3>
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
    <div class="flex-col w-1/3 ml-10">
      <h3 class="font-bold">Редактирование ингридиентов</h3>
      <div class="mt-12">
        <ValidationSelect
          name="selectedIngr"
          placeholder="Выберите ингредиент"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
        />
        <BaseButton type="button" text="Редактировать" @click="onEdit" />
        <BaseButton type="button" text="Сохранить" @click="editOnSave" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import { onMounted, onUnmounted, ref, toRefs } from 'vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import { useIngridientsStore } from '@/stores/ingridients';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';
import { useFormStore } from '@/stores/form';
import usePrepareEditData from '@/composables/usePrepareEditData.js';

const IngridientFiltered = ref('');

const form = useFormStore();
const store = useIngridientsStore();

const { handleSubmit, isSubmitting, setValues, setTouched, meta, resetForm } = useForm({
  initialValues: {
    name: '',
    description: '',
    ingridientImg: '',
    fetchedIng: '',
  },
  validationSchema: {
    name: '',
    description: '',
    ingridientImg: '',
    fetchedIng: '',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const data = { name: values.name, description: values.description, img: values.ingridientImg };
    await store.createIngridient(data);
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
});

const editOnSave = handleSubmit(async (values, actions) => {
  try {
    const data = usePrepareEditData(values);
    console.log(data);
    // await store.createIngridient(data);
  } catch (e) {
    throw new Error(e);
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
      resetForm({
        values: {
          name,
          description,
          ingridientImg: img_url,
          fetchedIng: values.selectedIngr,
        },
      });
      // setTouched({
      //   name: false,
      //   description: false,
      //   ingridientImg: false,
      // });
    }
  } catch (e) {
    throw new Error(e);
  }
});

onMounted(async () => {
  await fetchIngridients(1);
});

onUnmounted(() => {
  form.clearFormField();
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
