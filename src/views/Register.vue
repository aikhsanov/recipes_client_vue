<template>
  <div class="flex-col">
    <h3>Регистрация</h3>
    <form @submit="register">
      <Input id="username" placeholder="username" label="Username" name="username" />
      <Input id="email" placeholder="email" label="Email" name="email" />
      <Input id="password" placeholder="password" label="Пароль" name="password" />
      <BaseButton type="submit" text="Регистрация" />
    </form>
  </div>
  <div class="flex-col">
    <h3>Логин</h3>
    <Input id="email2" placeholder="email" label="Email" v-model="emailModel" name="loginEmail" />
    <Input
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
import api from '../config/api';
import { storeToken } from '@/helpers/token';
import Input from '@/components/base/Input.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import auth from '@/api/auth/auth';

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
