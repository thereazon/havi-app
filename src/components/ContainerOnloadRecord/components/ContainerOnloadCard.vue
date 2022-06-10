
<script setup>
import { Step, Steps } from 'vant'
</script>

<template>
  <section class="rounded-[20px] max-w-5xl shadow-md">
    <!-- card header -->
    <div class="flex items-baseline pt-3 px-8">
      <div class="w-1/2">
        <p class="text-primary text-[13px]"><b class="font-bold">單號</b>: C6002-02-1</p>
      </div>
      <div class="w-1/2">
        <ul class="list-disc flex my-4 list-inside">
          <li class="marker:text-primary"><small class="relative font-bold text-[10px] -left-2 text-primary">常溫</small></li>
          <li class="marker:text-success"><small class="relative font-bold text-[10px] -left-2 text-success">冷藏</small></li>
          <li class="marker:text-main"><small class="relative font-bold text-[10px] -left-2 text-sky-800">冷凍</small></li>
        </ul>
      </div>
    </div>
    <!-- divide -->
    <div class="divide py-1"></div>
    <!-- info -->
    <div class="flex justify-start space-x-3 py-1 my-1 px-7">
      <div>
        <img src="dispatching_calendar.png" class="h-4 align-sub px-1" alt="calanderIcon">
        <spna class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">02/06/2021</spna>
      </div>
      <div>
        <img src="dispatching_clock.png" class="h-4 align-sub px-1" alt="clockIcon">
        <span class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">06:00</span>
      </div>
      <div>
        <img src="dispatching_box.png" class="h-4 align-sub px-1" alt="boxIcon">
        <span class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">1332.52</span>
      </div>
    </div>
    <!-- record -->
    <div class="bg-zinc-100 px-7">
      <Steps direction="vertical" :active="0" class="bg-zinc-100 mt-2">
        <Step class="">
          <div class="flex justify-start flex-nowrap space-x-2">
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-1/12 text-center ">MD</p>
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-4/12 text-center ">00000330</p>
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-4/12 text-center truncate">南崁中正</p>
          </div>
        </Step>
        <Step class="">
          <div class="flex justify-start flex-nowrap space-x-2">
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-1/12 text-center ">MD</p>
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-4/12 text-center ">00000330</p>
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-4/12 text-center truncate">南崁中正</p>
          </div>
        </Step>
        <Step class="">
          <div class="flex justify-start flex-nowrap space-x-2">
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-1/12 text-center ">MD</p>
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-4/12 text-center ">00000330</p>
            <p class="my-0 py-px px-2 rounded-md bg-white text-neutral-500 w-4/12 text-center truncate">南崁中正</p>
          </div>
        </Step>

      </Steps>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .divide {
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, #086eb6 0%, #086eb6 70%, transparent 50%);
    background-size: 30px 2px;
    background-repeat: repeat-x;
  }

  ::v-deep .van-step__circle-container {
    @apply text-sm;
    .van-icon-checked:before {
      @apply content-[''] w-3 h-3 bg-primary rounded-xl;
    }

    .van-step__circle {
      @apply content-[''] w-3 h-3 border-4 bg-white border-primary border-solid box-border rounded-xl;
    }
  }

  ::v-deep .van-step__line {
    @apply w-1 -left-[17px] bg-primary top-0;

    &:last-child {
      @apply w-1;
    }
  }
</style>