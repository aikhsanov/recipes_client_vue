<template>
  <div
    v-if="isOpen"
    @click="toggleOpen"
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
    "
  />
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
      z-70
      md:h-auto ${props.class || ''}`"
  >
    <slot name="prepend"> </slot>
    <div class="flex flex-col w-full">
      <div class="flex justify-between p-2" id="modal-close">
        <slot name="modal-header-controls"></slot>
        <button
          type="button"
          @click="toggleOpen"
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
      <div class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 h-full">
        <slot :toggle="toggleOpen">
          <h4>Котнтент недоступен или отсутствует</h4>
        </slot>
      </div>
      <div class="" id="modal-controls">
        <slot name="controls"></slot>
      </div>
    </div>
  </div>

  <slot name="activator" :toggle="toggleOpen"></slot>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  class?: string;
}>();

const isOpen = ref<boolean>(false);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped></style>
