<template>
  <input v-model="username" id="username" placeholder="username" />
  <input v-model="email" id="email" placeholder="email" />
  <input v-model="password" id="password" placeholder="password" />
  <button type="submit" @click.prevent="register">Регистрация</button>
</template>

<script>
export default {
  name: 'Register',
};
</script>
<script setup>
import { ref } from 'vue';
import api from '../config/api';

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
</script>

<style scoped></style>
