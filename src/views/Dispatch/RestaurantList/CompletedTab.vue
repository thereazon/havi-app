<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from '@/views/Restaurant/store'
import { RestaurantStatusBackgroundColor } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const route = useRoute()
const router = useRouter()

const restaurantStore = useRestaurant()
const { dispatch, restaurant, getRestaurantDetailAction } = useDispatchInfo()

const restaurtants = computed(() => {
  const tempConfirmation = restaurant?.TEMP_CONFIRMATION ? restaurant.TEMP_CONFIRMATION : []
  const deliveryCompleted = restaurant?.DELIVERY_COMPLETED ? restaurant.DELIVERY_COMPLETED : []
  const list = [...tempConfirmation, ...deliveryCompleted]
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
      :title="item.status"
      :dispatch="dispatch"
      :restaurant="item"
      :backgroundColor="RestaurantStatusBackgroundColor.DELIVERY_COMPLETED"
      :handleRouteToDetail="() => handlePreview(item)"
    />
  </div>
</template>

<style scoped></style>
