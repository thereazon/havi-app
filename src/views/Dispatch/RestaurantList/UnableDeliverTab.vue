<script setup>
import { computed, ref } from 'vue'
import { Popup } from 'vant'
import useDispatchInfo from '@/views/Dispatch/store'
import { restaurantStatusFromStatusToZh } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const { dispatch, restaurant, openUnableDeliverMenu } = useDispatchInfo()
const restaurtants = computed(() => {
  const unableDelivery = restaurant?.UNABLE_DELIVERY ? restaurant.UNABLE_DELIVERY : []
  return unableDelivery
})

const handleOpenUnableDeliverMenu = () => openUnableDeliverMenu()
</script>

<template>
  <div class="h-screen py-10">
    <RestaurantDetailTable
      v-for="item in restaurtants"
      :key="item.id"
      :title="restaurantStatusFromStatusToZh(item.status)"
      :dispatch="dispatch"
      :restaurant="item"
      :handleOpenUnableDeliverMenu="handleOpenUnableDeliverMenu"
    />
  </div>
</template>

<style scoped></style>
