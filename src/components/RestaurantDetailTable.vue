<script setup>
import { Divider, Button } from 'vant'
import dayjs from 'dayjs'

defineProps({
  title: String,
  date: String,
  time: String,
  kg: String,
  backgroundColor: String,
  dispatch: Object,
  restaurant: Object,
  handleRouteToDetail: Function,
  handleOpenUnableDeliverMenu: Function,
})
</script>

<template>
  <div class="shadow-md rounded-b-[20px]">
    <div
      class="font-bold rounded-t-[20px] py-[12px] px-[20px] flex justify-between items-center"
      :class="`${backgroundColor}`"
    >
      <div>
        {{ title }}
      </div>
      <Button
        class="bg-warning border-0 rounded-full text-white px-[20px] h-[21px] text-[12px]"
        v-if="handleOpenUnableDeliverMenu"
        :onClick="() => handleOpenUnableDeliverMenu('UNABLE')"
        >攜回配銷中心</Button
      >
    </div>
    <div class="my-[15px] px-[20px] pb-[20px]">
      <div class="flex items-center justify-between text-gray">
        <img class="w-[15px]" src="/dispatching_calendar.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ dayjs(restaurant?.arrival_time).format('MM/DD/YYYY') }}</div>
        <img class="w-[15px]" src="/dispatching_clock.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ dayjs(restaurant?.arrival_time).format('HH:mm') }}</div>
        <img class="w-[15px]" src="/dispatching_box.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ restaurant?.cube }}</div>
      </div>
      <Divider dashed="true" class="border-primary" />
      <div class="flex items-center text-primary font-bold gap-2">
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-1/5 text-center rounded-l-[10px]">
          {{ restaurant?.bu }}
        </div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-2/5 text-center">{{ restaurant?.number }}</div>
        <div class="bg-[#f2f2f2] px-3 py-[5px] basis-2/5 rounded-r-[10px] text-center">{{ restaurant?.name }}</div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[10px]">
        <div class="basis-1/12"><img class="w-[30px]" src="/dispatching_map.png" alt="icon" /></div>
        <div class="flex bg-[#f2f2f2] px-3 py-[7px] rounded basis-11/12 text-left rounded-l-[10px]">
          <div>{{ restaurant?.address }}</div>
        </div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[10px]">
        <div class="basis-1/12"><img class="w-[30px]" src="/dispatching_phone.png" alt="icon" /></div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-11/12 text-left rounded-l-[10px]">
          {{ restaurant?.tel }}
        </div>
      </div>
      <div class="flex justify-center mt-[10px] font-bold">
        <Button
          v-if="handleOpenUnableDeliverMenu"
          :onClick="() => handleOpenUnableDeliverMenu('DELAY')"
          class="bg-primary text-white rounded-full px-[43px]"
        >
          延後配送</Button
        >
        <Button v-else :onClick="handleRouteToDetail" class="bg-primary text-white rounded-full px-[43px]">
          作業明細</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.delivery {
  background-color: #707070;
  color: #fff;
}

.pending {
  background-color: #f2f2f2;
  color: #707070;
}
.completed {
  background-color: #086eb6;
  color: #fff;
}
.unable {
  background-color: #000000;
  color: #fff;
}
</style>
