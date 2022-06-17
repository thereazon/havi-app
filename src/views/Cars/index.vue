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

const comfirmDispatch = () => {
  dispatchStore.getDispatchAction(selectCarId.value, selectContainerId.value).then(() => {
    router.push({
      path: `/dispatch`,
      query: {
        car_id: selectCarId.value,
        container_id: selectContainerId.value,
      },
    })
  })
}

const getContainers = () => {
  containersStore.getContainersAction(selectCarId.value, selectContainerId.value).then(() => {
    router.push({
      path: `/containers`,
      query: {
        car_id: selectCarId.value,
        container_id: selectContainerId.value,
      },
    })
  })
}

onMounted(() => {
  carsStore.getCarsAction()
})
</script>

<template>
  <div class="bg-primary bg-opacity-[0.05] flex flex-col items-stretch px-[50px]">
    <div class="mt-[75px] m-auto"><img src="/login_car.png" alt="icon" /></div>
    <div class="mt-[20px]">
      <div class="text-gray">您的車隊</div>
      <Cell value-class="text-[#828282] text-[22px]" class="bg-white border-solid border-gray mt-2 mb-[67px]">{{
        accountStore.account.fleet
      }}</Cell>
    </div>
    <div>
      <div class="text-gray mb-2">選擇車號</div>

      <select v-model="selectCarId" class="w-full border-dashed p-5 bg-[#fffcf6] mb-4" name="選擇車號" id="">
        <option v-for="car in carsStore.cars" :key="car.id" :value="car.id">{{ car.number }}</option>
      </select>
    </div>
    <div>
      <div class="text-gray mb-2">選擇櫃號</div>
      <select v-model="selectContainerId" class="w-full border-dashed p-5 bg-[#fffcf6]" name="選擇櫃號" id="">
        <option v-for="container in carsStore.containers" :key="container.id" :value="container.id">
          {{ container.number }}
        </option>
      </select>
    </div>

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
  <!-- 按鈕顏色記得換下 -->
  <!-- 請把容器id帶在url上跳到容器頁面 eg http://localhost:3000/containers?id="CC6033764f892b5" -->
</template>
