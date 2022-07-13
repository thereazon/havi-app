<script setup>
import { ref, computed } from 'vue'
import { Dialog, PasswordInput, NumberKeyboard } from 'vant'
import ConfirmDialog from './ConfirmDialog.vue'

const VanDialog = Dialog.Component
const props = defineProps({
  isShowDialog: Boolean,
  isCloseOnClickOverlay: Boolean,
})
const emit = defineEmits(['update:isShowDialog'])

const securityCode = ref('')
const showKeyboard = ref(false)
const isConfirmDialog = ref(false)
const isShow = computed({
  get: () => props.isShowDialog,
  set: (val) => {
    emit('update:isShowDialog', val)
  },
})

const closeDialog = () => {
  emit('update:isShowDialog', false)
}
const confirm = () => {
  closeDialog()
  isConfirmDialog.value = true
}
const submitSecurityCode = () => {
  isConfirmDialog.value = false
}
</script>

<template>
  <div>
    <van-dialog
      v-model:show="isShow"
      :showConfirmButton="false"
      :closeOnClickOverlay="isCloseOnClickOverlay"
      @close="securityCode = ''"
    >
      <div class="pt-[27px] pb-[45px]">
        <div class="text-gray text-[1.25rem] font-bold text-center mb-[36px]">請輸入今日安全碼</div>
        <div class="px-[25%] mb-[46px]">
          <PasswordInput
            :value="securityCode"
            length="3"
            gutter="5"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
        </div>
        <div class="px-[10%] flex justify-between items-center font-bold text-white text-[1rem]">
          <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="closeDialog()">取消</button>
          <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="confirm()">確認</button>
        </div>
      </div>
    </van-dialog>

    <NumberKeyboard
      v-model="securityCode"
      maxlength="3"
      z-index="2222"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />

    <ConfirmDialog v-model:isShowDialog="isConfirmDialog" :isCloseOnClickOverlay="true">
      <template v-slot:title>
        <div>確認送出</div>
      </template>
      <template v-slot:footer>
        <div class="px-[10%] mt-[42px] flex justify-between items-center font-bold text-white text-[1rem]">
          <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">取消</button>
          <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="submitSecurityCode()">
            確認
          </button>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped>
:deep(.van-password-input) {
  margin: 0;
}
:deep(.van-password-input__security li) {
  border-radius: 10px;
  border: solid 2px #707070;
}
</style>
