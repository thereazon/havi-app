<script setup>
import { onMounted } from 'vue'
import useAccountInfo from '@/views/Login/store'
import useTempInfo from '@/views/Temperature/store'
import { useRoute } from 'vue-router'
const accountStore = useAccountInfo()
const tempStore = useTempInfo()
const router = useRoute()

console.log(router.query.container_id)
console.log(accountStore.account.fleet_id)
// 請用這兩組id去獲取溫度資訊

onMounted(() => {
  tempStore.getTemperatureAction(router.query.container_id) // 需要先判斷container_id是否存在，若不存在請把它彈回車次選擇頁面 /cars
})
</script>

//todo ui
<template>
  <div>車號</div>
  <div>{{ accountStore.account.fleet }}</div>
  <div>櫃號</div>
  <div>{{ accountStore.account.fleet }}</div>

  <div>溫度區塊</div>
</template>
