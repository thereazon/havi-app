<script setup>
import { Button, NavBar } from 'vant'
import { onMounted, computed } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { useRoute, useRouter } from 'vue-router'
import { showPreCoolChecked, DispatchStatusType } from '@/views/Dispatch/helper'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'

const dispatchStore = useDispatchInfo()
const route = useRoute()
const router = useRouter()

const { car_id, container_id, container_number, car_number } = route.query
const isCarIdExist = () => !!car_id

onMounted(() => {
  if (!isCarIdExist()) {
    router.push({ path: '/cars' })
  }
  dispatchStore.getDispatchAction(car_id, container_id)
})

const currentDispatch = computed(() =>
  dispatchStore.dispatchs && dispatchStore.dispatchs.length > 0 ? dispatchStore.dispatchs[0] : null,
)

const checkInBtn = () => {
  const { id: dispatch_id, no: dispatch_no } = dispatchStore.dispatchs[0]
  router.push({
    path: '/entryRecord',
    query: {
      dispatch_id,
      dispatch_no,
      car_id,
      container_id,
      container_number,
      car_number,
    },
  })
}
const handleToPallet = async (dispatch) => {
  await dispatchStore.setCurrentDispatch(dispatch)
  router.push({
    path: '/pallet',
    query: {
      car_id,
      container_id,
      container_number,
      car_number,
    },
  })
}
const handleToPreCool = async (dispatch) => {
  await dispatchStore.setCurrentDispatch(dispatch)
  router.push({
    path: '/precool',
    query: {
      car_id,
      container_id,
      container_number,
      car_number,
    },
  })
}

const handleToRestaurantList = async (dispatch) => {
  await dispatchStore.setCurrentDispatch(dispatch)
  await dispatchStore.getDispatchDetailAction(dispatch.id)
  router.push({
    path: '/restaurantlist',
    query: {
      car_id,
      container_id,
      container_number,
      car_number,
    },
  })
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top fixed title="派工單">
      <template #right>
        <Button
          @click="checkInBtn"
          :disabled="currentDispatch?.status !== DispatchStatusType.NO_CHECK_IN"
          round
          size="mini"
          class="bg-[#eb4e55] text-white px-3 py-1"
          >報到</Button
        >
      </template>
    </NavBar>

    <!-- 插件工作塊 -->
    <!-- <div class="py-2 w-full h-40"> -->
    <!-- <p class="text-center text-success m-0">插件工作</p> -->
    <!-- </div> -->

    <!-- 本日工作塊 -->
    <div class="px-[26px]">
      <p class="text-center text-primary">本日工作</p>
      <ContainerOnloadCard
        v-for="dispatch in dispatchStore.dispatchs"
        :key="dispatch.id"
        v-bind="dispatch"
        class="mb-6"
      >
        <div class="flex justify-around w-100 bg-white p-4">
          <Button
            size="mini"
            round
            plain
            type="primary"
            :icon="showPreCoolChecked(dispatch.status) ? 'checked' : ''"
            icon-position="right"
            @click="handleToPreCool(dispatch)"
            class="border-2 border-solid border-primary text-primary px-3 py-1"
          >
            預冷溫度
          </Button>
          <Button
            size="mini"
            round
            @click="handleToPallet(dispatch)"
            class="border-2 border-solid border-emerald-500 bg-emerald-500 text-white px-3 py-1"
          >
            容器裝車紀錄
          </Button>
          <Button
            size="mini"
            round
            class="border-2 border-solid border-neutral-500 bg-neutral-500 text-white px-3 py-1"
            @click="handleToRestaurantList(dispatch)"
          >
            餐廳明細
          </Button>
        </div>
      </ContainerOnloadCard>
    </div>
  </div>
</template>
