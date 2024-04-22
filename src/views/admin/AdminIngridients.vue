<template>
  <div class="">
    <div class="flex flex-row justify-between mb-8 items-end">
      <h3 class="font-bold text-xl">Добавление и редактирование доступных ингредиентов</h3>
      <BaseButton type="submit" text="Добавить" @click="toggleForm" />
    </div>
    <div class="flex-col w-1/2 mx-auto" v-if="showForm">
      <div class="mt-12">
        <!--        <Select-->
        <!--          v-model="selectedIngr"-->
        <!--          placeholder="Выберите ингредиент"-->
        <!--          searchable-->
        <!--          :searchFn="searchFn"-->
        <!--          :clearOnBlur="false"-->
        <!--          closeOnSelect-->
        <!--          @select="onEdit"-->
        <!--          label="Поиск по ингредиентам"-->
        <!--        />-->
        <form @submit="onSubmit" class="my-12">
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
          <ValidationFileUpload name="ingridientImg" label="Фото ингредиента" preview />

          <div class="grid gap-6 grid-cols-1" v-if="!selectedIngr">
            <BaseButton type="submit" text="Добавить" />
          </div>
          <div class="grid gap-6 grid-cols-1" v-else>
            <BaseButton type="button" text="Сохранить" @click.prevent="editOnSave" />
          </div>
          <div class="grid gap-6 grid-cols-1 mt-3" v-if="showForm" @click="toggleForm">
            <BaseButton mode="danger" text="Отмена" />
          </div>
        </form>
      </div>
    </div>
    <TableComponent
      :rows="ingridients.getIngridients"
      :page-meta="ingridients.getDataMeta"
      :columns="columns"
      :fetch-fn="ingridients.loadIngridients"
      :onDelete="onDelete"
      :onEdit="onEdit"
    />
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
import TableComponent from '@/components/base/TableComponent.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import BaseConfirm from '@/components/base/BaseConfirm.vue';
import useModal from '@/composables/useModal';
import { prepareFn } from '@/helpers/form';

const { confirm } = useModal();

const IngridientFiltered = ref<number | string>('');

const form = useFormStore();
const ingridients = useIngridientsStore();

const selectedIngr = ref<number | string>('');
const showForm = ref<boolean>(false);

const columns: { name: string; value: string; boolean?: boolean }[] = [
  { name: '#', value: 'id' },
  { name: 'Название', value: 'title' },
  { name: 'Описание', value: 'description' },
  { name: 'Изображение', value: 'img_url', boolean: true },
];

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
const id = computed(() => ingridients?.getCurrentIngridient.id);

const onSubmit = handleSubmit(async (values, actions) => {
  console.log(values, 'values');
  try {
    const data = {
      title: values.title,
      description: values.description,
      img_url: values.ingridientImg,
    };
    const formData = new FormData();
    prepareFn(data, '', formData);
    await ingridients.createIngridient(formData);
    actions.resetForm();
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
});

const editOnSave = handleSubmit(async (values, actions) => {
  try {
    const data = {
      title: values.title,
      description: values.description,
      img_url: values.ingridientImg,
    };
    const formData = new FormData();
    prepareFn(data, '', formData);
    await ingridients.updateIngridient(id.value, formData);
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
});

const onEdit = async (id) => {
  try {
    await ingridients.loadIngridientById(id);
    showForm.value = true;
    selectedIngr.value = id;
    if (ingridients?.getCurrentIngridient) {
      const { title, description, img_url } = ingridients.getCurrentIngridient;
      console.log(title, description, img_url);
      resetForm({
        values: {
          title,
          description,
          ingridientImg: img_url,
        },
      });
    }
  } catch (e) {
    useToaster(e, 'error');
    throw new Error(e);
  }
};

const onDelete = handleSubmit(async (values, actions) => {
  try {
    const conf = await confirm();
    console.log(conf, 'CONF');
    // const res = await ingridients.deleteIngridient(values.selectedIngr);
    // console.log(res, 'RES');
    // useToaster(res.message, 'success');
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
  await ingridients.loadIngridients({ page });
}

function toggleForm() {
  showForm.value = !showForm.value;
}

async function searchFn(val, data = null) {
  data = data
    ? data
    : {
        filters: { title: `LIKE(${val})` },
      };
  return await ingridients.loadFilteredIngridients(data);
}
</script>

<style scoped></style>
