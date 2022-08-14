<script setup>
import { Popup, Button } from 'vant'
import { computed } from 'vue'

const props = defineProps({
  infoData: Object,
  isShow: Boolean,
})
const emit = defineEmits(['update:isShow'])

const isShow = computed({
  get: () => props.isShow,
  set: (val) => emit('update:isShow', val),
})

const back = () => {
  isShow.value = false
}
</script>

<template>
  <Popup class="rounded-[20px] w-[90%] md:w-[300px]" v-model:show="isShow">
    <div class="py-[35px] px-[28px] flex flex-col items-stretch">
      <div class="text-[16px] text-gray text-center">餐廳資訊</div>
      <div class="flex gap-1 text-primary font-bold text-[15px] my-5">
        <div class="basis-[10%] p-1 bg-[#f2f2f2] rounded-l-lg">{{ infoData.bu }}</div>
        <div class="basis-[45%] p-1 text-center bg-[#f2f2f2]">{{ infoData.number }}</div>
        <div class="basis-[45%] p-1 text-center bg-[#f2f2f2] rounded-r-lg">{{ infoData.name }}</div>
      </div>
      <div class="flex items-center mb-2">
        <img class="w-[28px] mr-1" src="/dispatching_map.png" alt="icon" />
        <div class="text-[12px] grow text-gray bg-[#f2f2f2] p-3">
          {{ infoData.address }}
        </div>
      </div>
      <div class="flex items-center mb-5">
        <img class="w-[28px] mr-1" src="/dispatching_phone.png" alt="icon" />
        <div class="text-[13px] grow text-gray w-100 p-3 bg-[#f2f2f2]">{{ infoData.tel }}</div>
      </div>
      <Button class="px-[50px] border-gray text-gray rounded-full border-2" @click="back()">返回</Button>
    </div>
  </Popup>
</template>
