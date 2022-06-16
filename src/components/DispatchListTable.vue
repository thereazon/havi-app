<script setup>
defineProps({
  dispatchListData: Array,
  dispatchDate: String,
  dispatchNo: String,
})
</script>

<template>
  <div class="flex flex-col items-stretch text-[13px] w-full">
    <div class="rounded-t-lg bg-white p-5">
      <div class="text-[#044d80] flex mb-3">
        <div class="mr-5">派工單號</div>
        <div>{{ dispatchNo }}</div>
      </div>
      <div class="flex items-center">
        <img class="w-[18px] mr-2" src="/dispatching_calendar.png" alt="icon" />
        <div class="text-gray bg-[#f2f2f2] px-2 py-1">{{ dispatchDate }}</div>
      </div>
    </div>
    <div class="rounded-b-lg bg-white shadow-[0_2px_5px_0_gray]" v-for="item in dispatchListData" :key="item.id">
      <div class="grid grid-cols-11 gap-1 p-3 shadow-[0_-1px_2px_0_gray]">
        <div class="col-span-3">
          <div class="text-[#044d80]">{{ item.name }}</div>
          <div class="mt-1 text-gray">訂貨：{{ item.qty }}</div>
        </div>
        <div class="col-span-2 text-center text-gray">
          <div>{{ item.backing_qty }}</div>
          <div class="mt-1">墊底</div>
        </div>
        <div class="col-span-2 text-center text-primary">
          <div>{{ item.purchase_total }}</div>
          <div class="mt-1">餐廳進貨</div>
        </div>
        <div class="col-span-2 text-center text-success">
          <div>{{ item.return_total }}</div>
          <div class="mt-1">餐廳退回</div>
        </div>
        <div class="col-span-2 text-center text-[#1bc5bd]">
          <div>{{ item.pallet_qty }}</div>
          <div class="mt-1">裝車容器</div>
        </div>
      </div>
    </div>
  </div>
</template>
