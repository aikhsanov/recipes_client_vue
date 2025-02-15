<template>
  <form @submit.prevent="onSubmit" class="mt-5" autocomplete="off">
    <template class="flex flex-row">
      <div class="w-full">
        <ValidationInput name="title" label="Название рецепта" class="mt-0" id="recipe-name" />

        <ValidationInput
          name="short_dsc"
          label="Короткое описание"
          placeholder=""
          id="recipe-desc"
          type="textarea"
        />
        <ValidationSelect
          class=""
          name="category_id"
          label="Выберите категорию"
          placeholder="Одна или несколько категорий"
          searchable
          :options="categoriesCollection"
          :clearOnBlur="false"
          mode="tags"
          closeOnSelect
        />
        <ValidationFileUpload name="img_url" label="Обложка рецепта" preview />
        <hr class="my-5" />
        <ValidationInput
          class="xs:max-sm:w-full w-2/4"
          name="cooking_time"
          label="Время приготовления в мин."
          maska="#######"
        />
        <ValidationInput
          class="xs:max-sm:w-full w-2/4"
          name="portion"
          label="Количество порций"
          maska="#######"
        />
        <hr class="my-5" />
        <div class="add-recipe-descritpion">
          <div class="" v-for="(step, ind) in stepsFields" :key="`steps-${step.key}`">
            <ValidationInput
              :name="`recipe_steps[${ind}].description`"
              label="Описание шага"
              id="recipe-desc"
              type="textarea"
            />
            <ValidationFileUpload
              :name="`recipe_steps[${ind}].img_url`"
              label="Фото шага"
              preview
            />
            <BaseButton type="button" text="Удалить шаг" @click="removeStep(ind)" />
            <hr class="my-3" />
          </div>
          <BaseButton type="button" text="Добавить шаг" @click="addStep" />
        </div>
        <div class="add-recipe-ingridients">
          <div class="" v-for="(ingr, ind) in ingrFields" :key="`ingridients-${ingr.key}`">
            <div class="flex md:flex-row xs:flex-col mt-5 items-end justify-between gap-x-2">
              <ValidationSelect
                class="xs:w-full md:w-2/4"
                :name="`recipe_ingridients[${ind}].ingridientId`"
                label="Выберите ингредиент"
                placeholder="Ингредиент"
                searchable
                :options="ingridientsCollection"
                :clearOnBlur="false"
                closeOnSelect
              />
              <ValidationSelect
                class="xs:w-full md:w-1/4"
                :name="`recipe_ingridients[${ind}].unit_cid`"
                label="Мера"
                placeholder="кг/гр"
                searchable
                :options="unitCollection"
                :clearOnBlur="true"
                closeOnSelect
              />
              <ValidationInput
                class="xs:w-full md:w-1/4"
                :name="`recipe_ingridients[${ind}].quantity`"
                label="Количество"
                placeholder="1 - 100000"
                maska="0.99"
                maskaTokens="0:\d:multiple|9:\d:optional"
              />
              <BaseButton
                type="button"
                class="my-3 bg-tomato-800 hover:bg-tomato-900 px-3 xs:max-sm:w-full"
                @click="removeIngrs(ind)"
              >
                <template #icn>
                  <IconBase icon-color="none" width="24" height="24"><IconTrash /></IconBase>
                </template>
              </BaseButton>
            </div>
            <hr class="my-5" />
          </div>
          <BaseButton class="mb-3" type="button" text="Добавить ингредиент" @click="addIngrs" />
        </div>
      </div>
    </template>
    <BaseButton type="submit" :text="edit ? 'Сохранить изменения' : 'Добавить рецепт'" />
  </form>
</template>

<script setup lang="ts">
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import ValidationInput from '@/components/validation/ValidationInput.vue';
import collections from '@/api/collections';
import ingridients from '@/api/ingridients';
import categories from '@/api/categories';
import recipesApi from '@/api/recipes';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';
import { useFieldArray, useForm, useIsFormDirty, useIsFormValid } from 'vee-validate';
import { useRecipesStore } from '@/stores/recipes';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import prepareForm, { prepareFn } from '@/helpers/form';
import IconBase from '@/components/icons/IconBase.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import useToaster from '@/composables/useToaster';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const recipes = useRecipesStore();
const auth = useAuthStore();
const validationSchema = computed<object>(() => {
  const obj = {
    title: 'required',
    short_dsc: 'required',
    category_id: 'required',
    recipe_steps: 'required',
    cooking_time: 'required',
    portion: 'required',
    img_url: 'required',
    recipe_ingridients: 'required',
  };

  return obj;
});

const edit = ref<boolean>(false);
const router = useRouter();
const categoriesCollection = ref<[]>([]);
const ingridientsCollection = ref<[]>([]);
const unitCollection = ref<[]>([]);

const { handleSubmit, setFieldError, validateField, setValues, resetForm, errors, errorBag } =
  useForm({
    validationSchema,
  });

onMounted(async () => {
  console.log('mounted');

  // await recipesApi.getAll();
  categoriesCollection.value = (await categories.getAll())?.data?.data;
  ingridientsCollection.value = (await ingridients.getAll())?.data?.data;
  unitCollection.value = (
    await collections.getAllFiltered({ filters: { collection: 'EQ(units)' } })
  )?.data?.data;
  if (recipes.getCurrentRecipe) {
    initRecipeEdit();
    return;
  }
  addIngrs();
  addStep();
});

onBeforeUnmount(() => {
  recipes.clearState();
});

function addIngrs() {
  ingrPush({ ingridientId: null, unit_cid: null, quantity: null });
}
function removeIngrs(ind) {
  if (ind === 0) {
    useToaster('Рецепт должен содержать хотя бы 1 ингредиент!', 'warning');
    return;
  }
  ingrRemove(ind);
}

function addStep() {
  stepsPush({
    order: stepsFields.value.length + 1,
    description: '',
    img_url: '',
  });
}
function removeStep(ind) {
  if (ind === 0) {
    useToaster('Рецепт должен содержать хотя бы 1 шаг!', 'warning');
    return;
  }
  stepsRemove(ind);
}
function initRecipeEdit() {
  edit.value = true;
  resetForm({
    values: {
      ...recipes.getCurrentRecipe,
    },
  });
}

const {
  remove: ingrRemove,
  push: ingrPush,
  fields: ingrFields,
} = useFieldArray('recipe_ingridients');
const { remove: stepsRemove, push: stepsPush, fields: stepsFields } = useFieldArray('recipe_steps');

async function onSuccess(values, actions) {
  try {
    validateDynamicFields(values, 'recipe_ingridients');
    validateDynamicFields(values, 'recipe_steps');

    if (Object.keys(errors.value)?.length) return;

    const data = {
      title: values.title,
      short_dsc: values.short_dsc,
      recipe_steps: values.recipe_steps,
      category_id: values.category_id,
      cooking_time: values.cooking_time,
      portion: values.portion,
      recipe_ingridients: values.recipe_ingridients,
      img_url: values.img_url,
    };

    const formData = new FormData();
    prepareFn(data, '', formData);

    // if (edit.value) {
    //   usePrepareEditData(formData);
    // }

    let route;
    if (edit.value) {
      await recipes.updateRecipe(recipes.getCurrentRecipe.id, formData);
      route = `/recipes/${recipes.getCurrentRecipe.id}`;
    } else {
      const res = await recipes.createRecipe(formData);
      route = `/recipes/${res?.id}`;
    }
    await router.push(route);
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
}

function onInvalidSubmit({ values, errors, results }) {
  validateDynamicFields(values, 'recipe_ingridients');
  validateDynamicFields(values, 'recipe_steps');
}

function validateDynamicFields(values, mainName) {
  // console.log(values[mainName], mainName, 'values[mainName]');
  values[mainName]?.forEach((obj, ind) => {
    for (const o in obj) {
      if (!obj[o]) {
        if (o !== 'step_img_url') {
          setFieldError(`${mainName}[${ind}].${o}`, `Поле должны быть заполнено`);
        }
      }
    }
  });
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

// const onSubmit = () => {
//   const p = validate();
//   console.log(p);
// };
</script>

<style scoped></style>
