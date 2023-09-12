<template>
  <form @submit="onSubmit" class="mt-5" autocomplete="off">
    <template class="flex flex-row">
      <div class="w-3/4 mr-5">
        <ValidationInput name="title" label="Название рецепта" class="mt-0" id="recipe-name" />

        <ValidationInput
          name="short_dsc"
          label="Короткое описание"
          placeholder=""
          id="recipe-desc"
          type="textarea"
        />
        <ValidationSelect
          class="w-2/4 mr-5"
          name="category_id"
          label="Выберите категорию"
          placeholder="Одна или несколько категорий"
          searchable
          :searchFn="
            (val, filters) =>
              searchFn({ val, route: categories, filters: filters || { title: `LIKE(${val})` } })
          "
          :clearOnBlur="false"
          mode="tags"
          closeOnSelect
        />
        <ValidationFileUpload name="img_url" label="Обложка рецепта" preview />
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
            <div class="flex flex-row mt-5 items-end">
              <ValidationSelect
                class="w-1/4 mr-5"
                :name="`ingridients[${ind}].ingridientId`"
                label="Выберите ингредиент"
                placeholder="Ингредиент"
                searchable
                :searchFn="(val, filters) => searchFn({ val, route: ingridients, filters })"
                :clearOnBlur="false"
                closeOnSelect
              />
              <ValidationSelect
                class="w-1/4 mr-5"
                :name="`ingridients[${ind}].unit_cid`"
                label="Мера"
                placeholder="кг/гр"
                searchable
                :searchFn="
                  (val, filters) =>
                    searchFn({
                      val,
                      route: collections,
                      filters: filters || { title: `LIKE(${val})` },
                    })
                "
                :clearOnBlur="false"
                closeOnSelect
              />
              <ValidationInput
                class="w-1/4 mr-5"
                :name="`ingridients[${ind}].quantity`"
                label="Количество"
                placeholder="1 - 100000"
                maska="#######"
              />
              <BaseButton
                type="button"
                class="my-3 bg-tomato-800 hover:bg-tomato-900 px-3"
                @click="removeIngrs(ind)"
              >
                <template #icn>
                  <i class="icn icn-trash"></i>
                </template>
              </BaseButton>
            </div>
            <hr class="my-5" />
          </div>
          <BaseButton type="button" text="Добавить ингредиент" @click="addIngrs" />
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
import { useFieldArray, useForm, useIsFormDirty } from 'vee-validate';
import { useRecipesStore } from '@/stores/recipes';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref, onMounted } from 'vue';
import searchFn from '@/helpers/searchFn';
import prepareForm, { prepareFn } from '@/helpers/form';

const recipes = useRecipesStore();
const validationSchema = computed<object>(() => {
  const obj = {
    title: 'required',
    short_dsc: 'required',
    category_id: 'required',
    recipe_steps: 'required',
    img_url: 'required',
    ingridients: 'required',
  };

  return obj;
});

const edit = ref<boolean>(false);

const { handleSubmit, setFieldError, validateField, setValues, resetForm } = useForm({
  validationSchema,
});

onMounted(async () => {
  if (recipes.getCurrentRecipe) {
    initRecipeEdit();
    return;
  }
  await recipesApi.getAll();
  addIngrs();
  addStep();
});

function addIngrs() {
  ingrPush({ id: '', unit_cid: null, quantity: '' });
}
function removeIngrs(ind) {
  ingrRemove(ind);
}

function addStep() {
  stepsPush({
    order: stepsFields.value.length,
    description: '',
    img_url: '',
  });
}
function removeStep(ind) {
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

const { remove: ingrRemove, push: ingrPush, fields: ingrFields } = useFieldArray('ingridients');
const { remove: stepsRemove, push: stepsPush, fields: stepsFields } = useFieldArray('description');

async function onSuccess(values, actions) {
  try {
    validateDynamicFields(values, 'ingridients');
    validateDynamicFields(values, 'description');

    const data = {
      title: values.title,
      short_dsc: values.short_dsc,
      recipe_steps: values.recipe_steps,
      category_id: values.category_id,
      ingridients: values.ingridients,
      img_url: values.img_url,
    };

    const formData = new FormData();
    prepareFn(data, '', formData);

    // if (edit.value) {
    //   usePrepareEditData(formData);
    // }

    if (edit.value) {
      await recipes.updateRecipe(recipes.getCurrentRecipe.id, formData);
    } else {
      await recipes.createRecipe(formData);
    }
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
}

function onInvalidSubmit({ values, errors, results }) {
  console.log(errors, 'ERRORS');

  validateDynamicFields(values, 'ingridients');
  validateDynamicFields(values, 'description');
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
