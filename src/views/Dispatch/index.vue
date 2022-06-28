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
})

const checkInBtn = () => {
  if (!dispatchStore.dispatchs || dispatchStore.dispatchs.length == 0) {
    console.warn('dispaths is not exist')
  }

  const { id: dispatch_id } = dispatchStore.dispatchs[0]

  router.push({
    path: '/checkin',
    query: {
      dispatch_id,
      dispatch_name: '',
    },
  })
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top fixed title="派工單">
      <template #right>
        <Button @click="checkInBtn" round size="mini" class="bg-[#eb5e55] text-white px-3 py-1">報到</Button>
      </template>
    </NavBar>

    <!-- 插件工作塊 -->
    <!-- <div class="py-2 w-full h-40"> -->
    <!-- <p class="text-center text-success m-0">插件工作</p> -->
    <!-- </div> -->

    <!-- 本日工作塊 -->
    <div class="px-[26px]">
      <p class="text-center text-primary">本日工作</p>
      <ContainerOnloadCard v-for="dispatch in mockData" :key="dispatch.id" v-bind="dispatch" class="mb-6">
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
          <Button
            size="mini"
            round
            class="border-2 border-solid border-emerald-500 bg-emerald-500 text-white px-3 py-1"
          >
            容器裝車紀錄
          </Button>
          <Button
            size="mini"
            round
            class="border-2 border-solid border-neutral-500 bg-neutral-500 text-white px-3 py-1"
          >
            餐廳明細
          </Button>
        </div>
      </ContainerOnloadCard>
    </div>
  </div>
</template>
