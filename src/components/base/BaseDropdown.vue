<template>
  <div class="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
    <div class="flex items-center justify-center p-12">
      <div class="relative inline-block text-left dropdown">
        <slot name="activator">
          <span class="rounded-md shadow-sm"
            ><button
              class="
                inline-flex
                justify-center
                w-full
                px-4
                py-2
                text-sm
                font-medium
                leading-5
                text-gray-700
                transition
                duration-150
                ease-in-out
                bg-white
                border border-gray-300
                rounded-md
                hover:text-gray-500
                focus:outline-none focus:border-blue-300 focus:shadow-outline-blue
                active:bg-gray-50 active:text-gray-800
              "
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span>Options</span>
              <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg></button
          ></span>
        </slot>

        <div
          class="
            opacity-1
            dropdown-menu
            transition-all
            duration-300
            transform
            origin-top-right
            -translate-y-2
            scale-95
          "
        >
          <div
            class="
              absolute
              right-0
              w-56
              mt-2
              origin-top-right
              bg-white
              border border-gray-200
              divide-y divide-gray-100
              rounded-md
              shadow-lg
              outline-none
            "
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            <div class="px-4 py-3">
              <slot name="info"></slot>
            </div>
            <ul id="dropdown-list" class="py-1" v-if="links">
              <li
                v-for="(item, ind) in dropdownItems"
                :key="item.text"
                class="
                  text-gray-700
                  flex
                  justify-between
                  w-full
                  px-4
                  py-2
                  text-sm
                  leading-5
                  text-left
                  hover:cursor-pointer hover:bg-gray-100
                "
              >
                <router-link
                  :to="item?.to"
                  :tabindex="ind"
                  role="menuitem"
                  :class="`w-full h-full flex align-items-center ${item.class || ''} `"
                  v-if="item.type === 'link'"
                >
                  <i v-if="item.icon" :class="`mr-2 ${item.icon}`" /><span
                    class="leading-6 font-bold"
                    >{{ item.text }}</span
                  ></router-link
                >
                <button
                  type="button"
                  :class="`w-full h-full text-left flex align-items-center ${item.class || ''}`"
                  @click="item.action"
                  :tabindex="ind"
                  role="menuitem"
                  v-if="item.type === 'button'"
                >
                  <i v-if="item.icon" :class="`mr-2 ${item.icon}`" />
                  <span class="leading-6 font-bold">{{ item.text }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  dropdownItems: [];
  links?: boolean;
}>();
</script>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
