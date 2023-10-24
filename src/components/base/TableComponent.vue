<template>
  <table class="table-auto min-w-full text-left text-sm font-light">
    <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
      <tr>
        <th scope="col" class="px-6 py-4" v-for="column in columns" :key="column.name">
          {{ column.name }}
        </th>
        <th scope="col" class="px-6 py-4" v-if="controls.length">Действия</th>
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
        <td v-if="controls.length">
          <div class="h-full flex flex-row justify-around items-center">
            <div
              :class="`rounded-md
              w-8
              h-8
              hover:cursor-pointer
              flex
              items-center
              justify-center ${btn.class || 'bg-blue-400'}`"
              :title="btn.name"
              v-for="btn in controls"
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
</template>

<script setup lang="ts">
import Pagination from '@/components/base/Pagination.vue';
import IconBase from '@/components/icons/IconBase.vue';

const props = defineProps<{
  columns: [];
  rows: [];
  controls: [];
  onClickFn: Function;
  pageMeta: {} | [];
  fetchFn: Function;
}>();
</script>

<style scoped></style>
