import { defineStore } from 'pinia';

export const useInfiniteScrollStore = defineStore({
  id: 'infiniteScroll',
  state: () => ({
    loadFn: null as Function,
    pageMeta: {},
  }),
  getters: {
    getPageMeta: (state) => state.pageMeta,
    getLoadFn: (state) => state.loadFn,
  },
  actions: {
    setLoadFn(fn) {
      this.loadFn = fn;
    },

    setPageMeta(meta) {
      this.pageMeta = meta;
    },
  },
});
