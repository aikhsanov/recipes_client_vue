<template>
  <section class="bg-white dark:bg-gray-900">
    <h2 class="mb-4 text-2xl text-center">Добавить рецепт</h2>
    <div class="">
      <Form @submit="onSubmit">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Заголовок</label
            >
            <Field v-slot="{ field, errors }" name="title" rules="required">
              <input
                v-bind="field"
                name="title"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Заголовок"
              />
              <div v-if="errors[0]">{{ errors[0] }}</div>
            </Field>
          </div>
          <!--          <div class="w-full">-->
          <!--            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"-->
          <!--              >Brand</label-->
          <!--            >-->
          <!--            <input-->
          <!--              type="text"-->
          <!--              name="brand"-->
          <!--              id="brand"-->
          <!--              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"-->
          <!--              placeholder="Product brand"-->
          <!--              required=""-->
          <!--            />-->
          <!--          </div>-->
          <!--          <div class="w-full">-->
          <!--            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"-->
          <!--              >Price</label-->
          <!--            >-->
          <!--            <input-->
          <!--              type="number"-->
          <!--              name="price"-->
          <!--              id="price"-->
          <!--              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"-->
          <!--              placeholder="$2999"-->
          <!--              required=""-->
          <!--            />-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <label-->
          <!--              for="category"-->
          <!--              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"-->
          <!--              >Category</label-->
          <!--            >-->
          <!--            <select-->
          <!--              id="category"-->
          <!--              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"-->
          <!--            >-->
          <!--              <option selected="">Select category</option>-->
          <!--              <option value="TV">TV/Monitors</option>-->
          <!--              <option value="PC">PC</option>-->
          <!--              <option value="GA">Gaming/Console</option>-->
          <!--              <option value="PH">Phones</option>-->
          <!--            </select>-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <label-->
          <!--              for="item-weight"-->
          <!--              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"-->
          <!--              >Item Weight (kg)</label-->
          <!--            >-->
          <!--            <input-->
          <!--              type="number"-->
          <!--              name="item-weight"-->
          <!--              id="item-weight"-->
          <!--              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"-->
          <!--              placeholder="12"-->
          <!--              required=""-->
          <!--            />-->
          <!--          </div>-->
          <div class="sm:col-span-2">
            <label
              for="ingredients"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Состав:</label
            >
            <Field v-slot="{ field, errors }" name="ingredients" rules="required">
              <textarea
                v-bind="field"
                name="ingredients"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Состав"
              />
              <div v-if="errors[0]">{{ errors[0] }}</div>
            </Field>
          </div>
          <div class="sm:col-span-2">
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Текст:</label
            >
            <Field v-slot="{ field, errors }" name="text" rules="required">
              <textarea
                v-bind="field"
                name="text"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Текст"
              />
              <div v-if="errors[0]">{{ errors[0] }}</div>
            </Field>
          </div>
          <div class="sm:col-span-2">
            <label
              for="img_url"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >URL фото:</label
            >
            <Field v-slot="{ field, errors }" name="img_url">
              <input
                v-bind="field"
                name="img_url"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="URL фото"
              />
              <div v-if="errors[0]">{{ errors[0] }}</div>
            </Field>
          </div>
        </div>
        <button
          class="w-full inline-flex items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Добавить рецепт
        </button>
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useReceiptsStore } from '@/stores/recipes';
import { Receipt } from '@/types/recipes';
import { nl2br } from '@/helpers/main';
import { Form, Field } from 'vee-validate';

const props = defineProps<{ id?: string }>();

const receiptsStore = useReceiptsStore();
const receipt = ref<Receipt>();

const onSubmit = (values) => {
  receiptsStore.createReceipt(values);
};

onMounted(async () => {
  if (!receiptsStore.getReceipts.length) {
    await receiptsStore.loadReceipts();
  }

  receipt.value = receiptsStore.getReceiptById(parseInt(props.id));
});
</script>

<style></style>
