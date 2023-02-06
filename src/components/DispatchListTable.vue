<script setup>
import { Divider } from 'vant'

defineProps({
  dispatchListData: Array,
  dispatchDate: String,
  dispatchNo: String,
  handleShowDetail: Function,
})
</script>
<template>
  <div class="w-[323px] flex flex-col shadow-[0_2px_5px_0_gray] bg-white rounded-lg mb-10 mt-12">
    <div class="p-5 text-[13px]">
      <div class="text-[#044d80] flex items-center mb-3">
        <div class="mr-5">派工單號</div>
        <div>{{ dispatchNo }}</div>
      </div>
      <div class="flex items-center">
        <img class="w-[18px] mr-2" src="/dispatching_calendar.png" alt="icon" />
        <div class="text-gray bg-[#f2f2f2] px-2 py-1">{{ dispatchDate }}</div>
      </div>
    </div>
    <div v-for="item in dispatchListData" :key="item.id">
      <Divider class="m-0" />
      <div class="grid grid-cols-11 gap-1 p-3" :onclick="() => handleShowDetail(item)">
        <div class="col-span-3">
          <div class="text-[#044d80] text-[12px]">{{ item.name }}</div>
          <div class="mt-1 text-gray text-[8px]">訂貨：{{ item.qty }}</div>
        </div>
        <div class="col-span-2 text-center text-gray">
          <div class="text-[13px]">{{ item.backing_qty }}</div>
          <div class="mt-1 text-[8px]">墊底</div>
        </div>
        <div class="col-span-2 text-center text-primary">
          <div class="text-[13px]">{{ item.purchase_total }}</div>
          <div class="mt-1 text-[8px]">餐廳進貨</div>
        </div>
        <div class="col-span-2 text-center text-success">
          <div class="text-[13px]">{{ item.return_total }}</div>
          <div class="mt-1 text-[8px]">餐廳退回</div>
        </div>
        <div class="col-span-2 text-center text-[#1bc5bd]">
          <div class="text-[13px]">{{ item.pallet_qty }}</div>
          <div class="mt-1 text-[8px]">裝車容器</div>
        </div>
      </div>
    </div>
  </div>
</template>
