<script setup>
import { Button } from 'vant'
import { onMounted } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { useRoute, useRouter } from 'vue-router'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'

const dispatchStore = useDispatchInfo()
const route = useRoute()
const router = useRouter()

const { car_id, container_id } = route.query
const isContainerIdExist = () => !!container_id

onMounted(() => {
  if (!isContainerIdExist()) {
    router.push({ path: '/cars' })
  }

  dispatchStore.getDispatchAction(car_id, container_id) // 需要先判斷container_id是否存在，若不存在請把它彈回車次選擇頁面 /cars
})
</script>

<template>
  <div class="bg-main bg-opacity-5 h-screen">
    <ContainerOnloadCard v-for="dispatch in dispatchStore.dispatchs" :key="dispatch.id" v-bind="dispatch">
      <div class="flex justify-around w-100 bg-white p-4">
        <Button
          size="mini"
          round
          plain
          type="primary"
          class="border-2 border-solid border-primary text-primary px-3 py-1"
        >
          預冷溫度
        </Button>
        <Button size="mini" round class="border-2 border-solid border-emerald-500 bg-emerald-500 text-white px-3 py-1">
          容器裝車紀錄
        </Button>
        <Button size="mini" round class="border-2 border-solid border-neutral-500 bg-neutral-500 text-white px-3 py-1">
          餐廳明細
        </Button>
      </div>
    </ContainerOnloadCard>
  </div>
</template>
