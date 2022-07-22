<script setup>
import { ref, reactive, onMounted } from 'vue'
import { NavBar, Button, Popup, Toast } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from './store'
import TemperatureActionSheet from './components/TemperatureActionSheet.vue'
import RestaurantMenuPopup from './components/RestaurantMenuPopup.vue'
import RestaurantInfoCard from '@/components/RestaurantInfoCard.vue'
import UploadImage from '@/components/uploadImage.vue'

const { dispatch, currentRestaurant } = useDispatchInfo()
const restaurantStore = useRestaurant()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!dispatch || !currentRestaurant) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  }
})

const temperature = reactive({
  refrigeration: null,
  freezing: null,
})
const isCelsiusTemp = ref(false)
const isShowMenu = ref(false)
const isShowPopup = ref(false)
const isLockedTempAndFinishedPhoto = ref(false)

const showPopup = () => {
  isShowPopup.value = true
}

const computeTemp = (data) => {
  let temp = null
  switch (data.sign) {
    case '+':
      temp = Math.abs(data.integer + data.decimal / 10)
      break
    case '-':
      temp = Math.abs(data.integer + data.decimal / 10) * -1
      break

    default:
      temp = Math.abs(data.integer + data.decimal / 10)
      break
  }

  return temp
}
// 冷凍溫度邏輯
const isShowFreezing = ref(false)
const showFreezingActionSheet = () => {
  isShowFreezing.value = true
}

const confirmFreezingTemperature = (data) => {
  temperature.freezing = computeTemp(data)
  isShowFreezing.value = false
}

// 冷藏溫度邏輯
const isShowRefrigeration = ref(false)
const showRefrigerationActionSheet = () => {
  isShowRefrigeration.value = true
}
const confirmRefrigerationTemperature = (data) => {
  temperature.refrigeration = computeTemp(data)
  isShowRefrigeration.value = false
}

const onClickLeft = () => {
  router.push({
    path: '/restaurantlist',
    query: {
      ...route.query,
    },
  })
}

const onClickRight = () => {
  isShowMenu.value = true
}

const submitTemperature = () => {
  isShowPopup.value = false
}

const handleFetchTemp = () => {
  if (route.query.car_id && route.query.container_id) {
    restaurantStore.getTemperatureAction(route.query.car_id, route.query.container_id)
  }
}
</script>

<template>
  <div class="bg-[#F2F8FB] h-screen">
    <RestaurantMenuPopup v-model:isShow="isShowMenu" />
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
      <RestaurantInfoCard
        v-if="dispatch"
        :temp_zone="dispatch.temp_zone"
        :no="dispatch.no"
        :restaurant="currentRestaurant"
      />
      <div class="mt-10 text-primary flex flex-row justify-between">
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

        <Button class="rounded-full border-2 h-[31px] w-[97px]" plain type="success" @click="handleFetchTemp"
          >擷取溫度</Button
        >
      </div>
      <div class="mt-5">
        <div class="w-full flex justify-evenly items-center text-[10px] font-bold mb-2">
          <span class="w-[16%] text-primary"></span>
          <div class="w-[42%] h-[50%] flex justify-center items-center text-gray">目前溫度</div>
          <div class="w-[18%] h-[50%] flex justify-center items-center text-gray">櫃台溫度</div>
        </div>
        <div
          class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
        >
          <span class="w-[16%] text-primary">冷凍品溫</span>
          <div class="w-[42%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
            -12.2°C / -30.1°F
          </div>
          <div class="w-[18%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
            <!-- 冷凍品溫 -->
            {{ temperature.freezing ? temperature.freezing : '-' }}
          </div>
        </div>
        <div
          class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
        >
          <span class="w-[16%] text-primary">冷藏品溫</span>
          <div class="w-[42%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
            -12.2°C / -30.1°F
          </div>
          <div class="w-[18%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
            <!-- 冷藏品溫 -->
            {{ temperature.refrigeration ? temperature.refrigeration : '-' }}
          </div>
        </div>

        <div class="flex justify-around mt-10">
          <Button class="rounded-full h-[36px] w-[134px]" type="danger">鎖定溫度</Button>
          <Button class="rounded-full h-[36px] w-[134px] bg-primary text-white" @click="showPopup">實測溫度</Button>
        </div>
      </div>
      <UploadImage title="實測溫度" />
      <Button
        class="bg-success mt-8"
        loading-type="spinner"
        round
        block
        type="success"
        native-type="submit"
        :disabled="!isLockedTempAndFinishedPhoto"
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
          <div
            class="w-[205px] h-[37px] bg-[#f2f2f2] rounded-md flex justify-center items-center"
            @click="showFreezingActionSheet"
          >
            {{ temperature.freezing }}
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <span class="text-[12px] text-center text-[#086eb6] flex items-center">冷藏品溫</span>
          <div
            class="w-[205px] h-[37px] bg-[#f2f2f2] rounded-md flex justify-center items-center"
            @click="showRefrigerationActionSheet"
          >
            {{ temperature.refrigeration }}
          </div>
        </div>
        <Button
          class="bg-success mt-8"
          loading-type="spinner"
          round
          block
          type="success"
          native-type="submit"
          @click.prevent="submitTemperature"
          >確認</Button
        >
      </form>
    </div>
  </Popup>
  <TemperatureActionSheet
    title="冷藏品溫"
    v-model:isShow="isShowRefrigeration"
    @confirm="confirmRefrigerationTemperature"
  />
  <TemperatureActionSheet title="冷凍品溫" v-model:isShow="isShowFreezing" @confirm="confirmFreezingTemperature" />
</template>

<style scoped>
/* :deep(.van-icon-arrow-left) {
  color: gray;
}
:deep(.van-nav-bar__title) {
  font-size: 12px;
  color: #707070;
} */
</style>
