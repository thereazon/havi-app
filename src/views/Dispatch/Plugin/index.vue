<script setup>
import { onMounted, ref } from 'vue'
import { Button, NavBar, Popup } from 'vant'
import useDispatchInfo from '@/views/Dispatch/store'
import SignBox from '@/components/SignBox.vue'
import SignatureComponent2 from '@/components/SignatureComponent2.vue'
import { useRoute, useRouter } from 'vue-router'
const dispatchStore = useDispatchInfo()
const { currentPlugin } = dispatchStore

const route = useRoute()
const router = useRouter()

const clientShow = ref(false)
const driverShow = ref(false)

const handleShowClientSign = () => {
  clientShow.value = true
}

const handleShowDriverSign = () => {
  driverShow.value = true
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

const onClickLeft = () => {
  router.push({
    path: `/dispatch`,
    query: {
      ...route.query,
    },
  })
}
</script>

<template>
  <SignatureComponent2 v-if="clientShow" title="司機簽名" />
  <div v-else class="bg-[#F2F8FB] min-h-screen h-full pt-[46px] pb-[78px]">
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="插件工作" />
    <div class="py-2 px-7 flex justify-center flex-col" v-if="currentPlugin">
      <div class="border-solid border-success border-2 rounded-2xl mx-1">
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
      <div class="border-solid p-2 mt-3 border-success border-2 rounded-2xl mx-1">
        <div class="text-success text-center">工作說明</div>
        {{ currentPlugin.note }}
      </div>

      <SignBox title="客戶簽名" :handleShowModal="handleShowClientSign" />
      <SignBox title="司機簽名" :handleShowModal="handleShowDriverSign" />
      <Button loading-type="spinner" class="mt-[70px] bg-success text-white" round block> 完成</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-dashed {
  border-bottom: 2px dashed #6dbe5b;
}
</style>
