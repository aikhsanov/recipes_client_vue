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
    async loadIngridients(config: object, infinite: boolean = false) {
      try {
        const { data }: Ingridient[] = await ingridients.getAll(config);
        this.ingridients = infinite ? [...this.ingridients, ...data.data] : data?.data;
        this.dataMeta = data?._meta;
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },

    async createIngridient(data: Ingridient) {
      await ingridients.create(data).then(() => {
        console.log('Новый рецепт добавлен');
      });
      await this.loadReceipts();
    },

    async updateIngridient(id: number, data: Ingridient) {
      await ingridients.update(id, data).then(() => {
        console.log('Ингридиент обновлён');
      });
      await this.loadReceipts();
    },

    async deleteIngridient(id: number) {
      await ingridients.delete(id);
      await this.loadReceipts();
    },
  },
});
