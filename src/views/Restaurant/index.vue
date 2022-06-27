<script setup>
import { onMounted } from 'vue'
import useRestaurantInfo from '@/views/Restaurant/store'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const store = useRestaurantInfo()

onMounted(() => {
  store.getStoreDetailAction('DS62a976485a638')
})
</script>

<template>餐廳明細</template>
