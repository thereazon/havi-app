<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { NavBar, Loading } from 'vant'
import useContainers from '@/views/Containers/store'
import DispatchListTable from '@/components/DispatchListTable.vue'
import router from '@/router'
import { StatusType } from '@/views/Containers/helper'

const route = useRoute()
const { car_id, container_id } = route.query
const containersStore = useContainers()
const selectOptions = computed(() => containersStore.containers.map((container) => container.no))
const currentContainer = ref({})

onMounted(async () => {
  await containersStore.getContainersAction(car_id, container_id)
  currentContainer.value = containersStore.containers[0]
})

const handleOnChange = (e) => {
  const currentDispatchNo = e.target.value
  currentContainer.value = containersStore.findContainerGetter(currentDispatchNo)
}

const onClickLeft = () => {
  router.back()
}
</script>
<template>
  <div class="bg-[#F2F8FB] h-screen">
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" title="容器對點單數量" />
    <div class="flex flex-col justify-center items-center bg-[#F2F8FB]">
      <div class="mt-28">
        <label for="dispatch-no" class="block mb-2 text-[13px] font-medium text-gray-900"
          >選擇派工單號 <span class="text-[#eb6158]">(只顯示近兩天已完單據資料)</span></label
        >
        <select
          name=""
          id="dispatch-no"
          class="bg-[#fffcf6] border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-4"
          @change="handleOnChange"
        >
          <option v-for="dispatchNo in selectOptions" :value="dispatchNo" :key="dispatchNo">{{ dispatchNo }}</option>
        </select>
      </div>
      <Loading v-if="containersStore.isLoading === true" class="mt-10" />
      <DispatchListTable
        v-if="containersStore.isLoading === false && containersStore.status === StatusType.SUCCESS"
        :dispatchNo="currentContainer?.no"
        :dispatchListData="currentContainer?.data"
        :dispatchDate="currentContainer?.date"
      />
      <div
        v-if="containersStore.status === StatusType.FAIL || containersStore.status === StatusType.CAR_ID_MISSING"
        class="text-[#eb5e55] mt-10"
      >
        {{ containersStore.status === StatusType.CAR_ID_MISSING ? '車號遺失' : '' }}
        {{ containersStore.status === StatusType.FAIL ? containersStore.message : '' }}
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.van-nav-bar__content) {
  height: 60px;
}
:deep(.van-icon-arrow-left) {
  color: gray;
}
:deep(.van-nav-bar__title) {
  font-size: 12px;
}
</style>
