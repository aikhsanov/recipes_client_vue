<template>
  <div class="flex-col">
    <h3>Регистрация</h3>
    <Input id="username" placeholder="username" label="Username" name="username" />
    <Input id="email" placeholder="email" label="Email" name="email" />
    <Input id="password" placeholder="password" label="Пароль" name="password" />
    <button type="submit" @click.prevent="register">Регистрация</button>
  </div>
  <div class="flex-col">
    <h3>Логин</h3>
    <Input id="email2" placeholder="email" label="Email" v-model="emailModel" name="emailModel" />
    <Input id="password" placeholder="password" label="Пароль" />
    <button type="submit" @click.prevent="login">Логин</button>
  </div>
  <button type="submit" @click.prevent="getMe">Get Me</button>
</template>

<script>
export default {
  name: 'Register',
};
</script>
<script setup>
import { ref } from 'vue';
import api from '../config/api';
import { storeToken } from '@/helpers/token';
import Input from '@/components/base/Input.vue';
import { useForm } from 'vee-validate';

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    email: 'admin@test.ru',
    password: '123456',
    username: 'krasav4ik',
  },
  validationSchema: {
    email: 'required|email',
    password: 'required',
    username: 'required',
  },
});

const emailModel = ref('ahahahah');
const register = handleSubmit(async (values, actions) => {
  try {
    const res = await api.post('/auth/register', {
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
  const res = await api.post('/auth/login', {
    email: email.value,
    password: password.value,
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
