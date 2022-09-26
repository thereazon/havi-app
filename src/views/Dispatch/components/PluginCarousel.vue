<script setup>
import { reactive, ref, computed } from 'vue'
import Flicking from '@egjs/vue3-flicking'
import { Pagination } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/pagination.css'
import PluginWorkItem from './PluginWorkItem.vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { PluginStatusType } from '@/views/Dispatch/helper'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useAlertModal } from '@/components/store/AlertModalStore'
const dispatchStore = useDispatchInfo()
const route = useRoute()
const router = useRouter()

const modal = useAlertModal()
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

const isConfirmDialog = ref(false)
const confirmItem = reactive({
  id: null,
  status: null,
})

const handleupdateStatus = (id, status) => () => {
  if (status === PluginStatusType.ARRIVAL) {
    modal.open({
      type: 'hint',
      title: '提醒',
      content: '請點擊詳細資料進行簽收作業',
    })
  } else {
    confirmItem.id = id
    confirmItem.status = status
    isConfirmDialog.value = true
  }
}

const confirmUpdate = () => {
  if (confirmItem.status === PluginStatusType.PENDING_DELIVERY)
    dispatchStore.postPluginStartAction(confirmItem.id).then(() => {
      confirmItem.id = null
      confirmItem.status = null
      isConfirmDialog.value = false
    })
  else if (confirmItem.status === PluginStatusType.DELIVERING)
    dispatchStore.postPluginArriveAction(confirmItem.id).then(() => {
      confirmItem.id = null
      confirmItem.status = null
      isConfirmDialog.value = false
    })
  else return
}

const handleRouterToDetail = (plugin) => () => {
  dispatchStore.setCurrentPlugin(plugin)
  router.push({
    path: '/plugin',
    query: {
      ...route.query,
    },
  })
}

const title = computed(() => {
  return confirmItem.status === PluginStatusType.PENDING_DELIVERY
    ? '請確認是否開始進行配送？'
    : '請確認是否已抵達餐廳？'
})
</script>

<template>
  <div class="w-full h-56 pt-3">
    <ConfirmDialog v-model:isShowDialog="isConfirmDialog" :isCloseOnClickOverlay="true">
      <template v-slot:title>
        <div>{{ title }}</div>
      </template>
      <template v-slot:footer>
        <div class="px-[10%] mt-[42px] flex justify-between items-center font-bold text-white text-[1rem]">
          <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">取消</button>
          <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="confirmUpdate">確認</button>
        </div>
      </template>
    </ConfirmDialog>
    <div class="text-center mb-3.5 text-[15px] text-success">插件工作</div>
    <Flicking :options="{ circular: true, align: 'center' }" :plugins="plugins" class="h-44">
      <div v-for="item in dispatchStore.plugin" :key="item.id">
        <PluginWorkItem
          :handleupdateStatus="handleupdateStatus(item.id, item.status)"
          :handleRouterToDetail="handleRouterToDetail(item)"
          :plugin="item"
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
