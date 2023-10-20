<template>
  <div class="flex flex-row">
    <div class="flex-col w-1/2 mx-auto">
      <h3 class="font-bold text-xl text-center">
        Добавление и редактирование доступных ингредиентов
      </h3>
      <div class="mt-12">
        <Select
          v-model="selectedIngr"
          placeholder="Выберите ингредиент"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
          @select="onEdit"
          label="Поиск по ингредиентам"
        />
        <form @submit="onSubmit" class="mt-12">
          <ValidationInput
            id="ingridient-title"
            placeholder="Название ингредиента"
            label="Название"
            name="title"
          />
          <ValidationInput
            id="ingridient-desc"
            placeholder=" "
            label="Описание"
            name="description"
            type="textarea"
          />
          <!--          <ValidationFileUpload-->
          <!--            id="ingridient-img"-->
          <!--            name="ingridientImg"-->
          <!--            label="Изображение"-->
          <!--            preview-->
          <!--          />-->
          <div class="grid gap-6 grid-cols-1" v-if="!selectedIngr">
            <BaseButton type="submit" text="Добавить" />
          </div>
          <div class="grid gap-6 grid-cols-2" v-else>
            <BaseButton type="button" text="Сохранить" @click.prevent="editOnSave" />
            <BaseButton
              class="bg-tomato-900 hover:bg-tomato-700"
              type="button"
              text="Удалить"
              @click="onDelete"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';

import Select from '@/components/base/Select.vue';
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';
import { useIngridientsStore } from '@/stores/ingridients';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';
import { useFormStore } from '@/stores/form';
import usePrepareEditData from '@/composables/usePrepareEditData.js';
import useToaster from '@/composables/useToaster';

const IngridientFiltered = ref<number | string>('');

const form = useFormStore();
const store = useIngridientsStore();

const selectedIngr = ref<number | string>('');

const { handleSubmit, isSubmitting, setValues, setTouched, meta, resetForm } = useForm({
  initialValues: {
    title: '',
    description: '',
    ingridientImg: '',
    fetchedIng: '',
  },
  validationSchema: {
    title: '',
    description: '',
    ingridientImg: '',
    fetchedIng: '',
  },
});
const id = computed(() => store?.getCurrentIngridient.id);

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const data = {
      title: values.title,
      description: values.description,
    };
    await store.createIngridient(data);
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
});

const editOnSave = handleSubmit(async (values, actions) => {
  try {
    const data = {
      title: values.title,
      description: values.description,
    };
    await store.updateIngridient(id.value, data);
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
});

const onEdit = handleSubmit(async (values, actions) => {
  try {
    await store.loadIngridientById(selectedIngr.value);
    if (store?.getCurrentIngridient) {
      const { title, description, img_url } = store.getCurrentIngridient;
      console.log(title, description, img_url);
      resetForm({
        values: {
          title,
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
