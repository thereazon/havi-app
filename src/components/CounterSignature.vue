<script setup>
import { reactive, ref } from 'vue'
import { currentTempData, TempForm } from '@/utils/mock'
import { Checkbox, CheckboxGroup } from 'vant'
import SignatureComponent from './SignatureComponent.vue'
import SecurityCodeDialog from './SecurityCodeDialog.vue'

const checked = ref([])
const isCelsiusTemp = ref(false)
const state = reactive({
  freezing: '',
  refrigeration: ''
})
const isSecurityCodeDialog = ref(false)
const confirm = () => {
  isSecurityCodeDialog.value = true
}
</script>

<template>
  <div class="h-full pt-[26px] px-[10%] bg-[#daf0ff]">
    <div class="text-primary flex flex-col">
      <div class="text-[0.9375rem] mb-[4px] flex items-center">
        <span class="mr-[5px]">當前溫度</span>
        <div class="w-[15px] h-[15px] text-white rounded-full bg-primary flex justify-center items-center">?</div>
      </div>
      <div class="text-[0.75rem] font-bold">
        <span class="mr-[10px]">11/23/2020</span>
        <span>10:12</span>
      </div>
    </div>

    <div class="w-full my-1.5 flex justify-evenly items-center text-gray text-[0.75rem] font-bold">
      <span class="w-[16%]"></span>
      <div class="w-[42%] flex justify-center items-center">目前溫度</div>
      <div class="w-[18%] flex justify-center items-center">櫃台溫度</div>
    </div>
    <div
      v-for="(item, index) in currentTempData"
      :key="index"
      class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
    >
      <span class="w-[16%] text-primary">{{item.title}}</span>
      <div class="w-[42%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">{{item.currentTempe}}</div>
      <div class="w-[18%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">{{item.counterTempe}}</div>
    </div>

    <div class="mt-[37px] mb-4 flex justify-between items-center">
      <span class="text-primary text-[0.9375rem]">填寫溫度</span>
      <div
        class="w-[30%] h-[14px] text-[0.75rem] rounded-md bg-primary border-[3px] border-solid border-primary flex items-center"
        @click="isCelsiusTemp = !isCelsiusTemp"
      >
        <span
          class="w-[50%] h-full flex justify-center items-center"
          :class="[isCelsiusTemp ? 'text-white' : 'text-primary bg-white rounded-l-md']"
        >°C</span>
        <span
          class="w-[50%] h-full flex justify-center items-center"
          :class="[isCelsiusTemp ? 'text-primary bg-white rounded-r-md' : 'text-white']"
        >°F</span>
      </div>
    </div>
    <div
      v-for="item in TempForm"
      :key="item.key"
      class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
    >
      <span class="w-[16%] text-primary">{{item.title}}</span>
      <input
        class="w-[60%] h-[24px] py-0 px-1 border-0 text-center bg-[#f2f2f2] rounded-md text-[#242424]"
        v-model="state[item.key]"
      />
    </div>
    <div class="w-full h-[42px] rounded-xl shadow-md bg-white flex items-center text-[0.75rem] font-bold">
      <CheckboxGroup v-model="checked" direction="horizontal">
        <Checkbox shape="square" name="a">蟲鼠害確認</Checkbox>
        <Checkbox shape="square" name="b">車廂清潔確認</Checkbox>
      </CheckboxGroup>
    </div>

		<SignatureComponent />

    <div
      class="h-11 mt-7 text-white font-bold text-[1.0625rem] flex justify-center items-center bg-success rounded-full"
      @click="confirm()"
    >
      完成
    </div>

    <SecurityCodeDialog v-model:isShowDialog="isSecurityCodeDialog" :isCloseOnClickOverlay="true" />
  </div>
</template>

<style scoped>
:deep(.van-checkbox__label) {
  color: #086eb6 !important;
  font-size: 0.75rem;
  font-weight: bold;
}
:deep(.van-checkbox-group--horizontal) {
  width: 100%;
  justify-content: space-evenly;
}
:deep(.van-checkbox__icon .van-icon) {
  border: none;
  border-radius: 5px;
  background: #f2f2f2;
}
:deep(.van-checkbox__icon--checked .van-icon) {
  color: #6dbe5b;
}
</style>