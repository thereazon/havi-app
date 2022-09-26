<script setup>
import { onMounted, ref } from 'vue'
import { Button, NavBar } from 'vant'
import useDispatchInfo from '@/views/Dispatch/store'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useAlertModal } from '@/components/store/AlertModalStore'
import { isCanvasEmpty, getCanvasToImage } from '@/utils/canvas'
const dispatchStore = useDispatchInfo()
const { currentPlugin } = dispatchStore

const modal = useAlertModal()
const route = useRoute()
const router = useRouter()
const isConfirmDialog = ref(false)

let driverEsign = ref(null)
let clientEsign = ref(null)

const handleResetDriverSign = () => {
  driverEsign.value.reset()
}
const handleResetClientSign = () => {
  clientEsign.value.reset()
}

onMounted(() => {
  if (!dispatchStore.currentPlugin) {
    router.push({
      path: `/dispatch`,
      query: {
        ...route.query,
      },
    })
  }
})

const confirmUpdate = async () => {
  const clientSign = await clientEsign.value.generate()
  const driverSign = await driverEsign.value.generate()
  if (!driverSign) {
    modal.open({
      type: 'hint',
      title: '提醒',
      content: '司機簽名為必填欄位',
    })
  } else {
    const data = {
      customer_photo: clientSign,
      driver_photo: driverSign,
    }
    dispatchStore.postPluginFinishAction(currentPlugin.id, data, () =>
      router.push({
        path: `/dispatch`,
        query: {
          ...route.query,
        },
      }),
    )
  }
}

const onClickLeft = () => {
  router.push({
    path: `/dispatch`,
    query: {
      ...route.query,
    },
  })
}

const openDialog = () => {
  isConfirmDialog.value = true
}
</script>

<template>
  <div class="bg-[#F2F8FB] min-h-screen h-full pt-[46px] pb-[78px]">
    <ConfirmDialog v-model:isShowDialog="isConfirmDialog" :isCloseOnClickOverlay="true">
      <template v-slot:title>
        <div>請確認是否完成？</div>
      </template>
      <template v-slot:footer>
        <div class="px-[10%] mt-[42px] flex justify-between items-center font-bold text-white text-[1rem]">
          <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">取消</button>
          <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="confirmUpdate">確認</button>
        </div>
      </template>
    </ConfirmDialog>
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="插件工作" />
    <div class="py-2 px-7 flex justify-center flex-col" v-if="currentPlugin">
      <div class="py-5 border-solid border-success border-2 rounded-2xl mx-1 bg-white">
        <div class="bottom-dashed py-2 px-4">
          <div class="text-success text-[13px]">
            <label class="mr-2">單號</label>
            <span>{{ currentPlugin.no }}</span>
          </div>
          <div class="flex mt-3">
            <div class="flex items-center space-x-1">
              <img class="w-[18px]" src="/dispatching_calendar.png" alt="calendar" />
              <div class="w-[80px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ currentPlugin.date }}</div>
            </div>
            <div class="flex items-center space-x-1">
              <img class="w-[18px]" src="/dispatching_clock.png" alt="clock" />
              <div class="w-[43px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ currentPlugin.time }}</div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between space-x-1 px-4 mt-3">
          <img class="w-[28px]" src="/dispatching_map_2.png" alt="map" />
          <div class="w-[233px] text-[12px] font-bold bg-[#f2f2f2] py-1 px-2">
            {{ currentPlugin.address }}
          </div>
        </div>
        <div class="flex items-center justify-between space-x-1 px-4 mt-3">
          <img class="w-[28px]" src="/dispatching_phone_2.png" alt="map" />
          <div class="w-[233px] text-[12px] font-bold bg-[#f2f2f2] py-1 px-2">
            {{ currentPlugin.tel }}
          </div>
        </div>
      </div>
      <div class="bg-white border-solid p-2 mt-3 border-success border-2 rounded-2xl mx-1">
        <div class="text-success text-center">工作說明</div>
        {{ currentPlugin.note }}
      </div>

      <div class="w-full">
        <div class="mt-8 mb-[5px] text-[#959595] flex items-center justify-between relative">
          <div class="text-center text-[0.8125rem] font-bold invisible">司機簽名</div>
          <div class="text-center text-[0.8125rem] font-bold">客戶簽名</div>
          <div
            class="w-[16%] text-center text-[#eb5e55] text-[0.75rem] border border-solid border-[#eb5e55] rounded-full"
            :onClick="handleResetClientSign"
          >
            清除
          </div>
        </div>
        <div class="divide w-full h-[280px] border-1 border-solid border-transparent">
          <vueEsign ref="esign" height="600" :lineWidth="3" :lineColor="lineColor" />
        </div>
      </div>
      <div class="w-full">
        <div class="mt-8 mb-[5px] text-[#959595] flex items-center justify-between relative">
          <div class="text-center text-[0.8125rem] font-bold invisible">司機簽名</div>
          <div class="text-center text-[0.8125rem] font-bold">司機簽名</div>
          <div
            class="w-[16%] text-center text-[#eb5e55] text-[0.75rem] border border-solid border-[#eb5e55] rounded-full"
            :onClick="handleResetDriverSign"
          >
            清除
          </div>
        </div>

        <div class="divide w-full h-[280px] border-1 border-solid border-transparent">
          <vueEsign ref="driverSign" height="600" :lineWidth="3" :lineColor="lineColor" />
        </div>
      </div>
      <Button
        v-if="currentPlugin.status === 'ARRIVAL'"
        :onClick="openDialog"
        loading-type="spinner"
        class="mt-[70px] bg-success text-white"
        round
        block
      >
        完成</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-dashed {
  border-bottom: 2px dashed #6dbe5b;
}
</style>
