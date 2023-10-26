import { ref } from 'vue';
const isOpen = ref<boolean>(false);
export default function useModal() {
  const toggleModal = (): void => {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value);
  };

  return {
    isOpen,
    toggleModal,
  };
}
