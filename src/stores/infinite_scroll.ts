import { defineStore } from 'pinia';

export const useInfiniteScrollStore = defineStore({
  id: 'infiniteScroll',
  state: () => ({
    scrollFetch: null as Function,
    canLoadMore: true,
    isLoadingMore: false,
    page: 1,
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
      this.page = 1;
      this.isLoadingMore = false;
      this.canLoadMore = true;
    },
    async fetchFn(intersecting) {
      try {
        this.isLoadingMore = true;
        if (intersecting) {
          this.page += 1;
        }
        if (this.page <= this.pageMeta?.pages) {
          await this.scrollFetch(this.page);
        } else {
          this.canLoadMore.value = false;
        }
      } catch (e) {
        throw new Error(e);
      } finally {
        this.isLoadingMore = false;
      }
    },
  },
});
