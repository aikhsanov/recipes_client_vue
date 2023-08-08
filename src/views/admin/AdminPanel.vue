<template>
  <h5>Hello, this is admin panel!</h5>
  <main class="mt-5">
    <div class="flex flex-row justify-between">
      <div class="w-48">
        <ValidationInput name="test" v-model="testInput" placeholder="test" id="testInput" />
        <h5>testInput: {{ testInput }}</h5>
      </div>
      <div class="w-48">
        <Multiselect v-model="multiselect" :options="options" />
        <h5>multiselect: {{ multiselect }}</h5>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import Multiselect from '@vueform/multiselect';

import { ref } from 'vue';
const testInput = ref('');
const multiselect = ref('');
const options = ref(['Batman', 'Robin', 'Joker']);
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
