<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { Icon, NavBar, Collapse, CollapseItem, Checkbox } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useRestaurant from '@/views/Restaurant/store'
import ExceptionReasonTable from '@/components/ExceptionReasonTable.vue'
const router = useRouter()
const route = useRoute()
const restaurantStore = useRestaurant()
const { currentException } = restaurantStore

const exRegistration = ref([])
const imageArr = ref([])

const exRegistrationLength = ref(1)
const readyToPush = ref(false)
const activeNames = ref(['1'])

onMounted(() => {
  if (!currentException.deliveryNo || !currentException.item) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  }
})

onUnmounted(() => {
  restaurantStore.resetCurrentException()
})

const updateData = (item) => {
  exRegistration.value.push(item.data)
  imageArr.value.push(item.img)
}

const addReason = () => {
  exRegistrationLength.value++
}

const deleteReason = () => {
  if (exRegistrationLength.value == 1) return
  exRegistrationLength.value--
}

const confirm = () => {
  readyToPush.value = true
  console.log(exRegistration.value, imageArr.value)
}

const onClickLeft = () => {
  router.back()
}

const onClickRight = () => {}
</script>

<template>
  <div>
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="異常登記">
      <template #right> <Icon name="wap-nav" size="18" /> </template
    ></NavBar>
    <div class="flex flex-col items-stretch px-[40px] pt-10 h-full bg-primary bg-opacity-[0.05]">
      <div class="w-full rounded-xl shadow-md bg-white mt-8 mb-5">
        <div class="px-6 pt-3 pb-4">
          <div class="h-6 mb-2 flex justify-between items-center">
            <div class="flex items-center text-[13px] text-[#044d80]">
              <span class="mr-[10px]">單號</span>
              <span>{{ currentException.deliveryNo }}</span>
            </div>
          </div>
          <div class="text-gray text-[13px] flex justify-between items-center">
            <div class="flex items-center">
              <img src="/dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
              <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">
                {{ currentException.deliveryDate }}
              </div>
            </div>
            <div class="flex items-center">
              <img src="/dispatching_clock.png" class="w-4 h-4 mr-2" alt="" />
              <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">
                <!-- 20:20 -->
              </div>
            </div>
          </div>
        </div>
        <Collapse v-if="currentException.item" v-model="activeNames">
          <CollapseItem name="1">
            <template #title>
              <div class="flex items-center">
                <div class="w-[10%]">
                  <Checkbox disabled></Checkbox>
                </div>
                <div class="w-[50%] flex flex-col leading-snug">
                  <span class="text-[#044d80] text-[0.875rem] font-bold truncate">
                    {{ currentException.item_desc }}
                  </span>
                  <span class="text-gray text-[0.75rem] truncate"> {{ currentException.wrin }} </span>
                </div>
                <div class="w-[40%] flex items-center text-[0.875rem] font-bold text-[#044d80]">
                  <div class="min-w-[40%] flex justify-between items-center">
                    <span> {{ currentException.qty }} </span> &nbsp;
                    <span> {{ currentException.uom }} </span>
                  </div>
                </div>
              </div>
            </template>
            <li class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray">
              <div class="w-[50%] ml-[10%] leading-snug">
                <span class="text-[0.875rem] truncate"> {{ currentException.item.batch_no }} </span>
              </div>
              <div class="w-[40%] flex justify-between items-center text-[0.875rem]">
                <div class="min-w-[40%] flex justify-between items-center">
                  <span> {{ currentException.item.qty }} </span> &nbsp;
                  <span> {{ currentException.item.uom }} </span>
                </div>
              </div>
            </li>
          </CollapseItem>
        </Collapse>
      </div>
      <ExceptionReasonTable
        class="my-5"
        v-for="i in exRegistrationLength"
        :readyToPush="readyToPush"
        @update:data="updateData"
        @delete:reason="deleteReason"
        :key="i"
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
