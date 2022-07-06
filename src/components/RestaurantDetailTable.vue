<script setup>
import { Divider, Button } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: String,
  date: String,
  time: String,
  kg: String,
  data: Object,
})

const goto = (path) => {
  router.push({
    path: path,
  })
}
</script>

<template>
  <div class="mx-5 shadow-md rounded-b-[20px]">
    <div class="text-white bg-primary rounded-t-[20px] py-[12px] px-[20px]">{{ title }}</div>
    <div class="my-[15px] px-[20px] pb-[20px]">
      <div class="flex items-center justify-between text-gray">
        <img class="w-[25px]" src="dispatching_calendar.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ date }}</div>
        <img class="w-[25px]" src="dispatching_clock.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ time }}</div>
        <img class="w-[25px]" src="dispatching_box.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ kg }}</div>
      </div>
      <Divider dashed="true" class="border-primary" />
      <div class="flex items-center text-primary font-bold gap-2">
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-1/5 text-center rounded-l-[10px]">{{ data.bu }}</div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-2/5 text-center">{{ data.number }}</div>
        <div class="bg-[#f2f2f2] px-3 py-[5px] basis-2/5 rounded-r-[10px] text-center">{{ data.name }}</div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[15px]">
        <div class="basis-1/12"><img class="w-[30px]" src="dispatching_map.png" alt="icon" /></div>
        <div class="flex justify-around bg-[#f2f2f2] px-3 py-[7px] rounded basis-11/12 text-center rounded-l-[10px]">
          <div>{{ data.address }}</div>
          <a class="font-bold" href="">...</a>
        </div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[15px]">
        <div class="basis-1/12"><img class="w-[30px]" src="dispatching_phone.png" alt="icon" /></div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-11/12 text-center rounded-l-[10px]">{{ data.tel }}</div>
      </div>

      <div class="flex justify-center mt-[20px] font-bold">
        <Button class="bg-primary text-white rounded-full px-[43px]" @click="goto()"> 作業明細</Button>
      </div>
    </div>
  </div>
</template>
