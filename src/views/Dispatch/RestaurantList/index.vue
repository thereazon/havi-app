<script setup>
import { NavBar, Tab, Tabs, Button } from 'vant'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { RestaurantStatusTypeToZh, RestaurantTab } from '@/views/Dispatch/helper'
import DeliveringTab from './DeliveringTab.vue'
import CompletedTab from './CompletedTab.vue'
import UnableDeliverTab from './UnableDeliverTab.vue'
import PendingDeliveryTab from './PendingDeliveryTab.vue'

const router = useRouter()

const dispatchStore = useDispatchInfo()
onMounted(() => {
  if (!dispatchStore.dispatch) {
    router.back()
  }
})
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen pt-[46px] box-border">
    <NavBar safe-area-inset-top left-arrow fixed :onClick="router.back" :title="dispatchStore?.dispatch?.no">
      <template #right>
        <Button round size="mini" class="bg-primary text-white px-3 py-1">出車</Button>
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
