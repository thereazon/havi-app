<script setup>
import { Button, NavBar } from 'vant'
</script>

<template>
  <div class="bg-[#F2F8FB] h-screen font-sans pb-24">
    <NavBar safe-area-inset-top fixed left-arrow title="設定" />

    <div class="flex flex-col justify-center items-center">
      <div class="mt-28 bg-[#fff] border border-gray text-gray border-dashed h-[210px] w-[315px] relative">
        <div class="flex-col absolute -top-[32px] inset-x-0 text-center">
          <div class="bg-[#fff] border border-gray border-dashed rounded-full p-1 w-[56px] mx-auto">
            <img class="w-[52px] ml-0.5" src="/menu_gear_icon2.png" />
          </div>
          <h2 class="font-black px-4 text-[17px] text-success">羅小易</h2>
        </div>
        <div class="flex flex-col mx-6 h-[100px] pb-0.5 mt-20 bottom-dashed">
          <div class="flex justify-between mt-1">
            <label class="block text-[14px] leading-[24px]">工號</label>
            <div class="text-center text-[14px] leading-[22px]">A123456789</div>
          </div>
          <div class="flex justify-between mt-1">
            <label class="block text-[14px] leading-[24px]">生日</label>
            <div class="text-center text-[13px] leading-[22px]">01/01/1980</div>
          </div>
          <div class="flex justify-between font-black text-[#000] mt-1">
            <label class="block text-[17px] leading-[24px]">車隊名稱</label>
            <div class="text-center text-[16px] leading-[22px]">夏暉物流</div>
          </div>
        </div>
      </div>

      <div class="font-black mt-8 w-[315px] text-[15px] leading-normal text-gray">
        <div class="bg-[#fff] border border-gray border-dashed h-[70px] mb-3 rounded-lg flex items-center">
          <div class="basis-1/5 flex justify-center items-center">
            <img class="h-[30px]" src="/gear_Version.png" />
          </div>
          <div class="flex flex-col">
            <span>版本資訊</span>
            <span class="text-success text-[13px] leading-relaxed">1.3.2</span>
          </div>
        </div>

        <div class="bg-[#fff] border border-gray border-dashed h-[70px] mb-3 rounded-lg flex items-center">
          <div class="basis-1/5 flex justify-center items-center">
            <img class="h-[30px]" src="/dispatching_phone_2.png" />
          </div>
          <div class="basis-2/5 flex-col">
            <span>北部配銷中心</span>
            <span class="text-success text-[13px] leading-relaxed">(03)322-3550</span>
          </div>
          <div class="basis-2/5 flex-col">
            <span>中部配銷中心</span>
            <span class="text-success text-[13px] leading-relaxed">(04)322-3550</span>
          </div>
        </div>
      </div>

      <div class="w-[192px] my-28">
        <Button class="bg-[#f2f2f2]" color="#707070" loading-type="spinner" block plain round>登出</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.van-nav-bar__content) {
  height: 60px;
}
:deep(.van-icon-arrow-left) {
  color: gray;
}
:deep(.van-nav-bar__title) {
  font-size: 12px;
  color: #707070;
}

:deep(.van-button--default) {
  height: 50px;
  border-radius: 100px;
  border-width: 2px;
  font-size: 17px;
  font-weight: bold;
}
.bottom-dashed {
  border-bottom: 1px dashed #707070;
}
</style>
