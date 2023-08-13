import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/api/api';
import { Ingridient } from '@/types/ingridients';
import ingridients from '@/api/ingridients';
import { DataMeta } from '@/types/dataMeta';

export const useIngridientsStore = defineStore({
  id: 'ingridients',
  state: () => ({
    ingridients: [] as Ingridient[],
    dataMeta: {} as DataMeta,
  }),
  getters: {
    getIngridients: (state) => state.ingridients as Ingridient[],
    getDataMeta: (state) => state.dataMeta as DataMeta,
    getIngridientById: (state) => {
      return (id: number) => {
        const index = state.receipts.findIndex((receipt: Receipt) => receipt.id === id);
        return index === -1 ? undefined : state.ingridients[index];
      };
    },
  },
  actions: {
    async loadIngridients(config, infinite = false) {
      try {
        const { data } = await ingridients.getAll(config);
        this.ingridients = infinite ? [...this.ingridients, ...data.data] : data?.data;
        this.dataMeta = data?._meta;
      } catch (err) {
        console.error((err as AxiosError).message);
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
