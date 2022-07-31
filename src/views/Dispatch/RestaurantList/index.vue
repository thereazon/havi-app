<script setup>
import { NavBar, Tab, Tabs, Button, Popup } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { RestaurantStatusTypeToZh, RestaurantTab } from '@/views/Dispatch/helper'
import DeliveringTab from './DeliveringTab.vue'
import CompletedTab from './CompletedTab.vue'
import UnableDeliverTab from './UnableDeliverTab.vue'
import PendingDeliveryTab from './PendingDeliveryTab.vue'
import DelayModal from '@/components/DelayModal.vue'
const router = useRouter()
const route = useRoute()
const dispatchStore = useDispatchInfo()

const showDelayModal = ref(false)
const showUndeliverableModal = ref(false)

const openDelayModal = () => {
  dispatchStore.closeUnableDeliverMenu()
  showDelayModal.value = true
}

const openUndeliverableModal = () => {
  dispatchStore.closeUnableDeliverMenu()
  showUndeliverableModal.value = true
}

const confirmDelay = (data) => {
  showDelayModal.value = false
  console.log('confirm Delay', data)
}
const confirmUndeliverable = (data) => {
  showUndeliverableModal.value = false
  console.log('confirm Undeliverable', data)
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
  dispatchStore.postCheckOut()
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen pt-[46px] box-border">
    <NavBar safe-area-inset-top left-arrow fixed :onClickLeft="handleRouterBack" :title="dispatchStore?.dispatch?.no">
      <template #right>
        <Button :onClick="handleCheckOut" round size="mini" class="bg-primary text-white px-3 py-1">出車</Button>
      </template>
    </NavBar>
    <div class="pt-4 px-[26px] text-[13px]">
      <Tabs :swipeable="true">
        <Tab v-for="item in RestaurantTab" :title="RestaurantStatusTypeToZh[item]" :key="item">
          <DeliveringTab v-if="item === 'DELIVERING'" />
          <CompletedTab v-if="item === 'DELIVERY_COMPLETED'" />
          <UnableDeliverTab v-if="item === 'UNABLE_DELIVERY'" />
          <PendingDeliveryTab v-if="item === 'PENDING_DELIVERY'" />
        </Tab>
      </Tabs>
    </div>
  </div>
  <DelayModal
    v-model:isShow="showDelayModal"
    title="延後配送"
    subTitle="請填寫延後配送原因"
    optionFirst="請選擇延後配送原因"
    warning="!請確認不再進行配送此單!"
    @confirm="confirmDelay"
  />
  <DelayModal
    v-model:isShow="showUndeliverableModal"
    title="攜回配銷中心"
    subTitle="請填寫無法配送原因"
    optionFirst="請選擇無法配送原因"
    warning="!確認後將此單延至最後一筆進行配送!"
    @confirm="confirmUndeliverable"
  />
  <Popup position="bottom" v-model:show="dispatchStore.showUnableDeliverMenu">
    <div class="py-[26px] px-[28px] bg-[#707070]">
      <ul>
        <li :onClick="openDelayModal" class="text-white text-[17px] leading-10">延後配送</li>
        <li :onClick="openUndeliverableModal" class="text-white text-[17px] leading-10">攜回配銷中心</li>
      </ul>
    </div>
  </Popup>
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
