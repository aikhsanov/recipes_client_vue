import { defineStore } from 'pinia';

export const useInfiniteScrollStore = defineStore({
  id: 'infiniteScroll',
  state: () => ({
    scrollFetch: null as Function,
    pageMeta: {},
  }),
  getters: {
    getPageMeta: (state) => state.pageMeta,
    getScrollFetch: (state) => state.scrollFetch,
  },
  actions: {
    setScrollFetchFn(fn) {
      this.scrollFetch = fn;
    },

    setPageMeta(meta) {
      this.pageMeta = meta;
    },
    clearState() {
      this.scrollFetch = null;
      this.pageMeta = {};
    },
  },
});
