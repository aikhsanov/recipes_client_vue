<template>
  <div class="max-w-2xl">
    <div id="reg-form-wrap" class="w-1/2">
      <h3 class="mb-5">Регистрация</h3>
      <form @submit="register">
        <ValidationInput id="username" placeholder="username" label="Username" name="username" />
        <ValidationInput id="email" placeholder="email" label="Email" name="email" />
        <ValidationInput id="password" placeholder="password" label="Пароль" name="password" />
        <BaseButton type="submit" text="Регистрация" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api/api';
import { storeToken } from '@/helpers/token';
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import auth from '@/api/auth';

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    username: 'krasav4ik',
    email: 'admin@test.ru',
    password: '123456',
  },
  validationSchema: {
    email: 'required|email',
    password: 'required',
    username: 'required',
  },
});

const register = handleSubmit(async (values, actions) => {
  try {
    const res = await auth.register({
      email: values.email,
      username: values.username,
      password: values.password,
    });
    console.log(res);
  } catch (e) {
    actions.setErrors({ username: e.message });
  }
});
</script>

<style scoped></style>
