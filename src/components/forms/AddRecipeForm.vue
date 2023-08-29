<template>
  <form @submit="onSubmit" class="mt-5">
    <ValidationInput name="recipeName" placeholder="" label="Название рецепта" id="recipe-name" />
    <ValidationInput
      name="recipeShortDesc"
      label="Короткое описание"
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
    <ValidationSelect
      name="ingridients"
      label="Выберите ингридиенты"
      searchable
      :searchFn="searchFn"
      :clearOnBlur="false"
      closeOnSelect
      mode="tags"
      :create-option="true"
    />
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

const recipes = useRecipesStore();

const { handleSubmit } = useForm({
  validationSchema: {
    recipeName: 'required',
    recipeShortDesc: 'required',
    recipeDesc: 'required',
    ingridients: 'required',
    recipeFile: 'required',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const data = {
      title: values.recipeName,
      short_dsc: values.recipeShortDesc,
      description: values.recipeDesc,
      ingridients: values.ingridients,
      img: values.recipeFile,
    };
    await recipes.createRecipe(data);
  } catch (e) {
    actions.setErrors({ name: e.message });
  }
});

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
