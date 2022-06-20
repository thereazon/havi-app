<script setup>
import { onMounted } from 'vue'
import useTempInfo from '@/views/Temperature/store'
import { useRoute, useRouter } from 'vue-router'
const tempStore = useTempInfo()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!route.query.container_id) {
    router.push({ path: '/car' })
  } else {
    tempStore.getTemperatureAction(route.query.car_id, route.query.container_id)
  }
})
</script>

<template>
  <div class="flex flex-col items-stretch bg-primary bg-opacity-[0.05] px-[40px]">
    <div class="flex items-center mb-[60px] mt-[50px] ml-5">
      <div class="mr-[35px]">
        <img src="/login_car.png" alt="icon" />
      </div>
      <div class="text-[22px]">
        <div class="mb-[25px]">
          <div>車號</div>
          <div class="text-[#828282]">123</div>
        </div>
        <div>
          <div>櫃號</div>
          <div class="text-[#828282]">123</div>
        </div>
      </div>
    </div>

    <div>
      <div class="flex items-center bg-white p-5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.16)] mb-3">
        <div>
          <img class="w-[40px] h-[40px] mr-5" src="/temperature_freezer_icon1.png" alt="icon" />
        </div>
        <div class="w-full">
          <div class="text-primary font-bold mb-2">冷凍品溫</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-[#f3f3f3] text-center rounded py-1">{{ tempStore.temperature?.c.frozen }}</div>
            <div class="bg-[#f3f3f3] text-center rounded py-1">{{ tempStore.temperature?.f.frozen }}</div>
          </div>
        </div>
      </div>
      <div class="flex items-center bg-[#f3f3f3] p-5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.16)] mb-3">
        <div>
          <img class="w-[40px] h-[40px] mr-5" src="/temperature_refrigerator_icon1.png" alt="icon" />
        </div>
        <div class="w-full">
          <div class="text-[#858585] font-bold mb-2">冷藏品溫</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-white text-center rounded py-1">{{ tempStore.temperature?.c.cold }}</div>
            <div class="bg-white text-center rounded py-1">{{ tempStore.temperature?.f.cold }}</div>
          </div>
        </div>
      </div>
      <div class="flex items-center bg-white p-5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.16)] mb-3">
        <div>
          <img class="w-[40px] h-[40px] mr-5" src="/temperature_freezer_icon2.png" alt="icon" />
        </div>
        <div class="w-full">
          <div class="text-primary font-bold mb-2">冷凍廂溫</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-[#f3f3f3] text-center rounded py-1">{{ tempStore.temperature?.c.frozen_storage }}</div>
            <div class="bg-[#f3f3f3] text-center rounded py-1">{{ tempStore.temperature?.f.frozen_storage }}</div>
          </div>
        </div>
      </div>
      <div class="flex items-center bg-[#f3f3f3] p-5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.16)] mb-3">
        <div>
          <img class="w-[40px] h-[40px] mr-5" src="/temperature_refrigerator_icon2.png" alt="icon" />
        </div>
        <div class="w-full">
          <div class="text-[#858585] font-bold mb-2">冷藏廂溫</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-white text-center rounded py-1">{{ tempStore.temperature?.c.cold_storage }}</div>
            <div class="bg-white text-center rounded py-1">{{ tempStore.temperature?.f.cold_storage }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
