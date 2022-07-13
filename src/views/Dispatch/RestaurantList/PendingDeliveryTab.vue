<script setup>
import { Button } from 'vant'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { restaurantStatusFromStatusToZh } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const route = useRoute()
const router = useRouter()

const { dispatch, restaurant } = useDispatchInfo()

const restaurtants = computed(() => {
  const delay = restaurant?.DELAY ? restaurant.DELAY : []
  const pedingDelivery = restaurant?.PENDING_DELIVERY ? restaurant.PENDING_DELIVERY : []
  const list = [...delay, ...pedingDelivery]
  return list
})
</script>

<template>
  <div class="h-screen py-10">
    <RestaurantDetailTable
      v-for="item in restaurtants"
      :key="item.id"
      :title="restaurantStatusFromStatusToZh(item.status)"
      :dispatch="dispatch"
      :restaurant="item"
    />
  </div>
</template>

<style scoped></style>
