<template>
  <h5>Hello, this is admin panel!</h5>
  <main class="mt-5">
    <div class="grid grid-cols-3 gap-5">
      <div class="col-span-1">
        <ValidationInput name="test" v-model="testInput" placeholder="test" id="testInput" />
        <h5>testInput: {{ testInput }}</h5>
      </div>
      <div class="col-span-1">
        <Select
          v-model="multiselect"
          name="testSelect"
          placeholder="testSelect"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
        />
        <h5>multiselect: {{ multiselect }}</h5>
      </div>
      <div class="col-span-1">
        <ValidationSelect
          v-model="validSelect"
          name="testSelect"
          placeholder="testSelect"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
        />
        <h5>validationSelect: {{ validSelect }}</h5>
      </div>
      <div class="col-span-1">
        <FileUpload entityId="1" apiName="ingridients" preview />
      </div>
    </div>
    <hr class="my-5" />
    <div class="flex flex-col">
      <h5 class="mb-5">Проверка валидации</h5>
      <div>
        <ValidationInput
          name="testInputValid"
          v-model="testInputValid"
          placeholder="testInputName"
          id="testInputName"
        />
        <ValidationSelect
          v-model="testSelectValid"
          name="testSelectValid"
          placeholder="testSelectValid"
          searchable
          :searchFn="searchFn"
          :clearOnBlur="false"
          closeOnSelect
        />
        <ValidationFileUpload
          v-model="testUploadValid"
          name="testUploadValid"
          placeholder="testUploadValid"
          entityId="1"
          apiName="ingridients"
          preview
        />
        <BaseButton @click="onSubmit" text="Отправить" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import ingridients from '@/api/ingridients';
import { ref } from 'vue';
import Select from '@/components/base/Select.vue';
import { useForm } from 'vee-validate';
import auth from '@/api/auth';
import BaseButton from '@/components/base/BaseButton.vue';
import FileUpload from '@/components/base/FileUpload.vue';
import ValidationFileUpload from '@/components/validation/ValidationFileUpload.vue';

const testInput = ref('');
const multiselect = ref('');
const validSelect = ref(3);
const testInputValid = ref('');
const testSelectValid = ref('');
const testUploadValid = ref('');
const options = ref([]);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    testInputValid: 'required',
    testSelectValid: 'required',
    testUploadValid: 'required',
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    console.log(values.testInputValid, values.testSelectValid, values.testUploadValid);
  } catch (e) {
    actions.setErrors({ password: error.response.data.error });
  }
});

async function searchFn(val, data = null) {
  data = data
    ? data
    : {
        filters: { name: `LIKE(${val})` },
      };
  return await ingridients.getAllFiltered(data);
}
</script>

<style></style>
