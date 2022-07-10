<script setup>
import dayjs from 'dayjs'
import { ref, onMounted } from 'vue'
import { NavBar, Button } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import usePreCoolInfo from '@/views/PreCool/store'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'
import SecurityCodeDialog from '@/components/SecurityCodeDialog.vue'
import UploadImage from '@/components/uploadImage.vue'

const isSecurityCodeDialog = ref(false)
const confirm = () => {
  // isSecurityCodeDialog.value = true
  preCoolStore.postTemperature()
}

const preCoolStore = usePreCoolInfo()
const dispatchStore = useDispatchInfo()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!dispatchStore.dispatch) {
    router.back()
  }
})

const onClickLeft = () => {
  router.back()
}

const handleFetchTemp = () => {
  if (route.query.car_id) {
    preCoolStore.getTemperatureAction(route.query.car_id)
  }
}

const currentDate = dayjs().format('MM/DD/YYYY')
const currentTime = dayjs().format('HH:mm')

const routeToSignPage = () => {
  router.push({
    path: '/precool/sign',
    query: {
      ...route.query,
    },
  })
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top left-arrow @click-left="onClickLeft" fixed title="預冷溫度"> </NavBar>
    <div class="px-[26px]">
      <ContainerOnloadCard v-if="dispatchStore.dispatch" v-bind="dispatchStore.dispatch" class="mb-6">
      </ContainerOnloadCard>
      <div class="text-primary flex flex-col">
        <div class="text-[0.9375rem] mb-[4px] flex items-center">
          <span class="mr-[5px]">當前溫度</span>
        </div>
        <div class="text-[0.75rem] font-bold">
          <span class="mr-[10px]">{{ currentDate }}</span>
          <span>{{ currentTime }}</span>
        </div>
      </div>
      <div class="w-full my-1.5 flex justify-evenly items-center text-gray text-[0.75rem] font-bold">
        <span class="w-[16%]"></span>
        <div class="w-[42%] flex justify-center items-center">目前溫度</div>
        <div class="w-[18%] flex justify-center items-center">櫃台溫度</div>
      </div>
      <div
        class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
      >
        <span class="w-[16%] text-primary">冷凍品溫</span>
        <div class="w-[42%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
          {{
            preCoolStore.temperature && `${preCoolStore.temperature.c.frozen}°C/${preCoolStore.temperature.f.frozen}°F`
          }}
        </div>
        <div class="w-[18%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
          {{ preCoolStore.currentTemp ? `${preCoolStore.currentTemp}°${preCoolStore.degree_type}` : '-' }}
        </div>
      </div>
      <div class="w-full flex mt-20 mb-5">
        <Button
          round
          plain
          type="primary"
          v-on:click="handleFetchTemp"
          class="mr-2 border-2 border-solid border-primary text-primary px-3 py-1 flex-1"
        >
          擷取目前溫度
        </Button>
        <Button
          round
          plain
          :disabled="preCoolStore.temperature ? false : true"
          v-on:click="routeToSignPage"
          type="primary"
          class="ml-2 border-2 border-solid border-success bg-success text-white px-3 py-1 flex-1"
        >
          櫃檯簽名
        </Button>
      </div>

      <UploadImage title="車機溫度" />

      <div class="w-full">
        <div class="mt-8 mb-[5px] text-[#959595] flex items-center justify-center relative">
          <div class="text-center text-[0.8125rem] font-bold">櫃台簽名</div>
        </div>
        <div class="divide w-full h-28 border-1 border-solid border-transparent">
          <img v-if="preCoolStore.signImage" alt="sign" class="w-full h-full" :src="preCoolStore.signImage" />
        </div>
      </div>

      <Button class="w-full h-11 mt-7 text-white font-bold text-[1.0625rem] bg-success rounded-full" @click="confirm()">
        完成
      </Button>
      <SecurityCodeDialog v-model:isShowDialog="isSecurityCodeDialog" :isCloseOnClickOverlay="true" />
    </div>
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

.divide {
  background: linear-gradient(#fffcf6, #fffcf6) padding-box,
    repeating-linear-gradient(-45deg, #707070 0, #707070 0.6rem, #fffcf6 0, #fffcf6 1rem);
}
</style>
