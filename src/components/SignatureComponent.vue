<script setup>
import { onMounted, reactive, ref, defineProps } from 'vue'

const moving = ref(false)
const ctx = ref(null)
const point = reactive({
  x: 0,
  y: 0,
})

const props = defineProps({
  title: String,
})
onMounted(() => {
  ctx.value = document.getElementById('canvas').getContext('2d')
  ctx.value.strokeStyle = '#000'
})
const touchStart = (e) => {
  let elem = document.querySelector('canvas')
  let rect = elem.getBoundingClientRect()
  let x = e.touches[0].clientX - rect.left
  let y = e.touches[0].clientY - rect.top
  point.x = x
  point.y = y
  ctx.value.beginPath()
  ctx.value.lineWidth = 1
  ctx.value.shadowBlur = 1
  moving.value = true
}
const touchMove = (e) => {
  if (moving.value) {
    let elem = document.querySelector('canvas')
    let rect = elem.getBoundingClientRect()
    let x = e.touches[0].clientX - rect.left
    let y = e.touches[0].clientY - rect.top
    ctx.value.moveTo(point.x, point.y)
    ctx.value.lineTo(x, y)
    ctx.value.stroke()
    point.x = x
    point.y = y
  }
}
const touchEnd = () => {
  if (moving.value) {
    ctx.value.closePath()
    moving.value = false
  }
}
const clearcanvas = () => {
  let canvas = document.getElementById('canvas')
  ctx.value.setTransform(1, 0, 0, 1, 0, 0)
  ctx.value.clearRect(0, 0, canvas.width, canvas.height)
}
</script>

<template>
  <div class="w-full">
    <div class="mt-8 mb-[5px] text-[#959595] flex items-center justify-center relative">
      <div class="text-center text-[0.8125rem] font-bold">{{ props.title }}</div>
      <div
        class="w-[16%] absolute top-0 right-0 text-center text-[#eb5e55] text-[0.75rem] border border-solid border-[#eb5e55] rounded-full"
        @click="clearcanvas()"
      >
        清除
      </div>
    </div>

    <div class="divide w-full h-28 border-1 border-solid border-transparent" @touchmove.prevent>
      <canvas
        id="canvas"
        class="w-full h-full"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      ></canvas>
    </div>
  </div>
</template>

<style scoped>
.divide {
  background: linear-gradient(#fffcf6, #fffcf6) padding-box,
    repeating-linear-gradient(-45deg, #707070 0, #707070 0.6rem, #fffcf6 0, #fffcf6 1rem);
}
</style>
