<template>
  <transition
    name="backdrop"
    enter-active-class="duration-500 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="isOpen"
      @click="toggleModal"
      id="backdrop"
      class="
        w-full
        h-full
        bg-gray-900 bg-opacity-50
        dark:bg-opacity-80
        top-0
        left-0
        bottom-0
        right-0
        fixed
        z-40
      "
    />
  </transition>
  <transition
    name="base-modal"
    enter-active-class="duration-500 ease-out"
    enter-from-class="transform opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-75"
  >
    <div
      v-if="isOpen"
      id="modal-wrapper"
      :class="`
      overflow-x-hidden overflow-y-auto
      flex
      flex-row
      -translate-y-1/2
      top-1/2
      left-1/2
      -translate-x-1/2
      fixed
      justify-center

      bg-white rounded-lg shadow dark:bg-gray-700
      max-w-5xl
      z-50
      md:h-auto ${props.class || ''}`"
    >
      <slot name="prepend"></slot>
      <div class="flex flex-col w-full relative">
        <div class="flex justify-between p-1 absolute top-0 right-0 w-full z-50" id="modal-close">
          <slot name="modal-header-controls"></slot>
          <button
            type="button"
            @click="toggleModal"
            class="
              text-gray-400
              bg-transparent
              hover:bg-gray-200 hover:text-gray-900
              rounded-lg
              text-sm
              p-1.5
              ml-auto
              inline-flex
              items-center
              dark:hover:bg-gray-800 dark:hover:text-white
            "
            data-modal-toggle="authentication-modal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          :class="`h-full ${contentClass || 'space-y-6 px-6 lg:px-8 py-6 sm:pb-6 xl:pb-6'}`"
          id="modal-content"
        >
          <slot :toggle="toggleModal">
            <h4>Контент недоступен или отсутствует</h4>
          </slot>
          <div class="" id="modal-controls">
            <slot name="controls"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!--  <slot name="activator" :toggle="toggleOpen"></slot>-->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useModal from '@/composables/useModal';

const props = defineProps<{
  class?: string;
  contentClass?: string;
}>();

// const isOpen = ref<boolean>(false);
const { isOpen, toggleModal } = useModal();

// function toggleOpen() {
//   isOpen.value = !isOpen.value;
// }
// defineExpose<{
//   toggleOpen: Function;
// }>({ toggleOpen });
</script>

<style scoped></style>
