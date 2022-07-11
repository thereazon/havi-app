<script setup>
import { NavBar, Tab, Tabs } from 'vant'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { RestaurantStatusTypeToZh, RestaurantTab } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const route = useRoute()
const router = useRouter()

const dispatchStore = useDispatchInfo()
onMounted(() => {
  console.log(dispatchStore)
  if (!dispatchStore.dispatch) {
    router.back()
  }
})

// 無配送資料時，渲染tab
// const mockStoreByStatusEmpty = {
//   DELIVERING: [],
//   PENDING_DELIVERY: [],
//   DELIVERY_COMPLETED: [],
//   UNABLE_DELIVERY: [],
// }

// 有配送資料時，依照status分成四種狀態，渲染tab
const mockStoreByStatus = {
  DELIVERING: [
    {
      id: 'DS62a976485a631',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 1,
    },
    {
      id: 'DS62a976485a637',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 2,
    },
  ],
  PENDING_DELIVERY: [
    {
      id: 'DS62a976485a632',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 0,
    },
    {
      id: 'DS62a976485a633',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 11,
    },
  ],
  DELIVERY_COMPLETED: [
    {
      id: 'DS62a976485a635',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 4,
    },
    {
      id: 'DS62a976485a636',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 13,
    },
  ],
  UNABLE_DELIVERY: [
    {
      id: 'DS62a976485a634',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 12,
    },
  ],
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen pt-[46px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top left-arrow fixed :title="dispatchStore?.dispatch?.no"></NavBar>
    <div class="pt-4 px-[26px] text-[13px]">
      <Tabs :swipeable="true">
        <Tab v-for="item in RestaurantTab" :title="RestaurantStatusTypeToZh[item]" :key="item">
          <div class="h-screen py-10">
            <RestaurantDetailTable
              :title="RestaurantStatusTypeToZh[item]"
              :resturant="mockStoreByStatus.DELIVERING[0]"
            />
          </div>
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
