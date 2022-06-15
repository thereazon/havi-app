<script setup>
import { onMounted } from 'vue'
import { Button } from 'vant'
import useAccountInfo from '@/views/Login/store'
import useCarsInfo from '@/views/Cars/store'

const accountStore = useAccountInfo()
const carsStore = useCarsInfo()

onMounted(() => {
  carsStore.getCarsAction()
})
</script>

//todo ui
<template>
  <div>您的車隊</div>
  <div>{{ accountStore.account.fleet }}</div>

  <div>
    選擇車號
    <select name="選擇車號" id="">
      <option v-for="car in carsStore.cars" :key="car.id">{{ car.number }}</option>
    </select>
  </div>
  <div>
    選擇櫃號
    <select name="選擇櫃號" id="">
      <option v-for="container in carsStore.containers" :key="container.id">{{ container.number }}</option>
    </select>
  </div>

  <Button loading-type="spinner" class="mt-[70px]" round block type="success" native-type="submit"> 完成</Button>

  <Button loading-type="spinner" class="mt-[70px]" round block type="success" native-type="submit">
    查看容器對點</Button
  >
  <!-- 按鈕顏色記得換下 -->
  <!-- 請把容器id帶在url上跳到容器頁面 eg http://localhost:3000/containers?id="CC6033764f892b5" -->
</template>
