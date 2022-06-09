<script setup>
import { Button, Icon } from 'vant'
defineProps({
  no: String,
  date: String,
  time: String,
  address: String,
})
</script>

<template>
  <div class="border-solid border-success border-2 rounded-2xl h-[139px] w-[308px] mx-1">
    <div class="bottom-dashed flex py-2 px-4 justify-between">
      <div class="flex justify-center items-center space-x-2 text-success text-[13px]">
        <label>單號</label>
        <span>{{ no }}</span>
      </div>
      <Button class="px-[20px] text-[15px]" color="#6dbe5b" size="small">開始配送</Button>
    </div>
    <div class="px-4 flex justify-between mt-3">
      <div class="flex items-center space-x-1">
        <img class="w-[18px]" src="/dispatching_calendar.png" alt="" />
        <div class="w-[80px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ date }}</div>
      </div>
      <div class="flex items-center space-x-1">
        <img class="w-[18px]" src="/dispatching_clock.png" alt="" />
        <div class="w-[43px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ time }}</div>
      </div>
      <a class="text-[13px] text-success" href="">
        詳細資訊
        <Icon name="play" />
      </a>
    </div>
    <div class="flex items-center justify-between space-x-1 px-4 mt-3">
      <img class="w-[28px]" src="/dispatching_map_2.png" alt="" />
      <div class="w-[233px] text-[12px] text-success font-bold bg-[#f2f2f2] py-1 px-2">
        {{ address }}
        <a class="float-right text-success font-bold" href="">...</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-dashed {
  border-bottom: 2px dashed #6dbe5b;
}
</style>
