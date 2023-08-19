import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/config/api';
import { Receipt } from '@/types/receipts';

export const useReceiptsStore = defineStore({
  id: 'receipts',
  state: () => ({
    receipts: [] as Receipt[],
  }),
  getters: {
    getReceipts: (state) => state.receipts as Receipt[],
    getReceiptById: (state) => {
      return (id: number) => {
        const index = state.receipts.findIndex((receipt: Receipt) => receipt.id === id);
        return index === -1 ? undefined : state.receipts[index];
      };
    },
  },
  actions: {
    async loadIngridients() {
      try {
        const url = '/receipts';
        const { data } = await api.get(url);
        this.receipts = data.data;
        // this.users = this.users.map((user) => {
        //     user.roleName = user.roles?.map((o) => o.name).join(", ");
        //     return user;
        // });
      } catch (err) {
        console.log((err as AxiosError).message);
      }
    },
    async createReceipt(data: {
      title: string;
      ingredients: string;
      text: string;
      img_url: string;
    }) {
      await api.post('/receipts', data).then(() => {
        console.log('Новый рецепт добавлен');
      });
      await this.loadReceipts();
    },
    async updateReceipt(
      id: number,
      data: {
        title: string;
        ingredients: string;
        text: string;
        img_url: string;
      }
    ) {
      await api.put('/receipts/' + id, data).then(() => {
        console.log('Рецепт изменен');
      });
      await this.loadReceipts();
    },
    async deleteReceipt(id: number) {
      await api.delete('/receipts/' + id).then(() => {
        console.log('Рецепт удален');
      });
      await this.loadReceipts();
    },
  },
});
