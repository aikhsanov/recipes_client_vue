import { ref } from 'vue';

const tabIndex = ref<number>(0);
const defaultTabIndex = ref<number>(0);

export default function useTabs() {
  const changeIndex = (ind: number): void => {
    tabIndex.value = ind;
  };

  return {
    tabIndex,
    changeIndex,
  };
}
