<script setup>
import { ref, reactive } from 'vue'
import { Icon, NavBar } from 'vant'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import ExceptionReasonTable from '@/components/ExceptionReasonTable.vue'

const router = useRouter()

const exRegistration = ref([])
const imageArr = ref([])

const exRegistrationLength = ref(1)
const readyToPush = ref(false)

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
      <!-- todo: 插入單號component -->
      <div class="w-full rounded-xl shadow-md bg-white mt-8 mb-5">
        <div class="px-6 pt-3 pb-4">
          <div class="h-6 mb-2 flex justify-between items-center">
            <div class="flex items-center text-[13px] text-[#044d80]">
              <span class="mr-[10px]">單號</span>
              <span>XXXXXX</span>
            </div>
          </div>
          <div class="text-gray text-[13px] flex justify-between items-center">
            <div class="flex items-center">
              <img src="/dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
              <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">11/23/2020</div>
            </div>
            <div class="flex items-center">
              <img src="/dispatching_clock.png" class="w-4 h-4 mr-2" alt="" />
              <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">20:20</div>
            </div>
          </div>
        </div>
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
