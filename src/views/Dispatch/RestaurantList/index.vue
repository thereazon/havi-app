<script setup>
import { NavBar, Tab, Tabs, Button } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { RestaurantStatusTypeToZh, RestaurantTab, DispatchStatusType } from '@/views/Dispatch/helper'
import DeliveringTab from './DeliveringTab.vue'
import CompletedTab from './CompletedTab.vue'
import UnableDeliverTab from './UnableDeliverTab.vue'
import PendingDeliveryTab from './PendingDeliveryTab.vue'
import DelayModal from '@/components/DelayModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useAlertModal } from '@/components/store/AlertModalStore'

const modal = useAlertModal()
const router = useRouter()
const route = useRoute()
const dispatchStore = useDispatchInfo()

const unableDeliveryId = ref(null)
const isConfirmDialog = ref(false)
const isConfirmDialog2 = ref(false)

const openConfirmDialog = (id) => {
  isConfirmDialog.value = true
  unableDeliveryId.value = id
}

const confirmDelay = async (data) => {
  if (data.message && data.message !== '') {
    await dispatchStore.postDelayAction(data.id, data.message)
    dispatchStore.closeUnableDeliverMenu()
  } else {
    modal.open({
      type: 'hint',
      title: '提醒',
      content: '備註欄位為必填',
    })
  }
}
const confirmUndeliverable = async (data) => {
  if (data.message && data.message !== '') {
    await dispatchStore.postBringAction(data.id, data.message)
    dispatchStore.closeUnableDeliverMenu()
  } else {
    modal.open({
      type: 'hint',
      title: '提醒',
      content: '備註欄位為必填',
    })
  }
}

onMounted(() => {
  if (!dispatchStore.dispatch) {
    router.back()
  }
})

const handleRouterBack = () => {
  router.push({
    path: `/dispatch`,
    query: {
      ...route.query,
    },
  })
}

const handleCheckOut = () => {
  isConfirmDialog2.value = false
  dispatchStore.postCheckOut()
}

const handleUndelivered = async () => {
  await dispatchStore.postUndeliveredAction(unableDeliveryId.value)
  isConfirmDialog.value = false
}

const handleOpenDialog2 = async () => {
  isConfirmDialog2.value = true
}
</script>

<template>
  <ConfirmDialog v-model:isShowDialog="isConfirmDialog2" :isCloseOnClickOverlay="true">
    <template v-slot:title>
      <div>是否確認出車?</div>
    </template>
    <template v-slot:footer>
      <div class="px-[10%] mt-[42px] flex justify-between items-center font-bold text-white text-[1rem]">
        <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog2 = false">取消</button>
        <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="handleCheckOut">確認</button>
      </div>
    </template>
  </ConfirmDialog>
  <div class="bg-primary/[.05] min-h-screen pt-[46px] box-border">
    <NavBar safe-area-inset-top left-arrow fixed :onClickLeft="handleRouterBack" :title="dispatchStore?.dispatch?.no">
      <template #right>
        <Button
          :disabled="dispatchStore?.dispatch?.status === DispatchStatusType.CHECK_OUT"
          :onClick="handleOpenDialog2"
          round
          size="mini"
          class="bg-primary text-white px-3 py-1"
          >出車</Button
        >
      </template>
    </NavBar>
    <div class="pt-4 px-[26px] text-[13px]">
      <Tabs :swipeable="true">
        <Tab v-for="item in RestaurantTab" :title="RestaurantStatusTypeToZh[item]" :key="item">
          <DeliveringTab v-if="item === 'DELIVERING'" :openConfirmDialog="openConfirmDialog" />
          <CompletedTab v-if="item === 'DELIVERY_COMPLETED'" />
          <UnableDeliverTab v-if="item === 'UNABLE_DELIVERY'" />
          <PendingDeliveryTab v-if="item === 'PENDING_DELIVERY'" />
        </Tab>
      </Tabs>
    </div>
  </div>
  <ConfirmDialog v-model:isShowDialog="isConfirmDialog" :isCloseOnClickOverlay="true">
    <template v-slot:title>
      <div>確認該訂單無法配送嗎？</div>
    </template>
    <template v-slot:footer>
      <div class="mt-5 px-[10%] flex justify-between items-center font-bold text-white text-[1rem]">
        <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">取消</button>
        <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="handleUndelivered">確認</button>
      </div>
    </template>
  </ConfirmDialog>
  <DelayModal
    v-model:isShow="dispatchStore.showDelayMenu"
    title="延後配送"
    subTitle="請填寫延後配送原因"
    optionFirst="請選擇延後配送原因"
    warning="!確認後將此單延至最後一筆進行配送!"
    @confirm="confirmDelay"
  />
  <DelayModal
    title="攜回配銷中心"
    v-model:isShow="dispatchStore.showUnableDeliverMenu"
    subTitle="請填寫無法配送原因"
    optionFirst="請選擇無法配送原因"
    warning="!請確認不再進行配送此單!"
    @confirm="confirmUndeliverable"
  />
</template>

<style scoped>
:deep(.van-tab--active) {
  color: #eb5e55;
  font-weight: 900;
}
:deep(.van-tabs__line) {
  width: 19px;
  height: 4px;
}
:deep(.van-tabs__nav) {
  background-color: rgba(255, 255, 255, 0);
}
</style>
