<template>
  <BaseModal class="min-h-48 lg:h-[45rem] lg:w-[70rem]" ref="modal">
    <template #modal-header-controls>
      <button
        v-if="!gotAccount"
        type="button"
        @click="onAuthChange"
        class="
          text-gray-400
          bg-transparent
          hover:bg-gray-200 hover:text-gray-900
          rounded-lg
          text-sm
          p-1.5
          mr-auto
          inline-flex
          items-center
          dark:hover:bg-gray-800 dark:hover:text-white
        "
        data-modal-toggle="authentication-modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </template>
    <template #prepend>
      <div id="auth-img-wrap" class="w-full h-full">
        <img src="../../assets/img/reg/reg_img_2.jpg" class="h-full w-full object-cover" />
      </div>
    </template>
    <template #default>
      <template v-if="!loading">
        <div id="auth-login-form-wrap" class="w-full h-full" v-if="gotAccount">
          <h3 class="mb-10 font-bold text-xl text-center">
            Войдите или
            <a type="button" class="cursor-pointer text-blue-berry-500" @click="onAuthChange"
              >зарегистрируйтесь</a
            >
          </h3>
          <form @submit="onLogin" class="flex flex-col justify-between h-3/4">
            <div class="bg-gray-50 p-5">
              <ValidationInput id="email" placeholder="email" label="Email" name="email" />
              <ValidationInput
                id="password"
                placeholder="password"
                label="Пароль"
                name="password"
              />
            </div>
            <BaseButton
              type="submit"
              text="Войти"
              class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-800"
            />
          </form>
        </div>
        <div id="auth-reg-form-wrap" class="w-full h-full" v-else>
          <h3 class="mb-10 font-bold text-xl text-center">Регистрация</h3>
          <form @submit="register" class="flex flex-col justify-between h-3/4">
            <div class="bg-gray-50 p-5">
              <ValidationInput id="username" placeholder="username" label="Имя" name="username" />
              <ValidationInput id="email" placeholder="email" label="Email" name="email" />
              <ValidationInput
                id="password"
                placeholder="password"
                label="Пароль"
                name="password"
              />
            </div>
            <BaseButton
              type="submit"
              text="Зарегистрироваться"
              class="text-white w-full bg-light-slate-gray-900 hover:bg-light-slate-gray-800"
            />
          </form>
        </div>
      </template>
      <Spinner v-if="loading"></Spinner>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ValidationInput from '@/components/validation/ValidationInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useForm } from 'vee-validate';
import BaseModal from '@/components/base/BaseModal.vue';
import { useAuthStore } from '@/stores/auth';
import { User } from '@/types/user';
import Spinner from '@/components/ui/Spinner.vue';

const auth = useAuthStore();

const gotAccount = ref<boolean>(true);
const loading = ref<boolean>(false);
const modal = ref<HTMLDivElement>();
const validationSchema = computed<object>(() => ({
  email: 'required|email',
  password: 'required',
  username: gotAccount.value ? '' : 'required',
}));

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    username: '',
    email: '',
    password: '',
  },
  validationSchema,
});

const register = handleSubmit(async (values, actions) => {
  try {
    loading.value = true;
    const res = await auth.register({
      email: values.email,
      username: values.username,
      password: values.password,
    });
    if (res.data) {
      loading.value = false;
    }
  } catch (e) {
    actions.setErrors({ username: e.message });
  }
});

const onLogin = handleSubmit(async (values, actions) => {
  try {
    const res = await auth.login({
      email: values.email,
      password: values.password,
    });
    if (res.data) {
      loading.value = false;
      modal.value.toggleOpen();
    }
  } catch (e) {
    actions.setErrors({ email: e.message });
  }
});

function onAuthChange() {
  gotAccount.value = !gotAccount.value;
}
</script>

<style scoped></style>
