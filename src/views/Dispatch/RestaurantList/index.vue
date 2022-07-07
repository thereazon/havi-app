<script setup>
import { NavBar, Tab, Tabs } from 'vant'
import { onMounted } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'

const dispatchStore = useDispatchInfo()
onMounted(() => {
  console.log(dispatchStore)
})

const mockTabStatus = {
  DELIVERING: '配送中', //配送中(1) 已抵達(2)
  PENDING_DELIVERY: '待配送', //待配送(0) 延後配送(11)
  DELIVERY_COMPLETED: '配送完成', //配送完成(4) 攜回配銷中心(3)
  UNABLE_DELIVERY: '無法配送', //無法配送(12)
}

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
    <NavBar safe-area-inset-top left-arrow fixed title="餐廳明細"></NavBar>
    <div class="pt-4 px-[26px] text-[13px]">
      <Tabs :swipeable="true">
        <Tab v-for="(item, index) in mockStoreByStatus" :title="mockTabStatus[index]" :key="index">
          <div class="h-screen py-10">{{ mockTabStatus[index] }} 内容</div>
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
