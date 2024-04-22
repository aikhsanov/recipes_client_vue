import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';
import api from '@/api/api';
import { Ingridient } from '@/types/ingridients';
import ingridients from '@/api/ingridients';
import { DataMeta } from '@/types/dataMeta';
import useToaster, { toasts } from '@/composables/useToaster';

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
    async loadIngridients(config?: object, infinite?: boolean = false) {
      try {
        const { data }: Ingridient[] = await ingridients.getAll({ params: { ...config } });
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

    async createIngridient(data: FormData) {
      try {
        console.log(data, 'data');
        for (const value of data.values()) {
          console.log(value);
        }
        const res = (await ingridients.create(data))?.data;
        console.log(res);
        await this.loadIngridients();
      } catch (e) {
        throw new Error(e);
      }
    },

    async updateIngridient(id: number, data: FormData): void {
      const res = (await ingridients.update(id, data)).data;
      console.log(res.data, 'REEEEEEEEES');
      if (res.data) {
        toasts.success();
      }
      // await this.loadIngridients();
      return res;
    },

    async deleteIngridient(id: number) {
      const res = (await ingridients.delete(id)).data;
      await this.loadIngridients();
      return res;
    },
  },
});
