<template>
  <form @submit="onSubmit" class="mt-5" autocomplete="off">
    <template class="flex flex-row">
      <div class="w-3/4 mr-5">
        <ValidationInput
          name="recipeName"
          placeholder="Название рецепта"
          class="mt-0"
          label=""
          id="recipe-name"
        />

        <ValidationInput
          name="recipeShortDesc"
          label=""
          placeholder="Короткое описание"
          id="recipe-desc"
          type="textarea"
        />
        <ValidationSelect
          class="w-2/4 mr-5"
          name="categories"
          placeholder="Выберите категорию"
          searchable
          :searchFn="
            (val) => searchFn({ val, route: categories, filters: { title: `LIKE(${val})` } })
          "
          :clearOnBlur="false"
          mode="tags"
          closeOnSelect
        />
        <ValidationFileUpload name="recipeFile" label="Обложка рецепта" preview />
        <hr class="my-5" />
        <div class="add-recipe-descritpion">
          <div class="" v-for="(step, ind) in stepsFields" :key="`steps-${step.key}`">
            <ValidationInput
              :name="`description[${ind}].step_description`"
              placeholder="Описание шага"
              label=""
              id="recipe-desc"
              type="textarea"
            />
            <ValidationFileUpload
              :name="`description[${ind}].step_img_url`"
              label="Фото для шага"
              preview
            />
            <BaseButton type="button" text="Удалить шаг" @click="removeStep(ind)" />
            <hr class="my-3" />
          </div>
          <BaseButton type="button" text="Добавить шаг" @click="addStep" />
        </div>
        <div class="add-recipe-ingridients">
          <div class="" v-for="(ingr, ind) in ingrFields" :key="`ingridients-${ingr.key}`">
            <div class="flex flex-row mt-5 items-center">
              <ValidationSelect
                class="w-1/4 mr-5"
                :name="`ingridients[${ind}].id`"
                placeholder="Выберите ингредиенты"
                searchable
                :searchFn="(val) => searchFn({ val, route: ingridients })"
                :clearOnBlur="false"
                closeOnSelect
              />
              <ValidationSelect
                class="w-1/4 mr-5"
                :name="`ingridients[${ind}].unit_cid`"
                placeholder="Мера"
                searchable
                :searchFn="
                  (val) => searchFn({ val, route: collections, filters: { title: `EQ(${val})` } })
                "
                :clearOnBlur="false"
                closeOnSelect
              />
              <ValidationInput
                class="w-1/4 mr-5"
                :name="`ingridients[${ind}].quantity`"
                placeholder="Количество"
              />
              <BaseButton
                type="button"
                class="my-0 bg-tomato-800 hover:bg-tomato-900 px-3"
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
      <div class="block w-1/4 h-[80vh] border-2 border-gray-200"></div>
    </template>
    <BaseButton type="submit" text="Поехали" />
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
import { useFieldArray, useForm } from 'vee-validate';
import { useRecipesStore } from '@/stores/recipes';
import { Recipe } from '@/types/recipes';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref, onMounted } from 'vue';
import searchFn from '@/helpers/searchFn';

const recipes = useRecipesStore();

onMounted(async () => {
  await recipesApi.getAll();
  addIngrs();
  addStep();
});

function addIngrs() {
  ingrPush({ id: '', unit_cid: null, quantity: '' });
}
function removeIngrs(ind) {
  console.log(ind);
  ingrRemove(ind);
}

function addStep() {
  stepsPush({ step_num: stepsFields.value.length - 1, step_description: '', step_img_url: '' });
}
function removeStep(ind) {
  console.log(ind);
  stepsRemove(ind);
}

const validationSchema = computed<object>(() => {
  const obj = {
    recipeName: 'required',
    recipeShortDesc: 'required',
    categories: 'required',
    description: 'required',
    recipeFile: 'required',
    ingridients: 'required',
  };

  return obj;
});

const { handleSubmit, setFieldError, validateField } = useForm({
  validationSchema,
});

const { remove: ingrRemove, push: ingrPush, fields: ingrFields } = useFieldArray('ingridients');
const { remove: stepsRemove, push: stepsPush, fields: stepsFields } = useFieldArray('steps');

async function onSuccess(values, actions) {
  try {
    validateDynamicFields(values, 'ingridients');
    validateDynamicFields(values, 'description');

    // values.description = values.description.map(async (el) => {
    //   const res = await recipes.uploadRecipeImage(el.step_img_url);
    //   return { ...el, step_img_url: res.data };
    // });

    for (const el of values.description) {
      const res = await recipes.uploadRecipeImage(el.step_img_url);
      el.step_img_url = res.data;
    }

    const data = {
      title: values.recipeName,
      short_dsc: values.recipeShortDesc,
      description: values.description,
      categories: values.categories,
      ingridients: values.ingridients,
      img: values.recipeFile,
    };
    console.log(data);
    await recipes.createRecipe(data);
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
}
function onInvalidSubmit({ values, errors, results }) {
  debugger;
  validateDynamicFields(values, 'ingridients');
  validateDynamicFields(values, 'description');
}

function validateDynamicFields(values, mainName) {
  console.log(values[mainName], mainName, 'values[mainName]');
  values[mainName]?.forEach((obj, ind) => {
    for (const o in obj) {
      if (!obj[o]) {
        setFieldError(`${mainName}[${ind}].${o}`, `Поле должны быть заполнено`);
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
