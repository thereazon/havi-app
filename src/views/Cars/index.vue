<script setup>
import { onMounted, ref } from 'vue'
import { Button, Cell } from 'vant'
import { useRouter } from 'vue-router'
import useAccountInfo from '@/views/Login/store'
import useCarsInfo from '@/views/Cars/store'
import useDispatchInfo from '@/views/Dispatch/store'
import useContainersInfo from '@/views/Containers/store'

const router = useRouter()

const accountStore = useAccountInfo()
const carsStore = useCarsInfo()
const dispatchStore = useDispatchInfo()
const containersStore = useContainersInfo()

const selectCarId = ref()
const selectContainerId = ref()
const errorMessage = ref()

const comfirmDispatch = () => {
  dispatchStore.getDispatchAction(selectCarId.value, selectContainerId.value).then(() => {
    const car = carsStore.cars.find((v) => v.id === selectCarId.value)
    const container = carsStore.containers.find((v) => v.id === selectContainerId.value)
    if (dispatchStore.dispatchs.length > 0) {
      router.push({
        path: `/dispatch`,
        query: {
          car_id: selectCarId.value,
          container_id: selectContainerId.value,
          car_number: car ? car.number : null,
          container_number: container ? container.number : null,
        },
      })
    } else {
      errorMessage.value = '您的出車資訊與系統不符</br>請與值班人員進行聯繫'
    }
  })
}

const getContainers = () => {
  containersStore.getContainersAction(selectCarId.value, selectContainerId.value).then(() => {
    if (containersStore.containers.length > 0) {
      router.push({
        path: `/containers`,
        query: {
          car_id: selectCarId.value,
          container_id: selectContainerId.value,
        },
      })
    } else {
      errorMessage.value = '沒有容器對點單資料'
    }
  })
}

onMounted(() => {
  carsStore.getCarsAction()
})
</script>

<template>
  <div class="bg-primary bg-opacity-[0.05] h-[100vh]">
    <div class="flex flex-col items-stretch px-[50px]">
      <div class="mt-[75px] m-auto"><img src="/login_car.png" alt="icon" /></div>
      <div class="mt-[20px]">
        <div class="text-gray">您的車隊</div>
        <Cell
          value-class="text-[#828282] text-[22px]"
          class="bg-white border border-solid border-gray mt-2 mb-[67px]"
          >{{ accountStore.account.fleet }}</Cell
        >
      </div>
      <div>
        <div class="text-gray mb-2">選擇車號</div>
        <select v-model="selectCarId" class="havi-select" name="選擇車號" id="select-car-number">
          <option v-for="car in carsStore.cars" :key="car.id" :value="car.id">{{ car.number }}</option>
        </select>
      </div>
      <div>
        <div class="text-gray mb-2">選擇櫃號</div>
        <select v-model="selectContainerId" class="havi-select" name="選擇櫃號" id="select-container-number">
          <option value="">請選擇</option>
          <option v-for="container in carsStore.containers" :key="container.id" :value="container.id">
            {{ container.number }}
          </option>
        </select>
      </div>
      <div class="text-warning mt-3 text-center" v-html="errorMessage"></div>

      <Button
        loading-type="spinner"
        class="mt-[70px] bg-success text-white"
        round
        block
        native-type="submit"
        @click="comfirmDispatch"
      >
        完成</Button
      >

      <Button
        loading-type="spinner"
        class="my-[40px] bg-[#6e6e6f] text-white"
        round
        block
        native-type="submit"
        @click="getContainers"
        >查看容器對點單</Button
      >
    </div>
  </div>
</template>
