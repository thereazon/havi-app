<script setup>
import { Button } from 'vant'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { RestaurantStatusTypeToZh } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const route = useRoute()
const router = useRouter()

const { dispatch, restaurant } = useDispatchInfo()

// 無配送資料時，渲染tab
// const mockStoreByStatusEmpty = {
//   DELIVERING: [],
//   PENDING_DELIVERY: [],
//   DELIVERY_COMPLETED: [],
//   UNABLE_DELIVERY: [],
// }

// 有配送資料時，依照status分成四種狀態，渲染tab

const cuurentRestaurant = computed(() => {
  const arrival = restaurant?.ARRIVAL ? restaurant.ARRIVAL : []
  const delivering = restaurant?.DELIVERING ? restaurant.DELIVERING : []
  const list = [...arrival, ...delivering]
  return list[0]
})
</script>

<template>
  <div class="h-screen py-10">
    <RestaurantDetailTable
      :title="RestaurantStatusTypeToZh.DELIVERING"
      :dispatch="dispatch"
      :restaurant="cuurentRestaurant"
    />

    <Button
      v-if="cuurentRestaurant?.status === 0"
      round
      type="primary"
      class="w-full bg-warning border-none text-white px-[43px] mt-20"
    >
      抵達餐廳
    </Button>
    <Button
      v-if="cuurentRestaurant?.arrival_time"
      round
      type="primary"
      class="w-full bg-white border-none text-warning px-[43px] mt-20"
    >
      已抵達 {{ cuurentRestaurant?.arrival_time }}</Button
    >
    <Button round type="primary" class="w-full bg-primary border-none text-white rounded-full px-[43px] mt-10">
      預先查看作業明細
    </Button>
    <div class="w-full text-center text-[#707070] mt-20 underline pointer">無法配送</div>
  </div>
</template>

<style scoped></style>
