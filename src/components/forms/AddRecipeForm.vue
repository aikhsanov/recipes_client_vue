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
    <div class="add-recipe-ingridients">
      <div class="flex flex-row" v-for="(ingr, ind) in ingrs" :key="ind">
        <ValidationSelect
          class="w-1/4 mr-5"
          :name="`ingridients-${ingr}`"
          label="Выберите ингридиенты"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
        />
        <ValidationInput
          class="w-1/4 mr-5"
          :name="`ingridientsQuantity-${ingr}`"
          label="Количество"
        />
        <ValidationInput class="w-1/4" :name="`ingridientUnit-${ingr}`" label="Мера" />
      </div>
      <BaseButton type="button" text="Добавить ингридиент" @click="increaseIngrs" />
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

function increaseIngrs() {
  ingrs.value += 1;
}

const validationSchema = computed<object>(() => {
  const obj = {
    recipeName: 'required',
    recipeShortDesc: 'required',
    recipeDesc: 'required',
    recipeFile: 'required',
  };
  for (let i = 1; i <= ingrs.value; i++) {
    obj[`ingridients-${i}`] = 'required';
    obj[`ingridientsQuantity-${i}`] = 'required';
    obj[`ingridientUnit-${i}`] = 'required';
  }
  return obj;
});

const { handleSubmit } = useForm({
  validationSchema,
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
    console.log(values, 'DATA');
    // await recipes.createRecipe(data);
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
