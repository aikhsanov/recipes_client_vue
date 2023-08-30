<template>
  <form @submit="onSubmit" class="mt-5">
    <ValidationInput name="recipeName" placeholder="" label="Название рецепта" id="recipe-name" />
    <ValidationInput
      name="recipeShortDesc"
      label="Короткое описание"
      placeholder="Короткое описание"
      id="recipe-desc"
      type="textarea"
    />
    <ValidationInput
      name="recipeDesc"
      placeholder=""
      label="Рецепт"
      id="recipe-desc"
      type="textarea"
    />
    <div class="add-recipe-ingridients">
      <div class="flex flex-row" v-for="(ingr, ind) in ingrs" :key="`ingridients-${ingr}`">
        <ValidationSelect
          class="w-1/4 mr-5"
          :name="`ingridients[${ind}].id`"
          label="Выберите ингридиенты"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
        />
        <ValidationInput
          class="w-1/4 mr-5"
          :name="`ingridients[${ind}].quantity`"
          label="Количество"
        />
        <ValidationInput class="w-1/4" :name="`ingridients[${ind}].unit`" label="Мера" />
      </div>
      <BaseButton type="button" text="Добавить ингридиент" @click="addIngrs" />
      <BaseButton type="button" text="Удалить ингридиент" @click="removeIngrs" />
    </div>
    <ValidationFileUpload name="recipeFile" label="Обложка" preview />
    <BaseButton type="submit" text="Поехали" />
  </form>
</template>

<script setup lang="ts">
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import ValidationInput from '@/components/validation/ValidationInput.vue';
import ingridients from '@/api/ingridients';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';
import { useForm } from 'vee-validate';
import { useRecipesStore } from '@/stores/recipes';
import { Recipe } from '@/types/recipes';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';

const recipes = useRecipesStore();
const ingrs = ref<number>(1);

function addIngrs() {
  ingrs.value += 1;
}
function removeIngrs() {
  ingrs.value -= 1;
}

const validationSchema = computed<object>(() => {
  const obj = {
    recipeName: 'required',
    recipeShortDesc: 'required',
    recipeDesc: 'required',
    recipeFile: 'required',
    ingridients: 'required',
  };

  return obj;
});

const { handleSubmit, setFieldError, validateField } = useForm({
  validationSchema,
});
function onSuccess(values) {
  try {
    validateDynamicFields(values, 'ingridients');
    const data = {
      title: values.recipeName,
      short_dsc: values.recipeShortDesc,
      description: values.recipeDesc,
      ingridients: values.ingridients,
      img: values.recipeFile,
    };
    console.log(values, 'DATA');
    // await recipes.createRecipe(data);
  } catch (e) {
    // actions.setErrors({ name: e.message });
  }
}
function onInvalidSubmit({ values, errors, results }) {
  validateDynamicFields(values, 'ingridients');
}

function validateDynamicFields(values, mainName) {
  values.ingridients.forEach((obj, ind) => {
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

async function searchFn(val, data = null) {
  data = data
    ? data
    : {
        filters: { name: `LIKE(${val})` },
      };
  return await ingridients.getAllFiltered(data);
}
</script>

<style scoped></style>
