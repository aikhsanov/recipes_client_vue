<template>
  <form @submit.prevent="onSubmit" class="mt-5" autocomplete="off">
    <ValidationInput
      id="comment"
      placeholder="Комментарий"
      label="Комментарий"
      name="comment"
      type="textarea"
    />
    <BaseButton
      type="submit"
      text="Отправить"
      class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-800"
    />
  </form>
</template>

<script setup>
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { useAuthStore } from '../../stores/auth';
import { useRecipesStore } from '../../stores/recipes';
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const auth = useAuthStore();
const recipes = useRecipesStore();

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    comment: '',
  },
  validationSchema: {
    comment: 'required',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const res = await recipes.addComment(recipes.getCurrentRecipe.id, {
      comment: values.comment,
      userId: auth.getMe.id,
    });
    actions.resetForm();
  } catch (e) {
    actions.setErrors({ username: e.message });
  }
});
</script>

<style scoped></style>
