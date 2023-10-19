<template>
  <div class="flex flex-row">
    <div class="flex-col w-1/3">
      <h3 class="font-bold">Добавление и просмотр доступных ингредиентов</h3>
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
    </div>
    <div class="flex-col w-1/3 ml-10">
      <h3 class="font-bold">Редактирование ингредиентов</h3>
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
        <BaseButton
          customButtonClass="border-red-600 text-red-400 hover:bg-red-600 hover:text-red-200"
          type="button"
          text="Удалить"
          @click="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import { useIngridientsStore } from '@/stores/ingridients';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';
import { useFormStore } from '@/stores/form';
import usePrepareEditData from '@/composables/usePrepareEditData.js';
import useToaster from '@/composables/useToaster';

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
const id = computed(() => store?.getCurrentIngridient.id);

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
    await store.updateIngridient(id.value, data);
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
});

const onEdit = handleSubmit(async (values, actions) => {
  try {
    await store.loadIngridientById(values.selectedIngr);
    if (store?.getCurrentIngridient) {
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
    }
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
});

const onDelete = handleSubmit(async (values, actions) => {
  try {
    const res = await store.deleteIngridient(values.selectedIngr);
    console.log(res, 'RES');
    useToaster(res.message, 'success');
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
});

onMounted(async () => {
  await fetchIngridients(1);
});

onUnmounted(() => {
  form.clearFormField();
});

async function fetchIngridients(page?: number) {
  await store.loadIngridients({ params: { limit: 6, page } }, true);
}

async function searchFn(val, data = null) {
  data = data
    ? data
    : {
        filters: { title: `LIKE(${val})` },
      };
  return await store.loadFilteredIngridients(data);
}
</script>

<style scoped></style>
