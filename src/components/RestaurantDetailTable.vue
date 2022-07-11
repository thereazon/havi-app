<script setup>
import { Divider, Button } from 'vant'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()

defineProps({
  title: String,
  date: String,
  time: String,
  kg: String,
  dispatch: Object,
  restaurant: Object,
})

const goto = (path) => {
  router.push({
    path: path,
  })
}
</script>

<template>
  <div class="shadow-md rounded-b-[20px]">
    <div class="text-white bg-primary rounded-t-[20px] py-[12px] px-[20px]">{{ title }}</div>
    <div class="my-[15px] px-[20px] pb-[20px]">
      <div class="flex items-center justify-between text-gray">
        <img class="w-[15px]" src="dispatching_calendar.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ dayjs(dispatch?.departure_time).format('MM/DD/YYYY') }}</div>
        <img class="w-[15px]" src="dispatching_clock.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ dayjs(dispatch?.departure_time).format('HH:mm') }}</div>
        <img class="w-[15px]" src="dispatching_box.png" alt="icon" />
        <div class="bg-[#f2f2f2] px-3 py-1 rounded">{{ dispatch?.cube }}</div>
      </div>
      <Divider dashed="true" class="border-primary" />
      <div class="flex items-center text-primary font-bold gap-2">
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-1/5 text-center rounded-l-[10px]">
          {{ restaurant?.bu }}
        </div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-2/5 text-center">{{ restaurant?.number }}</div>
        <div class="bg-[#f2f2f2] px-3 py-[5px] basis-2/5 rounded-r-[10px] text-center">{{ restaurant?.name }}</div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[10px]">
        <div class="basis-1/12"><img class="w-[30px]" src="dispatching_map.png" alt="icon" /></div>
        <div class="flex justify-around bg-[#f2f2f2] px-3 py-[7px] rounded basis-11/12 text-center rounded-l-[10px]">
          <div>{{ restaurant?.address }}</div>
          <a class="font-bold">...</a>
        </div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[10px]">
        <div class="basis-1/12"><img class="w-[30px]" src="dispatching_phone.png" alt="icon" /></div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-11/12 text-center rounded-l-[10px]">
          {{ restaurant?.tel }}
        </div>
      </div>

      <div class="flex justify-center mt-[10px] font-bold">
        <Button class="bg-primary text-white rounded-full px-[43px]"> 作業明細</Button>
      </div>
    </div>
  </div>
</template>
