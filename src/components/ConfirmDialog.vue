<script setup>
import { computed } from 'vue'
import { Dialog } from 'vant'

const VanDialog = Dialog.Component
const props = defineProps({
  title: String,
  isShowDialog: Boolean,
  isCloseOnClickOverlay: Boolean
})
const emit = defineEmits(['update:isShowDialog'])
const isShow = computed({
  get: () => props.isShowDialog,
  set: (val) => {
    emit('update:isShowDialog', val)
  }
})
</script>

<template>
  <div>
    <van-dialog
      v-model:show="isShow"
      :showConfirmButton="false"
      :closeOnClickOverlay="props.isCloseOnClickOverlay"
    >
      <template v-slot:title>
        <div class="text-gray text-[1.25rem] font-bold text-center">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>
      </template>

      <div>
        <slot></slot>
      </div>

      <template v-slot:footer>
        <slot name="footer">
        </slot>
      </template>
    </van-dialog>
  </div>
</template>

<style scoped>
:deep(.van-dialog) {
  padding-top: 44px;
  padding-bottom: 45px;
}
:deep(.van-dialog__header) {
  padding: 0;
}
</style>