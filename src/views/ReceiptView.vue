<template>
  <div class="about">
    <h1 class="mb-4 text-2xl text-center">Рецепты</h1>
    <div
      class="w-full flex flex-col rounded-lg overflow-hidden bg-white shadow mb-4"
      v-if="receipt"
    >
      <!-- card cover -->
      <img
        class="h-56 w-full object-cover"
        :src="
          receipt.img_url !== ''
            ? receipt.img_url
            : 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384'
        "
        alt=""
      />
      <!-- end card cover -->

      <!-- card content -->
      <div class="flex-1 px-6 py-4">
        <div class="font-bold text-xl mb-4" v-html="receipt.title"></div>
        <div v-if="receipt.ingredients" class="mb-3">
          <h3 class="text-lg font-medium">Состав:</h3>
          <p class="text-gray-700 text-base" v-html="nl2br(receipt.ingredients)"></p>
        </div>
        <div v-if="receipt.text" class="mb-3">
          <h3 class="text-lg font-medium">Приготовление:</h3>
          <p class="text-gray-700 text-base" v-html="nl2br(receipt.text)"></p>
        </div>
      </div>
      <!-- end card content -->

      <!-- card footer -->
      <div class="px-6 py-4 bg-gray-100"></div>
      <!-- end card footer -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useReceiptsStore } from '@/stores/recipes';
import { Receipt } from '@/types/recipes';
import { nl2br } from '@/helpers/main';

const props = defineProps<{ id?: string }>();

const receiptsStore = useReceiptsStore();
const receipt = ref<Receipt>();

onMounted(async () => {
  if (!receiptsStore.getReceipts.length) {
    await receiptsStore.loadReceipts();
  }

  receipt.value = receiptsStore.getReceiptById(parseInt(props.id));
});
</script>

<style></style>
