<script setup>
import { Button } from 'vant'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import { RestaurantStatusTypeToZh } from '@/views/Dispatch/helper'
import RestaurantDetailTable from '@/components/RestaurantDetailTable.vue'

const route = useRoute()
const router = useRouter()

const { dispatch, restaurant } = useDispatchInfo()

const restaurtants = computed(() => {
  const tempConfirmation = restaurant?.TEMP_CONFIRMATION ? restaurant.TEMP_CONFIRMATION : []
  const deliveryCompleted = restaurant?.DELIVERY_COMPLETED ? restaurant.DELIVERY_COMPLETED : []
  const list = [...tempConfirmation, ...deliveryCompleted]
  return list
})
</script>

<template>
  <div class="h-screen py-10">
    <RestaurantDetailTable
      v-for="item in restaurtants"
      :key="item.id"
      :title="item.status"
      :dispatch="dispatch"
      :restaurant="item"
    />
  </div>
</template>

<style scoped></style>
