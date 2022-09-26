<script setup>
import { computed } from 'vue'
import { Button, Icon } from 'vant'
import { PluginStatusToButtonName, PluginStatusType } from '@/views/Dispatch/helper'
const props = defineProps({
  handleupdateStatus: Function,
  handleRouterToDetail: Function,
  plugin: Object,
})

const isSuccessColor = computed(() => {
  if (props.plugin.status === PluginStatusType.PENDING_DELIVERY) {
    return 'success'
  } else if (props.plugin.status === PluginStatusType.DELIVERING) {
    return 'danger'
  } else {
    return 'default'
  }
})
</script>

<template>
  <div class="border-solid border-success border-2 rounded-2xl w-[308px] mx-1 bg-white">
    <div class="bottom-dashed flex py-2 px-4 justify-between">
      <div class="text-success text-[13px] text-center">
        <label>單號</label>
        <br />
        <span>{{ plugin.no }}</span>
      </div>
      <Button :onClick="handleupdateStatus" class="px-[20px] text-[15px]" :type="isSuccessColor" size="small">
        {{ PluginStatusToButtonName[plugin.status] }}
      </Button>
    </div>
    <div class="px-4 flex justify-between mt-3">
      <div class="flex items-center space-x-1">
        <img class="w-[18px]" src="/dispatching_calendar.png" alt="calendar" />
        <div class="w-[80px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ plugin.date }}</div>
      </div>
      <div class="flex items-center space-x-1">
        <img class="w-[18px]" src="/dispatching_clock.png" alt="clock" />
        <div class="w-[43px] text-[12px] text-center text-gray bg-[#f2f2f2] p-1">{{ plugin.time }}</div>
      </div>
      <a class="text-[13px] text-success" :onClick="handleRouterToDetail">
        詳細資訊
        <Icon name="play" />
      </a>
    </div>
    <div class="flex items-center justify-between space-x-1 px-4 mt-3">
      <img class="w-[28px]" src="/dispatching_map_2.png" alt="map" />
      <div class="w-[233px] text-[12px] text-success font-bold bg-[#f2f2f2] py-1 px-2">
        {{ plugin.address }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-dashed {
  border-bottom: 2px dashed #6dbe5b;
}
</style>
