import { defineStore } from 'pinia';
import type { AxiosError } from 'axios';

type fieldPayload = { name: string; value: { dirty: boolean } };

export const useFormStore = defineStore({
  id: 'form',
  state: () => ({
    form: {} as {},
  }),
  getters: {
    getForm: (state) => state.form,
  },
  actions: {
    setField(payload: fieldPayload) {
      this.form = { ...this.form, [payload.name]: payload.value };
    },
    clearFormField() {
      this.form = {};
    },
  },
});
