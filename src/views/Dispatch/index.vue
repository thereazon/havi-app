<script setup>
import { Button, NavBar } from 'vant'
import { onMounted, computed } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { useRoute, useRouter } from 'vue-router'
import { showPreCoolChecked, DispatchStatusType } from '@/views/Dispatch/helper'
import { useAlertModal } from '@/components/store/AlertModalStore'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'
import PluginCarousel from '@/components/PluginCarousel.vue'

const modal = useAlertModal()
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
  dispatchStore.getPluginAction(car_id, container_id)
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
  if (dispatch.status === DispatchStatusType.NO_CHECK_IN) {
    modal.open({
      type: 'hint',
      title: '提醒',
      content: '請先完成報到，才能進行預冷溫度',
    })
  } else if (showPreCoolChecked(dispatch.status)) {
    modal.open({
      type: 'hint',
      title: '提醒',
      content: '已經完成預冷溫度，請開始下一項作業',
    })
  } else {
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
}

const handleToRestaurantList = async (dispatch) => {
  await dispatchStore.setCurrentDispatch(dispatch)
  await dispatchStore.getDispatchDetailAction(dispatch.id, () =>
    router.push({
      path: '/restaurantlist',
      query: {
        car_id,
        container_id,
        container_number,
        car_number,
      },
    }),
  )
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
    <div class="py-2 w-full">
      <PluginCarousel v-if="dispatchStore.plugin" />
    </div>

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
            size="small"
            round
            plain
            type="primary"
            :icon="showPreCoolChecked(dispatch.status) ? 'checked' : ''"
            icon-position="right"
            @click="handleToPreCool(dispatch)"
            class="text-[16px] border-2 border-solid border-primary text-primary px-3 py-1"
          >
            預冷溫度
          </Button>
          <Button
            size="small"
            round
            :disabled="!showPreCoolChecked(dispatch.status)"
            @click="handleToPallet(dispatch)"
            class="text-[16px] border-2 border-solid border-emerald-500 bg-emerald-500 text-white px-3 py-1"
          >
            容器裝車紀錄
          </Button>
          <Button
            size="small"
            round
            :disabled="!showPreCoolChecked(dispatch.status) && !dispatch.is_loading"
            class="border-2 text-[16px] border-solid border-primary bg-primary text-white px-3 py-1"
            @click="handleToRestaurantList(dispatch)"
          >
            餐廳明細
          </Button>
        </div>
      </ContainerOnloadCard>
    </div>
  </div>
</template>
