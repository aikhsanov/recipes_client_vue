<template>
  <form @submit.prevent="onSubmit" class="mt-5" autocomplete="off">
    <template class="flex flex-row">
      <div class="w-full">
        <ValidationInput name="username" label="Имя пользователя" class="mt-0" id="username" />
        <ValidationInput name="password" label="Новый пароль" class="mt-0" id="password" />

        <ValidationFileUpload name="user_img" label="Аватар" preview />
        <!--        <hr class="my-5" />-->
        <!--        <hr class="my-5" />-->
      </div>
    </template>
    <BaseButton type="submit" text="Сохранить изменения" />
  </form>
</template>

<script setup>
import ValidationInput from '../validation/ValidationInput.vue';
import BaseButton from '../base/BaseButton.vue';
import ValidationFileUpload from '../validation/ValidationFileUpload.vue';
import { useForm } from 'vee-validate';
import { useAuthStore } from '../../stores/auth';
import { onMounted } from 'vue';

const auth = useAuthStore();

onMounted(() => {
  initUserEdit();
});

const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: {
    username: '',
    password: '',
    user_img: '',
  },
});

function initUserEdit() {
  resetForm({
    values: {
      user_img: auth.getMe.user_img,
      username: auth.getMe.username,
    },
  });
}
const onSubmit = handleSubmit(async (values, actions) => {
  try {
    const data = new FormData();
    for (const key in values) {
      if (values[key]) data.append(`${key === 'user_img' ? 'file' : key}`, values[key]);
    }
    console.log(data, 'DATAA FROM SUBMIT');
    await auth.updateCurrentUser(data);
  } catch (e) {
    actions.setErrors({ username: e.message });
  }
});
</script>

<style scoped></style>
