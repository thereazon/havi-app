<script setup>
import { Dialog } from 'vant'
import { storeToRefs } from 'pinia'
import { useAlertModal } from '@/components/store/AlertModalStore'

const VanDialog = Dialog.Component

const store = useAlertModal()
const { title, content, isShow, modalStyle } = storeToRefs(store)
</script>

<template>
  <div>
    <van-dialog v-model:show="isShow" class="rounded-md w-3/4" :showConfirmButton="false">
      <div class="text-center text-white p-[24px]" :class="modalStyle['header']">
        <van-icon class="text-[2.5rem]" :name="modalStyle['iconName']" />
      </div>

      <div class="text-[1rem] font-bold text-center bg-white py-[8px] px-[16px]">
        {{ title }}
      </div>

      <div class="text-left mb-[18px] bg-white py-[8px] px-[16px]">
        {{ content }}
      </div>

      <div class="bg-white flex py-[8px] px-[16px]">
        <button
          class="flex-auto bg-transparent text-[{theme}]-400 py-2 px-4 border rounded-md border-[{theme}]-400"
          :class="modalStyle['button']"
          @click="store.close"
        >
          OK
        </button>
      </div>
    </van-dialog>
  </div>
</template>

<style scoped>
:deep(.van-dialog__header) {
  padding-top: 0;
}
</style>

<!-- 使用 -->
<!-- 
<script setup>
import { useAlertModal } from '@/components/store/AlertModalStore'
const modal = useAlertModal()
</script setup>

<template>
  <Button 
    @click="
      modal.open({
        type: 'hint', //required
        title: '提示',
        content: '這是冷藏品的溫度',
        callback: () => {
          console.log('this is a callback')
        }
      })
    "
  > 
    提示
  </Button>
</template>
 -->
