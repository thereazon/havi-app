<script setup>
import { computed } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'
import { restaurantStatusFromStatusToZh, RestaurantStatusBackgroundColor } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const dispatchStore = useDispatchInfo()
const { dispatch, openUnableDeliverMenu } = dispatchStore
const restaurtants = computed(() => {
  const TEMP_CONFIRMATION = dispatchStore.restaurant?.TEMP_CONFIRMATION
    ? dispatchStore.restaurant.TEMP_CONFIRMATION
    : []
  const unableDelivery = dispatchStore.restaurant?.UNABLE_DELIVERY ? dispatchStore.restaurant.UNABLE_DELIVERY : []
  return [...TEMP_CONFIRMATION, ...unableDelivery].sort((a, b) => {
    const d1 = new Date(a.arrival_time)
    const d2 = new Date(b.arrival_time)
    return d1 - d2
  })
})

const handleOpenUnableDeliverMenu = (id) => (type) => openUnableDeliverMenu(id, type)
</script>

<template>
  <div class="h-screen py-10">
    <RestaurantDetailTable
      v-for="item in restaurtants"
      :key="item.id"
      :title="restaurantStatusFromStatusToZh(item.status)"
      :dispatch="dispatch"
      :restaurant="item"
      :handleOpenUnableDeliverMenu="handleOpenUnableDeliverMenu(item.id)"
      :isDC="item.status === 12"
      :backgroundColor="RestaurantStatusBackgroundColor.UNABLE_DELIVERY"
    />
  </div>
</template>

<style scoped></style>
