<script setup>
import { Button, ActionSheet } from 'vant'
import { reactive, computed } from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'

const emit = defineEmits(['update:isShow', 'confirm'])
const props = defineProps({
  title: String,
  isShow: Boolean,
})

const temperature = reactive({
  sign: '+', // + (plus): 正數, - (minus): 負數
  integer: 0,
  decimal: 0,
})
const signOptions = ['+', '-']
const integerOptions = Array.from({ length: 100 }, (_, index) => index)
const decimalOptions = Array.from({ length: 10 }, (_, index) => index)

const isShow = computed({
  get: () => props.isShow,
  set: (val) => emit('update:isShow', val),
})
</script>
<template>
  <ActionSheet v-model:show="isShow" :title="props.title">
    <div class="h-[40%] py-3 px-4">
      <div class="scroll-wrap flex">
        <VueScrollPicker :options="signOptions" v-model="temperature.sign" />
        <VueScrollPicker :options="integerOptions" v-model="temperature.integer" />
        <VueScrollPicker :options="decimalOptions" v-model="temperature.decimal" />
      </div>
      <Button class="bg-success mt-8" round block type="success" @click="$emit('confirm', temperature)">確認</Button>
    </div>
  </ActionSheet>
</template>

<style scoped lang="scss">
.scroll-wrap {
  font-size: 26px;
}
</style>
