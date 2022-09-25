<script setup>
import { Step, Steps, Button } from 'vant'
import AppDivide from '@/components/ui/AppDivide.vue'
import RestaurantInfoModal from '@/components/RestaurantInfoModal.vue'
import { computed, ref } from 'vue'
import { splitFullDateTimeAsDateAndTime } from '@/utils/date'
import { tempCode } from '@/helpers'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  no: {
    type: String,
    required: true,
  },
  temp_zone: {
    type: String,
    required: true,
  },
  departure_time: {
    type: String,
    required: true,
  },
  cube: {
    type: Number,
    required: true,
  },
  store: {
    type: Array,
    required: true,
  },
})

const departureDt = computed(() =>
  splitFullDateTimeAsDateAndTime(props.departure_time, { dateFormat: 'MM/DD/YYYY', timeFormat: 'HH:mm' }),
)
const tempZones = computed(() => props.temp_zone.split(','))

const isShow = ref(false)
const infoData = ref({
  bu: null,
  number: null,
  name: null,
  address: null,
  tel: null,
})
const restaurantInfoBtn = (info) => {
  infoData.value = { ...info }
  isShow.value = true
}
</script>

<template>
  <section class="rounded-[20px] max-w-5xl shadow-lg overflow-hidden bg-white" v-bind="$attrs">
    <!-- card header -->
    <div class="flex justify-around items-baseline pt-1">
      <p class="text-primary text-[14px] mb-2"><b class="font-bold">單號 </b>{{ props.no }}</p>
      <ul class="list-disc flex flex-nowrap mt-4 mb-2 list-inside justify-center font-bold text-[14px]">
        <li v-for="(temp, index) in tempZones" :key="index" :class="tempCode[temp].markerColor">
          <small class="relative -left-1 whitespace-nowrap" :class="tempCode[temp].color">
            {{ tempCode[temp].name }}
          </small>
        </li>
      </ul>
    </div>
    <!-- divide -->
    <AppDivide />
    <!-- info -->
    <div class="flex justify-around py-1 my-1">
      <div>
        <img src="/dispatching_calendar.png" class="h-4 align-sub px-1" alt="calanderIcon" />
        <span class="bg-zinc-100 text-[14px] px-1 py-px text-neutral-500">{{ departureDt.date }}</span>
      </div>
      <div>
        <img src="/dispatching_clock.png" class="h-4 align-sub px-1" alt="clockIcon" />
        <span class="bg-zinc-100 text-[14px] px-1 py-px text-neutral-500">{{ departureDt.time }}</span>
      </div>
      <div>
        <img src="/dispatching_box.png" class="h-4 align-sub px-1" alt="boxIcon" />
        <span class="bg-zinc-100 text-[14px] px-1 py-px text-neutral-500">{{ props.cube }}</span>
      </div>
    </div>
    <!-- record -->
    <div class="bg-zinc-100 px-7">
      <Steps direction="vertical" :active="0" class="bg-zinc-100 mt-2">
        <Step v-for="st in props.store" :key="st.id">
          <div class="flex justify-start flex-nowrap space-x-2">
            <Button
              class="h-auto my-0 px-4 py-2 rounded-md bg-white text-neutral-500 text-center text-[14px]"
              @click="restaurantInfoBtn(st)"
              >{{ st.bu }}</Button
            >
            <Button
              class="h-auto my-0 px-4 py-2 rounded-md bg-white text-neutral-500 text-center truncate w-4/12 text-[14px]"
              @click="restaurantInfoBtn(st)"
              >{{ st.number }}</Button
            >
            <Button
              class="h-auto my-0 px-4 py-2 rounded-md bg-white text-neutral-500 text-center truncate w-6/12 text-[14px]"
              @click="restaurantInfoBtn(st)"
              >{{ st.name }}</Button
            >
          </div>
        </Step>
      </Steps>
    </div>

    <slot></slot>
  </section>

  <RestaurantInfoModal :infoData="infoData" v-model:isShow="isShow" />
</template>

<style lang="scss" scoped>
:deep(.van-step--vertical) {
  padding: 2px 10px 10px 0;
}
:deep(.van-step__circle-container) {
  @apply text-sm;
  .van-icon-checked:before,
  .van-step__circle {
    @apply content-[''] w-3 h-3 bg-primary rounded-xl;
  }
}

:deep(.van-step__line) {
  @apply w-1 -left-[17px] bg-primary top-0;

  &:last-child {
    @apply w-1;
  }
}
</style>
