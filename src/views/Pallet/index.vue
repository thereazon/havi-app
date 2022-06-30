<script setup>
import { Button, NavBar } from 'vant'
import { onMounted } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { useRoute, useRouter } from 'vue-router'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'

const dispatchStore = useDispatchInfo()
const route = useRoute()
const router = useRouter()

const { car_id, container_id } = route.query
const isCarIdExist = () => !!car_id

onMounted(() => {
  if (!isCarIdExist()) {
    router.push({ path: '/cars' })
  }
  dispatchStore.getDispatchAction(car_id, container_id)
  console.log(dispatchStore.dispatchs)
})

const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top left-arrow @click-left="onClickLeft" fixed title="容器裝車紀錄"> </NavBar>
    <div class="px-[26px]">
      <ContainerOnloadCard class="mb-6"> </ContainerOnloadCard>
    </div>
  </div>
</template>
