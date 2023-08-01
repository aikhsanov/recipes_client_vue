<template>
  <div class="flex-col">
    <h3>Регистрация</h3>
    <input v-model="username" id="username" placeholder="username" />
    <input v-model="email" id="email" placeholder="email" />
    <Input v-model="password" id="password" placeholder="password" labelText="Пароль" />
    <button type="submit" @click.prevent="register">Регистрация</button>
  </div>
  <div class="flex-col">
    <h3>Логин</h3>
    <input v-model="email" id="email" placeholder="email" />
    <input v-model="password" id="password" placeholder="password" />
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
import Input from "@/components/base/Input.vue";

const email = ref('');
const username = ref('');
const password = ref('');

async function register() {
  const res = await api.post('/auth/register', {
    email: email.value,
    username: username.value,
    password: password.value,
  });
  console.log(res);
}
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
