<script setup>
import { ref, onMounted } from 'vue'
import { NavBar, Button } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from '@/views/Restaurant/store'
import RestaurantSignInCard from '@/components/RestaurantSignInCard.vue'
import RestaurantMenuPopup from './components/RestaurantMenuPopup.vue'
import { getCanvasToImage, isCanvasEmpty } from '@/utils/canvas'
import SignatureComponent from '@/components/SignatureComponent.vue'
import { useAlertModal } from '@/components/store/AlertModalStore'
import vueEsign from 'vue-esign'
const modal = useAlertModal()
const store = useRestaurant()
const { dispatch, currentRestaurant, setCurrentRestaurant, getDispatchDetailAction } = useDispatchInfo()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!dispatch) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  } else if (!currentRestaurant) {
    router.push({
      path: '/restaurantlist',
      query: {
        ...route.query,
      },
    })
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

const handleFinish = () => {
  esign.value
    .generate()
    .then((sign) => {
      const cb = async () => {
        await getDispatchDetailAction(dispatch.id).then(() => {
          setCurrentRestaurant(null)
          router.push({
            path: '/restaurantlist',
            query: {
              ...route.query,
            },
          })
          store.$reset()
        })
      }
      store.postStoreFinish(currentRestaurant.id, sign, cb)
    })
    .catch(() => {
      modal.open({
        type: 'error',
        title: '錯誤',
        content: '司機簽名不可為空',
      })
    })
}

let esign = ref(null)

const handleReset = () => {
  esign.value.reset()
}
</script>

<template>
  <div class="bg-[#F2F8FB] h-screen">
    <RestaurantMenuPopup v-model:isShow="isShowMenu" />
    <NavBar safe-area-inset-top fixed left-arrow title="餐廳簽收" @click-left="onClickLeft" @click-right="onClickRight"
      ><template #right> <van-icon name="wap-nav" size="14" color="black" /> </template>
    </NavBar>
    <div class="px-[26px] bg-[#F2F8FB] pt-20">
      <RestaurantSignInCard
        v-if="dispatch && currentRestaurant"
        :departure_time="dispatch.departure_time"
        :no="dispatch.no"
        :restaurant="currentRestaurant"
      />
      <div class="w-full">
        <div class="mt-8 mb-[5px] text-[#959595] flex items-center justify-between relative">
          <div class="text-center text-[0.8125rem] font-bold invisible">司機簽名</div>
          <div class="text-center text-[0.8125rem] font-bold">司機簽名</div>
          <div
            class="w-[16%] text-center text-[#eb5e55] text-[0.75rem] border border-solid border-[#eb5e55] rounded-full"
            :onClick="handleReset"
          >
            清除
          </div>
        </div>

        <div class="divide w-full h-[280px] border-1 border-solid border-transparent">
          <vueEsign ref="esign" height="600" :lineWidth="3" :lineColor="lineColor" />
        </div>
      </div>
      <Button
        :disabled="store.isPreviewMode"
        :onClick="handleFinish"
        class="w-full mt-7 text-white font-bold text-[1.0625rem] bg-success rounded-full"
      >
        完成
      </Button>
    </div>
  </div>
</template>

<style scoped>
.divide {
  background: linear-gradient(#fffcf6, #fffcf6) padding-box,
    repeating-linear-gradient(-45deg, #707070 0, #707070 0.6rem, #fffcf6 0, #fffcf6 1rem);
}
</style>
