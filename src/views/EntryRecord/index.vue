<script setup>
import { ref, reactive, computed } from 'vue'
import dayjs from 'dayjs'
import { NavBar, Button, ActionSheet } from 'vant'
import { VueScrollPicker } from 'vue-scroll-picker'
import useAccountInfo from '@/views/Login/store'
import router from '@/router'

const accountStore = useAccountInfo()
const temperature = reactive({
  integer: 34,
  decimal: 0,
})
const currentDate = dayjs().format('MM/DD/YYYY')
const currentTime = dayjs().format('HH:mm')
const integerOptions = Array.from({ length: 30 }, (_, index) => index + 20)
const decimalOptions = Array.from({ length: 10 }, (_, index) => index)
const computedTemperature = computed(() => temperature.integer + temperature.decimal / 10)
const openActionSheet = ref(false)

const toggleTemperatureSheet = () => {
  openActionSheet.value = !openActionSheet.value
}

const onClickLeft = () => {
  router.back()
}
</script>
<template>
  <div class="bg-[#F2F8FB] h-screen">
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="進場紀錄" />
    <div class="flex flex-col justify-center items-center">
      <div class="mt-24 border-solid border-success border-2 rounded-2xl h-[226px] w-[323px] bg-white">
        <h2 class="px-4 text-[13px] text-success">進場時間</h2>
        <div class="flex justify-start mt-3 px-4 bottom-dashed pb-4">
          <div class="flex items-center space-x-1">
            <img class="w-[18px]" src="/dispatching_calendar.png" alt="" />
            <div class="w-[80px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ currentDate }}</div>
          </div>
          <div class="flex items-center space-x-1 ml-2">
            <img class="w-[18px]" src="/dispatching_clock.png" alt="" />
            <div class="w-[43px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ currentTime }}</div>
          </div>
        </div>
        <div class="flex flex-col px-4 justify-between h-[100px] mt-3">
          <div class="flex justify-between">
            <label class="block text-[13px] text-success">司機</label>
            <div class="w-[222px] h-[24px] text-gray text-center text-[13px] bg-[#f2f2f2] leading-relaxed">
              {{ accountStore.account.name }}
            </div>
          </div>
          <div class="flex justify-between">
            <label class="block text-[13px] text-success">車號</label>
            <div class="w-[222px] h-[24px] text-gray text-center text-[13px] bg-[#f2f2f2] leading-relaxed">
              A26-8839-2222
            </div>
          </div>
          <div class="flex justify-between">
            <label class="block text-[13px] text-success">櫃號</label>
            <div class="w-[222px] h-[24px] text-gray text-center text-[13px] bg-[#f2f2f2] leading-relaxed">
              B27-BGD-233432
            </div>
          </div>
        </div>
      </div>
      <form class="w-[277px]">
        <div class="mt-8">
          <label for="dispatch-no" class="block mb-2 text-[13px] font-medium text-gray-900">選擇派工單號</label>
          <select
            name=""
            id="dispatch-no"
            class="bg-[#fffcf6] border-dashed border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-4 h-[48px]"
            @change="handleOnChange"
          >
            <!-- <option v-for="dispatchNo in selectOptions" :value="dispatchNo" :key="dispatchNo">{{ dispatchNo }}</option> -->
            <option>ABC-192374-2983</option>
          </select>
        </div>
        <div class="mt-8 temperature">
          <label for="dispatch-no" class="block mb-2 text-[13px] font-medium text-gray-900">填寫體溫</label>
          <div
            name=""
            id="dispatch-no"
            class="bg-[#fffcf6] border-dashed border-gray-300 text-gray-900 text-sm w-[277px] h-[48px] flex justify-center items-center"
            @click="toggleTemperatureSheet"
          >
            <!-- 36.4 -->
            {{ computedTemperature }}
          </div>
        </div>
        <Button class="bg-success mt-28" loading-type="spinner" round block type="success" native-type="submit"
          >報到</Button
        >
      </form>
    </div>
    <ActionSheet v-model:show="openActionSheet" title="體溫">
      <div class="h-[251px] py-3 px-4">
        <div class="flex">
          <VueScrollPicker :options="integerOptions" v-model="temperature.integer" />
          <VueScrollPicker :options="decimalOptions" v-model="temperature.decimal" />
        </div>
        <Button class="bg-success mt-8" round block type="success" @click="toggleTemperatureSheet">確認</Button>
      </div>
    </ActionSheet>
  </div>
</template>
<style src="vue-scroll-picker/lib/style.css"></style>
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
.bottom-dashed {
  border-bottom: 2px dashed #6dbe5b;
}
.temperature {
  cursor: pointer;
}
</style>
