import { ref } from 'vue';

const isOpen = ref<boolean>(false);
const resConfirm = ref(null);

export default function useModal() {
  const toggleModal = (): void => {
    isOpen.value = !isOpen.value;
    if (resConfirm.value) {
      resConfirm.value = null;
    }
    console.log(isOpen.value);
  };

  const confirm = async (): Promise<void> => {
    return new Promise((res, rej) => {
      toggleModal();
      resConfirm.value = (e) => {
        res(e);
        toggleModal();
      };
    });
  };

  return {
    isOpen,
    toggleModal,
    resConfirm,
    confirm,
  };
}
