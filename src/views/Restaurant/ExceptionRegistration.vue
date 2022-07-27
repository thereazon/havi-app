<script setup>
import { ref } from 'vue'
import { Icon, NavBar } from 'vant'
import { useRouter } from 'vue-router'
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
  <div class="bg-primary bg-opacity-[0.05] h-full">
    <NavBar safe-area-inset-top fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="異常登記">
      <template #right> <Icon name="wap-nav" size="18" /> </template
    ></NavBar>
    <div class="flex flex-col items-stretch px-[40px] pt-10">
      <!-- todo: 插入單號component -->
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
