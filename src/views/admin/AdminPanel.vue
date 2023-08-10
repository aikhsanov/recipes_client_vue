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
    </div>
  </main>
</template>

<script setup lang="ts">
import ValidationInput from '@/components/validation/ValidationInput.vue';
import ValidationSelect from '@/components/validation/ValidationSelect.vue';
import ingridients from '@/api/ingridients';
import { ref } from 'vue';
import Select from '@/components/base/Select.vue';

const testInput = ref('');
const multiselect = ref('');
const validSelect = ref('');
const options = ref([]);

async function searchFn(val) {
  return await ingridients.getAllFiltered({
    filters: { name: `LIKE(${val})` },
  });
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
