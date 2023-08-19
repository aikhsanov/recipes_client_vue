import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/api/api';
import { Ingridient } from '@/types/ingridients';
import ingridients from '@/api/ingridients';
import { DataMeta } from '@/types/dataMeta';

export const useIngridientsStore = defineStore({
  id: 'ingridients',
  state: () => ({
    currentIngridient: {} as Ingridient,
    ingridients: [] as Ingridient[],
    dataMeta: {} as DataMeta,
  }),
  getters: {
    getIngridients: (state) => state.ingridients as Ingridient[],
    getCurrentIngridient: (state) => state.currentIngridient as Ingridient,
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

    async loadIngridientById(id: string | number, config?: object) {
      try {
        const { data }: Ingridient = await ingridients.getById(id, config);
        this.currentIngridient = data?.data;
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },

    async loadFilteredIngridients(payload: {}, config?: object, infinite: boolean = false) {
      try {
        // const { data }: Ingridient[] = await ingridients.getAllFiltered(payload);
        // this.ingridients = infinite ? [...this.ingridients, ...data.data] : data?.data;
        // this.dataMeta = data?._meta;
        return await ingridients.getAllFiltered(payload);
      } catch (err) {
        console.error((err as AxiosError).message);
      }
    },

    async createIngridient(data: Ingridient) {
      try {
        const res = (
          await ingridients.create({
            name: data.name,
            description: data.description,
          })
        ).data;
        if (res.data) {
          await ingridients.uploadImage(res.data.id, data.img);
        }
        console.log(res);
      } catch (e) {
        throw new Error(e);
      }
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
