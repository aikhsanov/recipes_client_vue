<template>
  <div class="flex-col">
    <h3 class="mb-5">Регистрация</h3>
    <form @submit="register">
      <ValidationInput id="username" placeholder="username" label="Username" name="username" />
      <ValidationInput id="email" placeholder="email" label="Email" name="email" />
      <ValidationInput id="password" placeholder="password" label="Пароль" name="password" />
      <BaseButton type="submit" text="Регистрация" />
    </form>
  </div>
  <div class="flex-col mt-5">
    <h3 class="mb-5">Логин</h3>
    <ValidationInput
      id="email2"
      placeholder="email"
      label="Email"
      v-model="emailModel"
      name="loginEmail"
    />
    <ValidationInput
      id="password"
      placeholder="password"
      label="Пароль"
      name="loginPass"
      v-model="loginPass"
    />
    <BaseButton @click.prevent="login" text="Логин"></BaseButton>
  </div>
  <BaseButton @click.prevent="getMe" text="Get Me"></BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Register',
});
</script>
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

const emailModel = ref('admin@test.ru');
const loginPass = ref('123456');
const register = handleSubmit(async (values, actions) => {
  try {
    const res = await auth.register({
      email: values.email,
      username: values.username,
      password: values.password,
    });
    console.log(res);
  } catch (e) {
    actions.setErrors({ password: error.response.data.error });
  }
});
async function login() {
  const res = await auth.login({
    email: emailModel.value,
    password: loginPass.value,
  });
  if (res?.data?.user) {
    storeToken(res?.data?.user?.token);
  }

  console.log(res);
}

async function getMe() {
  const res = await api.get('/me');
}
</script>

<style scoped></style>
