<script setup>
import { computed } from 'vue'
import { Dialog } from 'vant'

const VanDialog = Dialog.Component

const emit = defineEmits(['update:show'])
const props = defineProps({
  show: Boolean,
  error: Boolean,
})
const isShow = computed({
  get: () => props.show,
})
</script>

<template>
  <van-dialog v-model:show="isShow" class="rounded w-3/4" teleport="body">
    <template v-slot:title>
      <div class="text-center text-white p-[16px]" :class="[error ? 'bg-red-400' : 'bg-blue-400']">
        <van-icon class="text-[2.5rem]" :name="[error ? 'close' : 'info-o']" />
      </div>
    </template>

    <div class="text-[1rem] font-bold text-center bg-white p-[8px]">
      <slot name="titleContent">標題</slot>
    </div>

    <div class="text-left mb-[18px] bg-white p-[8px]">
      <slot name="content">說明文字</slot>
    </div>

    <template v-slot:footer>
      <div class="bg-white flex p-[8px]">
        <button
          class="flex-auto bg-transparent text-[{theme}]-400 py-2 px-4 border rounded-md border-[{theme}]-400"
          :class="[error ? 'text-red-400 border-red-400' : 'text-blue-400 border-blue-400']"
          @click="emit('update:show', false)"
        >
          OK
        </button>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped>
:deep(.van-dialog) {
  padding-top: 44px;
  padding-bottom: 45px;
}

/* 需要把var(--van-dialog-header-padding-top)改成0 */
:deep(.van-dialog__header) {
  padding-top: 0;
}
</style>

<!-- 使用 -->
<!-- 
  ### script ########################################################################
  import { ref } from 'vue'
  import AlertModal from '@/components/AlertModal.vue'

  const isAlertModal = ref(false)
  const isErrorDialog = ref(false)
  const showAlertModal = () => {
    isAlertModal.value = true
  }
  const showErrorDialog = () => {
    isErrorDialog.value = true
  }

  ### template ######################################################################
  <Button @click="showAlertModal"> 提示</Button>
  <Button @click="showErrorDialog"> 錯誤</Button>

  # 若沒傳error，dialog是藍色
  <AlertModal v-model:show="isAlertModal">
    <template v-slot:titleContent>
      <div>提示(自訂標題)</div>
    </template>
    <template v-slot:content>
      <div>請先完成報到，才能進行預冷溫度(自訂內容)</div>
    </template>
  </AlertModal>

  # 若有傳error，dialog是紅色
  <AlertModal v-model:show="isErrorDialog" error="true">
    <template v-slot:titleContent>
      <div>錯誤(自訂標題)</div>
    </template>
    <template v-slot:content>
      <div>沒有派工單須配送(自訂內容)</div>
    </template>
  </AlertModal>
 -->
