<script setup>
import { Popup, Divider, Checkbox } from 'vant'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useRestaurant from '@/views/Restaurant/store'
import useDispatchInfo from '@/views/Dispatch/store'
import { useAlertModal } from '@/components/store/AlertModalStore'
const dispatchStore = useDispatchInfo()
const { currentRestaurant } = dispatchStore

const modal = useAlertModal()
const restaurantStore = useRestaurant()
const { isPreviewMode } = restaurantStore
const props = defineProps({
  isShow: Boolean,
})
const emit = defineEmits(['update:isShow'])

const route = useRoute()

const router = useRouter()

let isShow = computed({
  get: () => props.isShow,
  set: (val) => emit('update:isShow', val),
})

/**
 * todo:
 *  path可加上對應路徑
 * 	check未來要接props進來的完成狀態
 * 	value未來要接props進來的單據數量
 */

const list = reactive([
  { check: 'is_temp', text: '餐廳溫度確認', value: 'temperature_count', path: '/restaurant/temperature' },
  { check: null, text: '送貨單', value: 'delivery_count', path: '/restaurant/delivery' },
  { check: null, text: 'OSnD單', value: 'delivery_count', path: '/restaurant/osnd' },
  { check: 'is_container', text: '容器對點單', value: 'container_count', path: '/restaurant/container' },
  { check: 'is_returned', text: '退貨單', value: 'returned_count', path: '/restaurant/returned' },
  { check: 'is_finish', text: '餐廳簽收', key: null, path: '/restaurant/signature' },
  // { check: false, text: '退貨單', value: 1, path: '/' },
])

const goto = (path) => {
  if (currentRestaurant.is_temp || isPreviewMode) {
    router.push({
      path: path,
      query: {
        ...route.query,
      },
    })
  } else {
    emit('update:isShow', false)
    modal.open({
      type: 'hint', //required
      title: '提醒',
      content: '請先完成餐廳溫度確認，才能進行其他作業',
    })
  }
  // 溫度未送出前不能點擊其他頁面
}

const filterNoValueList = computed(() => {
  return list.filter((item) => (item.value ? currentRestaurant[item.value] > 0 : item))
})
</script>

<!-- todo: checkBox完成的樣式,active上面會有border要拿掉 -->
<template>
  <Popup class="rounded-l-lg bg-gray h-[80%]" v-model:show="isShow" position="right">
    <div class="flex flex-col items-stretch text-[#cbcbcb]">
      <div class="text-white text-center my-[30px] text-[20px]">作業步驟</div>
      <Divider :dashed="true" class="mb-[35px] mt-0"></Divider>
      <a
        v-for="item in filterNoValueList"
        :key="item.text"
        :class="{ active: item.path == route.path }"
        class="grid grid-cols-3 pr-[30px] text-[17px]"
        @click="goto(item.path)"
      >
        <Checkbox
          v-model="dispatchStore.currentRestaurant[item.check]"
          disabled
          checked-color="#6dbe5b"
          class="mx-[25px]"
          :class="{
            finish: dispatchStore.currentRestaurant[item.check],
            invisible: item.check === null ? true : false,
          }"
        ></Checkbox>
        <div
          :class="{ 'text-success': dispatchStore.currentRestaurant[item.check] }"
          class="py-[10px] col-span-2 flex justify-between w-full"
        >
          <div class="mr-[60px]">{{ item.text }}</div>
          <div v-if="item.value">{{ dispatchStore.currentRestaurant[item.value] }}</div>
        </div>
      </a>
    </div>
  </Popup>
</template>

<style lang="scss" scoped>
.active {
  @apply text-gray bg-white;
}
.finish {
  :deep(.van-checkbox__icon--disabled .van-icon) {
    background-color: #6dbe5b;
  }
}
</style>
