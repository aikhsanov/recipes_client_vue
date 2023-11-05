<template>
  <table class="table-auto min-w-full text-left text-sm font-light">
    <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
      <tr>
        <th scope="col" class="px-6 py-4" v-for="column in columns" :key="column.name">
          {{ column.name }}
        </th>
        <th scope="col" class="px-6 py-4 text-center" v-if="!hideControls">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, ind) in rows"
        :key="row.id"
        :class="`border-b hover:bg-neutral-200 ${
          ind % 2 === 0 ? 'bg-neutral-100' : 'bg-white'
        } dark:border-neutral-500 dark:bg-neutral-700 h-full`"
      >
        <td
          v-for="(column, ind) in columns"
          :key="column.value"
          class="whitespace-nowrap px-6 py-4"
        >
          {{ row[column.value] }}
        </td>
        <td v-if="!hideControls" class="whitespace-nowrap px-6 py-4 w-44">
          <div class="h-full flex flex-row justify-around items-center">
            <div
              v-for="btn in controlBtns"
              :class="`rounded-md
              w-8
              h-8
              hover:cursor-pointer
              flex
              items-center
              justify-center ${btn.class || 'bg-blue-400'}`"
              :title="btn.name"
              :key="btn.name"
              @click="(e) => btn?.onClick(row.id)"
            >
              <IconBase
                class="pointer-events-none"
                :stroke-color="btn.icon.strokeColor || 'white'"
                :icon-color="btn.icon.iconColor || 'transparent'"
              >
                <component :is="btn.icon.component" />
              </IconBase>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :page-meta="pageMeta" :fetch-fn="fetchFn" />
  <BaseConfirm />
</template>

<script setup lang="ts">
import Pagination from '@/components/base/Pagination.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import BaseConfirm from '@/components/base/BaseConfirm.vue';
import { computed } from 'vue';

const props = defineProps<{
  columns: [];
  rows: [];
  controls?: [];
  onEdit?: Function;
  onDelete?: Function;
  onClickFn: Function;
  hideControls?: boolean;
  pageMeta: {} | [];
  fetchFn: Function;
}>();

const controlBtns = computed(() =>
  [
    { name: 'Редактировать', onClick: props.onEdit, icon: { component: IconEdit } },
    {
      name: 'Удалить',
      onClick: props.onDelete,
      icon: { component: IconTrash },
      class: 'bg-tomato-800',
    },
  ].concat(props?.controls || [])
);
</script>

<style scoped></style>
