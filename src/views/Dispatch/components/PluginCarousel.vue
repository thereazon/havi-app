<script setup>
import { reactive } from 'vue'
import Flicking from '@egjs/vue3-flicking'
import { Pagination } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/pagination.css'
import PluginWorkItem from './PluginWorkItem.vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { PluginStatusType } from '@/views/Dispatch/helper'
const dispatchStore = useDispatchInfo()
const { postPluginFinishAction, postPluginArriveAction, postPluginStartAction } = dispatchStore

const plugins = [new Pagination({ type: 'bullet' })]
const works = reactive([
  {
    id: 'FO12345',
    no: 'INS112320NDC1840A1',
    date: '01/19/2021',
    time: '17:00',
    bu: 'MD',
    number: '00000001',
    name: '中山店',
    address: '台北市中山路',
    tel: '02-2222-4444',
    note: '工作說明',
    status: 0,
  },
  {
    id: 'FO12346',
    no: 'INS112320NDC1840A1',
    date: '01/19/2021',
    time: '17:00',
    bu: 'MD',
    number: '00000001',
    name: '中山店',
    address: '台北市中山路',
    tel: '02-2222-4444',
    note: '工作說明',
    status: 0,
  },
  {
    id: 'FO12347',
    no: 'INS112320NDC1840A1',
    date: '01/19/2021',
    time: '17:00',
    bu: 'MD',
    number: '00000001',
    name: '中山店',
    address: '台北市中山路',
    tel: '02-2222-4444',
    note: '工作說明',
    status: 0,
  },
  {
    id: 'FO12322',
    no: 'INS112320NDC1840A1',
    date: '01/19/2021',
    time: '17:00',
    bu: 'MD',
    number: '00000001',
    name: '中山店',
    address: '台北市中山路',
    tel: '02-2222-4444',
    note: '工作說明',
    status: 0,
  },
  {
    id: 'FO12311',
    no: 'INS112320NDC1840A1',
    date: '01/19/2021',
    time: '17:00',
    bu: 'MD',
    number: '00000001',
    name: '中山店',
    address: '台北市中山路',
    tel: '02-2222-4444',
    note: '工作說明',
    status: 0,
  },
])

const handleupdateStatus = (id, status) => () => {
  if (status === PluginStatusType.PENDING_DELIVERY) dispatchStore.postPluginStartAction(id)
  else if (status === PluginStatusType.DELIVERING) dispatchStore.postPluginArriveAction(id)
  else return
}
</script>

<template>
  <div class="w-full h-56 pt-3">
    <div class="text-center mb-3.5 text-[15px] text-success">插件工作</div>
    <Flicking :options="{ circular: true, align: 'center' }" :plugins="plugins" class="h-44">
      <div v-for="item in dispatchStore.plugin" :key="item.id">
        <PluginWorkItem
          :handleupdateStatus="handleupdateStatus(item.id, item.status)"
          :no="item.no"
          :date="item.date"
          :time="item.time"
          :address="item.address"
          :status="item.status"
        />
      </div>
      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
  </div>
</template>

<style scoped>
/* 無法改動 pagination active 的顏色 */
/* .flicking-pagination .flicking-pagination-bullet-active {
  background-color: #6dbe5b !important;
} */
</style>
