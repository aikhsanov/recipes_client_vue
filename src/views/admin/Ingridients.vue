<template>
  <div class="flex-col w-1/3">
    <h3>Добавление и просмотр доступных ингридиентов</h3>
    <form @submit="onSubmit" class="mt-12">
      <ValidationInput id="ingridient-name" placeholder="username" label="Название" name="name" />
      <ValidationInput
        id="ingridient-desc"
        placeholder=" "
        label="Описание"
        name="description"
        type="textarea"
      />
      <BaseButton type="submit" text="Добавить" />
      {{ IngridientFiltered }}
      <!--      <ValidationSelect />-->
    </form>
    <InfiniteScroll :loadFn="fetchIngridients">
      <div v-for="ingr in allIngridients" :key="ingr.name">
        <h5>{{ ingr.name }}</h5>
      </div>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import auth from '@/api/auth';
import ingridients from '@/api/ingridients';
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import { onMounted, ref } from 'vue';
import InfiniteScroll from '@/components/tools/InfiniteScroll.vue';

const IngridientFiltered = ref('');
const allIngridients = ref([]);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    name: 'required',
    description: 'required',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const res = await ingridients.create({
      name: values.name,
      description: values.description,
    });
    console.log(res);
  } catch (e) {
    actions.setErrors({ password: error.response.data.error });
  }
});

// onMounted(async () => {
//   IngridientFiltered.value = await ingridients.getAllFiltered({
//     filters: { name: 'EQ(гриб)' },
//   });
// });

async function fetchIngridients(page) {
  allIngridients.value = await ingridients.getAll({ limit: 5, offset: page });
}
</script>

<style scoped></style>
