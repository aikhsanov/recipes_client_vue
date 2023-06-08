<template>
  <div class="about">
    <h2 class="mb-4 text-2xl text-center">Рецепты</h2>
    <div class="flex-col flex-col">
      <div v-for="receipt in receiptsStore.getReceipts" :key="receipt.id">
        <div class="w-full flex flex-col rounded-lg overflow-hidden bg-white shadow mb-4">
          <!-- card cover -->
          <img
            class="h-56 w-full"
            :class="{
              'object-cover': receipt.img_url !== '',
              'object-contain bg-gray-200': receipt.img_url === '',
            }"
            :src="
              receipt.img_url !== ''
                ? receipt.img_url
                : 'http://api.receipts.haemmid.ru/uploads/default.png'
            "
            alt=""
          />
          <!-- end card cover -->

          <!-- card content -->
          <div class="flex-1 px-6 py-4">
            <div class="font-bold text-xl mb-2">
              {{ receipt.title }}
            </div>
            <p class="text-gray-700 text-base">
              {{
                receipt.text
                  ? receipt.text.length > 200
                    ? receipt.text.substring(0, 200) + '...'
                    : receipt.text
                  : receipt.ingredients
              }}
            </p>
          </div>
          <!-- end card content -->

          <!-- card footer -->
          <div class="px-6 py-4 bg-gray-100 flex items-center justify-end gap-2">
            <button
              v-if="UIStore.getSuperUser === '1'"
              @click="deleteReceipt(receipt.id)"
              class="bg-red-600 hover:bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
            >
              Удалить
            </button>
            <router-link
              :to="{ name: 'oneReceipt', params: { id: receipt.id } }"
              class="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
            >
              Посмотреть
            </router-link>
          </div>
          <!-- end card footer -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useReceiptsStore } from '@/stores/receipts';
import { useUIStore } from '@/stores/ui';

const receiptsStore = useReceiptsStore();
const UIStore = useUIStore();

const deleteReceipt = (id: number) => {
  if (confirm('Вы действительно хотите удалить рецепт?')) {
    receiptsStore.deleteReceipt(id);
  }
};

onMounted(() => {
  receiptsStore.loadReceipts();
});
</script>

<style></style>
