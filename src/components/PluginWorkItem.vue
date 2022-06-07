<script setup>
import { Button, Icon, Image as VanImage } from 'vant'
const d = {
  status: 'success',
  data: [
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
  ],
}
</script>

<template>
  <div class="border-solid border-success border-2 rounded-2xl h-[139px] w-[308px]">
    <div class="bottom-dashed flex py-2 px-4 justify-between">
      <div class="flex justify-center items-center space-x-2 text-success text-[13px]">
        <label>單號</label>
        <span>202020430-RE1</span>
      </div>
      <Button class="px-[28px] text-[15px]" color="#6dbe5b" size="small">開始配送</Button>
    </div>
    <div class="px-4 flex justify-between mt-3">
      <div class="flex items-center space-x-1">
        <img class="w-[18px]" src="/dispatching_calendar.png" alt="" />
        <div class="w-[80px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">01/19/2021</div>
      </div>
      <div class="flex items-center space-x-1">
        <img class="w-[18px]" src="/dispatching_clock.png" alt="" />
        <div class="w-[43px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">20:20</div>
      </div>
      <a class="text-[13px] text-success" href="">
        詳細資訊
        <Icon name="play" />
      </a>
    </div>
    <div class="flex items-center justify-between space-x-1 px-4 mt-3">
      <img class="w-[28px]" src="/dispatching_map_2.png" alt="" />
      <div class="w-[233px] text-[12px] text-success font-bold bg-[#f2f2f2] py-1 px-2">
        台中市北屯區大鵬路陳平里12樓
        <a class="float-right text-success font-bold" href="">...</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.bottom-dashed {
  border-bottom: 2px dashed #6dbe5b;
}
</style>
