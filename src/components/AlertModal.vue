<script setup>
import { computed } from 'vue'
import { Dialog } from 'vant'

const VanDialog = Dialog.Component

const emit = defineEmits(['update:show'])
const props = defineProps({
  show: Boolean,
  modalType: String,
})
const isShow = computed({
  get: () => props.show,
})

const styleDefine = {
  success: {
    header: 'bg-green-400',
    button: 'text-green-400 border-green-400',
    iconName: 'passed',
  },
  hint: {
    header: 'bg-blue-400',
    button: 'text-blue-400 border-blue-400',
    iconName: 'info-o',
  },
  warning: {
    header: 'bg-orange-400',
    button: 'text-orange-400 border-orange-400',
    iconName: 'warning-o',
  },
  error: {
    header: 'bg-red-400',
    button: 'text-red-400 border-red-400',
    iconName: 'close',
  },
}
</script>

<template>
  <div>
    <van-dialog v-model:show="isShow" class="rounded-md w-3/4">
      <template v-slot:title>
        <div class="text-center text-white p-[24px]" :class="styleDefine[modalType]['header']">
          <van-icon class="text-[2.5rem]" :name="styleDefine[modalType]['iconName']" />
        </div>
      </template>

      <div class="text-[1rem] font-bold text-center bg-white py-[8px] px-[16px]">
        <slot name="titleContent">標題</slot>
      </div>

      <div class="text-left mb-[18px] bg-white py-[8px] px-[16px]">
        <slot name="content">說明文字</slot>
      </div>

      <template v-slot:footer>
        <div class="bg-white flex py-[8px] px-[16px]">
          <button
            class="flex-auto bg-transparent text-[{theme}]-400 py-2 px-4 border rounded-md border-[{theme}]-400"
            :class="styleDefine[modalType]['button']"
            @click="emit('update:show', false)"
          >
            OK
          </button>
        </div>
      </template>
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
  ### script ###
  import AlertModal from '@/components/AlertModal.vue'

  # 變數命名可自訂
  const isHintModal = ref(false)
  const showHintModal = () => {
    isHintModal.value = true
  }

  ### template ###
  <Button @click="showHintModal"> 提示</Button>

  <AlertModal v-model:show="isHintModal" modalType="hint">
    <template v-slot:titleContent>
      <div>提示(自訂標題)</div>
    </template>
    <template v-slot:content>
      <div>提示(自訂內容)</div>
    </template>
  </AlertModal>
 -->
