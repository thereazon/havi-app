<script setup>
import { ref, onMounted, reactive } from 'vue'
import { NavBar } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from '@/views/Restaurant/store'
import RestaurantSignInCard from '@/components/RestaurantSignInCard.vue'
import ContainerCheckOrder from '@/components/ContainerCheckOrder.vue'
import RestaurantMenuPopup from './components/RestaurantMenuPopup.vue'
const { getContainerAction } = useRestaurant()
const { dispatch, currentRestaurant } = useDispatchInfo()
const router = useRouter()
const route = useRoute()
const containerList = reactive([
  {
    id: 'OC600e91e62b23d',
    date: '01/25/2021',
    no: 'DR2020120001',
    items: [
      {
        id: 'OCD600e91e62c88a',
        wrin: '004',
        name: '容器 1',
        qty: 24,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
        sort: 1,
      },
      {
        id: 'OCD600e91e62c66b',
        wrin: '005',
        name: '容器 2',
        qty: 15,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
        sort: 1,
      },
    ],
  },
  {
    id: 'OC600e91e62b30f',
    date: '01/26/2021',
    no: 'DR2020120005',
    items: [
      {
        id: 'OCD600e91e62c22m',
        wrin: '004',
        name: '容器 3',
        qty: 24,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
        sort: 1,
      },
    ],
  },
  {
    id: 'OC600e91e62b40r',
    date: '01/27/2021',
    no: 'DR2020120002',
    items: [
      {
        id: 'OCD600e91e62c33k',
        wrin: '004',
        name: '容器 4',
        qty: 24,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
        sort: 1,
      },
    ],
  },
])
containerList.forEach((order) => {
  order.items.forEach((content) => {
    content.purchase_total = content.qty + content.overflow_qty - (content.short_qty + content.backing_qty)
    content.return_total = content.return_qty + content.resource_qty
  })
})

onMounted(() => {
  if (!dispatch || !currentRestaurant) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  } else {
    getContainerAction(currentRestaurant.id)
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
  <div class="bg-[#F2F8FB] h-screen">
    <RestaurantMenuPopup v-model:isShow="isShowMenu" />
    <NavBar
      safe-area-inset-top
      fixed
      left-arrow
      title="容器對點單"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      ><template #right> <van-icon name="wap-nav" size="14" color="black" /> </template>
    </NavBar>
    <div class="px-[26px] bg-[#F2F8FB] pt-20">
      <RestaurantSignInCard
        v-if="dispatch"
        :departure_time="dispatch.departure_time"
        :no="dispatch.no"
        :restaurant="currentRestaurant"
      />
      <ContainerCheckOrder :containerList="containerList" />
    </div>
  </div>
</template>

<style scoped></style>
