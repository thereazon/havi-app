<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { NavBar, Button, Popup, Toast, ActionSheet } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { VueScrollPicker } from 'vue-scroll-picker'
import UploadImage from '@/components/uploadImage.vue'

import { currentTempData, TempForm } from '@/utils/mock'

const router = useRouter()

const temperature = reactive({
  sign: 'plus', //plus: 正, minus: 負
  integer: 0,
  decimal: 0,
})
const isCelsiusTemp = ref(false)
const signOptions = ['+', '-']
const integerOptions = Array.from({ length: 100 }, (_, index) => index)
const decimalOptions = Array.from({ length: 10 }, (_, index) => index)

const isShowPopup = ref(false)
const showPopup = () => {
  isShowPopup.value = true
}

const onClickLeft = () => {
  router.back()
}

const onClickRight = () => Toast('按钮')

const openActionSheet = ref(false)
const toggleTemperatureSheet = () => {
  openActionSheet.value = !openActionSheet.value
}
</script>

<template>
  <div class="bg-[#F2F8FB] h-screen">
    <NavBar
      safe-area-inset-top
      fixed
      left-arrow
      title="餐廳溫度確認"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      ><template #right> <van-icon name="wap-nav" size="14" color="black" /> </template>
    </NavBar>
    <div class="px-[26px] bg-[#F2F8FB] pt-20">
      <div class="text-primary flex flex-row justify-between">
        <div class="flex flex-col">
          <div class="text-[0.9375rem] mb-[4px] flex items-center">
            <span class="mr-[5px]">餐廳溫度確認</span>
            <div class="w-[15px] h-[15px] text-white rounded-full bg-primary flex justify-center items-center">?</div>
          </div>
          <div class="text-[0.75rem] font-bold">
            <span class="mr-[10px]">11/23/2020</span>
            <span>10:12</span>
          </div>
        </div>

        <Button class="rounded-full border-2 h-[31px] w-[97px]" plain type="success">擷取溫度</Button>
      </div>
      <div class="mt-5">
        <div class="w-full flex justify-evenly items-center text-[10px] font-bold mb-2">
          <span class="w-[16%] text-primary"></span>
          <div class="w-[42%] h-[50%] flex justify-center items-center text-gray">目前溫度</div>
          <div class="w-[18%] h-[50%] flex justify-center items-center text-gray">櫃台溫度</div>
        </div>
        <div
          v-for="(item, index) in currentTempData"
          :key="index"
          class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
        >
          <span class="w-[16%] text-primary">{{ item.title }}</span>
          <div class="w-[42%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
            {{ item.currentTempe }}
          </div>
          <div class="w-[18%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
            {{ item.counterTempe }}
          </div>
        </div>
        <div class="flex justify-around mt-10">
          <Button class="rounded-full h-[36px] w-[134px]" type="danger">鎖定溫度</Button>
          <Button class="rounded-full h-[36px] w-[134px] bg-primary text-white" @click="showPopup">實測溫度</Button>
        </div>
      </div>
      <UploadImage title="實測溫度" />
      <Button class="bg-success mt-8" loading-type="spinner" round block type="success" native-type="submit"
        >完成</Button
      >
    </div>
  </div>
  <Popup v-model:show="isShowPopup" class="w-[325px] h-[366px] rounded-[20px]">
    <div class="py-[26px] px-[28px]">
      <h1 class="text-center text-[#707070] text-[17px] mb-0">實測溫度</h1>
      <h2 class="text-center text-[#a4a4a4] text-[12px]">請填寫實際溫度</h2>
      <div>
        <div
          class="w-[30%] h-[14px] text-[0.75rem] rounded-md bg-primary border-[3px] border-solid border-primary flex items-center ml-auto"
          @click="isCelsiusTemp = !isCelsiusTemp"
        >
          <span
            class="w-[50%] h-full flex justify-center items-center"
            :class="[isCelsiusTemp ? 'text-white' : 'text-primary bg-white rounded-l-md']"
            >°C</span
          >
          <span
            class="w-[50%] h-full flex justify-center items-center"
            :class="[isCelsiusTemp ? 'text-primary bg-white rounded-r-md' : 'text-white']"
            >°F</span
          >
        </div>
      </div>
      <form class="flex flex-col mt-5">
        <div class="flex justify-between">
          <span class="text-[12px] text-center text-[#086eb6] flex items-center">冷凍品溫</span>
          <div class="w-[205px] h-[37px] bg-[#f2f2f2] rounded-md" @click="toggleTemperatureSheet"></div>
        </div>
        <div class="flex justify-between mt-4">
          <span class="text-[12px] text-center text-[#086eb6] flex items-center">冷藏品溫</span>
          <div class="w-[205px] h-[37px] bg-[#f2f2f2] rounded-md" @click="toggleTemperatureSheet"></div>
        </div>
        <Button
          class="bg-success mt-8"
          loading-type="spinner"
          round
          block
          type="success"
          native-type="submit"
          @click.prevent="toggleTemperatureSheet"
          >確認</Button
        >
      </form>
    </div>
  </Popup>
  <ActionSheet v-model:show="openActionSheet" title="溫度">
    <div class="h-[251px] py-3 px-4">
      <div class="flex">
        <VueScrollPicker :options="signOptions" v-model="temperature.sign" />
        <VueScrollPicker :options="integerOptions" v-model="temperature.integer" />
        <VueScrollPicker :options="decimalOptions" v-model="temperature.decimal" />
      </div>
      <Button class="bg-success mt-8" round block type="success" @click="toggleTemperatureSheet">確認</Button>
    </div>
  </ActionSheet>
</template>
<style src="vue-scroll-picker/lib/style.css"></style>
<style scoped>
:deep(.van-icon-arrow-left) {
  color: gray;
}
:deep(.van-nav-bar__title) {
  font-size: 12px;
  color: #707070;
}
</style>
