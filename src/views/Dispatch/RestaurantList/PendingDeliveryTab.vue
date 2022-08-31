<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from '@/views/Restaurant/store'
import { restaurantStatusFromStatusToZh, RestaurantStatusBackgroundColor } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const route = useRoute()
const router = useRouter()

const restaurantStore = useRestaurant()
const { dispatch, restaurant, getRestaurantDetailAction } = useDispatchInfo()

const restaurtants = computed(() => {
  const delay = restaurant?.DELAY ? restaurant.DELAY : []
  const pedingDelivery = restaurant?.PENDING_DELIVERY ? restaurant.PENDING_DELIVERY : []
  const list = [...delay, ...pedingDelivery]
  return list
})

const handlePreview = (currentRestaurant) => {
  restaurantStore.setPreviewMode(true)
  getRestaurantDetailAction(currentRestaurant.id, () =>
    router.push({
      path: '/restaurant/temperature',
      query: {
        ...route.query,
      },
    }),
  )
}
</script>

<template>
  <div class="h-screen py-10">
    <RestaurantDetailTable
      v-for="item in restaurtants"
      :key="item.id"
      :title="restaurantStatusFromStatusToZh(item.status)"
      :dispatch="dispatch"
      :restaurant="item"
      :backgroundColor="RestaurantStatusBackgroundColor.PENDING_DELIVERY"
      :handleRouteToDetail="() => handlePreview(item)"
    />
  </div>
</template>

<style scoped></style>
