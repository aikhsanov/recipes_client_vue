<template>
  <BaseModal class="min-h-48 lg:h-[45rem] lg:w-[70rem]">
    <template #prepend>
      <div id="reg-img-wrap" class="w-full h-full">
        <img src="../../assets/img/reg/reg_img_2.jpg" class="h-full w-full object-cover" />
      </div>
    </template>
    <template #default>
      <div id="reg-form-wrap" class="w-full h-full">
        <h3 class="mb-5">Регистрация</h3>
        <form @submit="register" class="flex flex-col justify-between h-3/4">
          <div>
            <ValidationInput id="username" placeholder="username" label="Имя" name="username" />
            <ValidationInput id="email" placeholder="email" label="Email" name="email" />
            <ValidationInput id="password" placeholder="password" label="Пароль" name="password" />
          </div>
          <BaseButton
            type="submit"
            text="Регистрация"
            class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-300"
          />
        </form>
      </div>
    </template>
    <template #activator="{ toggle }">
      <BaseButton
        type="button"
        text="Войти"
        @click="toggle"
        class="bg-[#F06543] text-white border-none w-32 bg-gray-200"
      ></BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api/api';
import { storeToken } from '@/helpers/token';
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import auth from '@/api/auth';
import BaseModal from '@/components/base/BaseModal.vue';

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    username: '',
    email: '',
    password: '',
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
