<script setup>
import { ref, onMounted } from 'vue'
import { NavBar } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from '@/views/Restaurant/store'
import RestaurantInfoCard from '@/components/RestaurantInfoCard.vue'
import RestaurantMenuPopup from './components/RestaurantMenuPopup.vue'
import ReturnedTable from './components/ReturnedTable.vue'

const { dispatch, currentRestaurant } = useDispatchInfo()
const restaurantStore = useRestaurant()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!dispatch || !currentRestaurant) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  } else {
    restaurantStore.getReturnedAction(currentRestaurant.id)
  }
})

const isShowMenu = ref(false)

const onClickLeft = () => {
  router.push({
    path: '/restaurantlist',
    query: {
      ...route.query,
    },
  })
}

const onClickRight = () => {
  isShowMenu.value = true
}
</script>

<template>
  <div class="bg-[#F2F8FB] min-h-screen">
    <RestaurantMenuPopup v-model:isShow="isShowMenu" />
    <NavBar safe-area-inset-top fixed left-arrow title="退貨單" @click-left="onClickLeft" @click-right="onClickRight"
      ><template #right> <van-icon name="wap-nav" size="14" color="black" /> </template>
    </NavBar>
    <div class="px-[26px] pt-20">
      <RestaurantInfoCard
        v-if="dispatch"
        :temp_zone="currentRestaurant.temp_zone"
        :no="dispatch.no"
        :restaurant="currentRestaurant"
      />
      <div class="mt-10 pb-20">
        <ReturnedTable v-if="restaurantStore.returned" :detailData="restaurantStore.returned" title="退貨單號" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
