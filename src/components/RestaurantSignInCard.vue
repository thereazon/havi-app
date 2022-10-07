<script setup>
import AppDivide from '@/components/ui/AppDivide.vue'
import { computed } from 'vue'
import { splitFullDateTimeAsDateAndTime } from '@/utils/date'

const props = defineProps({
  no: {
    type: String,
    required: true,
  },
  departure_time: {
    type: String,
    required: true,
  },
  restaurant: {
    type: Object,
    required: true,
  },
})

const departureDt = computed(() =>
  splitFullDateTimeAsDateAndTime(props.departure_time, { dateFormat: 'MM/DD/YYYY', timeFormat: 'HH:mm' }),
)
</script>

<template>
  <section class="rounded-[20px] max-w-5xl shadow-lg overflow-hidden bg-white" v-bind="$attrs">
    <div class="py-2 px-7">
      <p class="text-primary text-[13px] my-1"><b class="font-bold">單號 </b>{{ props.no }}</p>

      <div class="my-1">
        <img src="/dispatching_calendar.png" class="h-4 align-sub pr-1" alt="calanderIcon" />
        <span class="bg-zinc-100 text-[13px] px-1 py-px text-neutral-500">{{ departureDt.date }}</span>
      </div>
    </div>
    <AppDivide />
    <div class="px-7 pt-2 pb-3 flex items-center text-primary font-bold gap-2">
      <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-1/5 text-center rounded-l-[10px]">
        {{ props.restaurant.bu }}
      </div>
      <div class="bg-[#f2f2f2] px-3 py-[7px] rounded basis-2/5 text-center">{{ props.restaurant.number }}</div>
      <div class="bg-[#f2f2f2] px-3 py-[5px] basis-2/5 rounded-r-[10px] text-center">{{ props.restaurant.name }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
