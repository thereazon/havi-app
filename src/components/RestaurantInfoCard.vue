<script setup>
import { computed } from 'vue'
import { tempCode } from '@/helpers'

const props = defineProps({
  no: {
    type: String,
    required: true,
  },
  temp_zone: {
    type: String,
    required: true,
  },
  restaurant: {
    type: Object,
    required: true,
  },
})

const tempZones = computed(() => props.temp_zone.split(','))
</script>

<template>
  <section class="rounded-[20px] max-w-5xl shadow-lg overflow-hidden bg-white" v-bind="$attrs">
    <div class="flex justify-around items-baseline pt-1 px-7">
      <p class="text-primary text-[13px] mb-2"><b class="font-bold">單號 </b>{{ props.no }}</p>
      <ul class="list-disc flex flex-nowrap mt-4 mb-2 list-inside justify-center font-bold text-[14px]">
        <li v-for="(temp, index) in tempZones" :key="index" :class="tempCode[temp].markerColor">
          <small class="relative -left-1 whitespace-nowrap" :class="tempCode[temp].color">
            {{ tempCode[temp].name }}
          </small>
        </li>
      </ul>
    </div>

    <div class="divide py-1"></div>

    <div class="px-7 pt-2 flex items-center text-primary font-bold gap-2">
      <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-1/5 text-center rounded-l-[10px]">
        {{ props.restaurant.bu }}
      </div>
      <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-2/5 text-center">{{ props.restaurant.number }}</div>
      <div class="bg-[#f2f2f2] px-3 py-[5px] basis-2/5 rounded-r-[10px] text-center">{{ props.restaurant.name }}</div>
    </div>

    <div class="px-7 pb-3">
      <div class="flex items-center text-gray font-bold gap-2 mt-[15px]">
        <div class="basis-1/12"><img class="w-[30px]" src="/dispatching_map.png" alt="icon" /></div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] basis-11/12 text-left">
          <div>{{ props.restaurant.address }}</div>
        </div>
      </div>
      <div class="flex items-center text-gray font-bold gap-2 mt-[15px]">
        <div class="basis-1/12"><img class="w-[30px]" src="/dispatching_phone.png" alt="icon" /></div>
        <div class="bg-[#f2f2f2] px-3 py-[7px] basis-11/12 text-left">
          {{ props.restaurant.tel }}
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.divide {
  width: 100%;
  height: 1px;
  background-image: linear-gradient(to right, #086eb6 0%, #086eb6 70%, transparent 50%);
  background-size: 30px 2px;
  background-repeat: repeat-x;
}
</style>
