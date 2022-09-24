<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String,
  handleShowModal: Function,
  handleClear: Function,
})
</script>

<template>
  <div class="w-full">
    <div class="mt-8 mb-[5px] text-[#959595] flex items-center justify-center relative">
      <div class="text-center text-[0.8125rem] font-bold">{{ props.title }}</div>
      <div
        class="w-[16%] absolute top-0 right-0 text-center text-[#eb5e55] text-[0.75rem] border border-solid border-[#eb5e55] rounded-full"
        @click="handleClear()"
      >
        清除
      </div>
    </div>

    <div class="divide w-full h-28 border-1 border-solid border-transparent" :onClick="handleShowModal"></div>
  </div>
</template>

<style scoped>
.divide {
  background: linear-gradient(#fffcf6, #fffcf6) padding-box,
    repeating-linear-gradient(-45deg, #707070 0, #707070 0.6rem, #fffcf6 0, #fffcf6 1rem);
}
</style>
