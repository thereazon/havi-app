<script setup>
import { v4 as uuidv4 } from 'uuid'
import { ref, onUnmounted, onMounted, reactive } from 'vue'
import { Icon, NavBar, Collapse, CollapseItem } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useRestaurant from '@/views/Restaurant/store'
import useDispatch from '@/views/Dispatch/store'
import dayjs from 'dayjs'
import ExceptionReasonTable from '@/components/ExceptionReasonTable.vue'
const router = useRouter()
const route = useRoute()
const dispatchStore = useDispatch()
const restaurantStore = useRestaurant()
const { currentException } = restaurantStore
const { currentRestaurant } = dispatchStore

const exRegistration = ref([])
const readyToPush = ref(false)
const activeNames = ref(['1'])

const initReason = () => ({
  id: uuidv4(),
  selectReason: null,
  unit: null,
  set_qty: null,
  pcs_qty: null,
  note: '',
  file: null,
})

const info = reactive({
  name: '',
  qty: 0,
  total_qty: 0,
  batch_no: '',
})

onMounted(() => {
  if (!currentRestaurant || !currentException.deliveryNo || !currentException.item) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  } else {
    restaurantStore.getExceptionAction(currentException.uid, '1').then((res) => {
      info.total_qty = res.total_qty
      info.batch_no = res.batch_no
      info.qty = res.qty
      info.name = res.name
      exRegistration.value = res.data.map((r) => ({
        ...r,
        selectReason: r.abnormal_id,
        unit: r.qty,
      }))
    })
  }
})

onUnmounted(() => {
  restaurantStore.resetCurrentException()
})

const addReason = () => {
  exRegistration.value = [...exRegistration.value, initReason()]
}

const deleteReason = (id) => () => (exRegistration.value = exRegistration.value.filter((v) => v.id !== id))

const confirm = () => {
  readyToPush.value = true
  exRegistration.value.forEach((v) => console.log(v))
  restaurantStore.postExceptionAction(currentException.uid, exRegistration.value, 1)
}

const onClickLeft = () => {
  router.back()
}

const onClickRight = () => {}
</script>

<template>
  <div class="h-full min-h-screen bg-[#F2F8FB]">
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="異常登記">
      ></NavBar
    >
    <div class="flex flex-col items-stretch px-[40px] pt-10 h-full">
      <div class="w-full rounded-xl shadow-md bg-white mt-8 mb-5">
        <div class="px-6 pt-3 pb-4">
          <div class="h-6 mb-2 flex justify-between items-center">
            <div class="flex items-center text-[13px] text-[#044d80]">
              <span class="mr-[10px]">單號</span>
              <span>{{ currentRestaurant?.trip_no }}</span>
            </div>
          </div>
          <div class="text-gray text-[13px] flex items-center">
            <div class="flex items-center mr-4">
              <img src="/dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
              <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">
                {{ dayjs(currentRestaurant?.departure_time).format('MM/DD/YYYY') }}
              </div>
            </div>
            <div class="flex items-center">
              <img src="/dispatching_clock.png" class="w-4 h-4 mr-2" alt="" />
              <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">
                {{ dayjs(currentRestaurant?.departure_time).format('HH:mm') }}
              </div>
            </div>
          </div>
        </div>
        <Collapse v-if="currentException.item" v-model="activeNames">
          <CollapseItem name="1">
            <template #title>
              <div class="flex items-center">
                <div class="w-[10%]"></div>
                <div class="w-[50%] flex flex-col leading-snug">
                  <span class="text-[#044d80] text-[0.875rem] font-bold truncate">
                    {{ currentException.item_desc }}
                  </span>
                  <span class="text-gray text-[0.75rem] truncate"> {{ info.name }} </span>
                </div>
                <div class="w-[40%] flex items-center text-[0.875rem] font-bold text-[#044d80]">
                  <div class="min-w-[40%] flex justify-between items-center">
                    <span> {{ info.total_qty }} </span> &nbsp;
                  </div>
                </div>
              </div>
            </template>
            <li class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray">
              <div class="w-[50%] ml-[10%] leading-snug">
                <div class="text-[0.875rem] truncate">{{ currentException.item.exp }}</div>
                <div class="text-[0.875rem] truncate">#{{ currentException.item.batch_no }}</div>
              </div>
              <div class="w-[40%] flex justify-between items-center text-[0.875rem]">
                <div class="min-w-[40%] flex justify-between items-center">
                  <span> {{ info.qty }} </span>
                </div>
              </div>
            </li>
          </CollapseItem>
        </Collapse>
      </div>
      <ExceptionReasonTable
        class="my-5"
        v-for="(reason, index) in exRegistration"
        :deleteReason="deleteReason(reason.id)"
        v-model:reason="exRegistration[index]"
        :key="reason.id"
      ></ExceptionReasonTable>
      <div class="m-auto">
        <button class="bg-white border-0 rounded-full h-[33px] w-[33px] mb-5 shadow-lg" @click="addReason">
          <Icon name="plus"></Icon>
        </button>
      </div>
      <div class="m-auto mb-5">
        <button class="bg-success border-0 text-white rounded-full px-[128px] py-[10px]" @click="confirm">完成</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.van-cell__right-icon) {
  display: none;
}
:deep(.van-collapse-item > .van-cell) {
  border-radius: 0 0 0.75rem 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
:deep(.van-collapse-item:last-child) {
  border-bottom: 0;
}
:deep(.van-collapse-item__content) {
  padding: 10px 0;
  background: #f2f2f2;
}
.detail-list {
  border-bottom: 1px solid #707070;
}
.detail-list:last-child {
  border-bottom: 0;
}
</style>
