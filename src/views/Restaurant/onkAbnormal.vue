<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { Icon, NavBar, DatetimePicker, Popup, Switch } from 'vant'
import RestaurantMenuPopup from './components/RestaurantMenuPopup.vue'
import useDispatchInfo from '@/views/Dispatch/store'
import useRestaurant from '@/views/Restaurant/store'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import useCommonStore from '@/common/useCommonStore.js'
import { useAlertModal } from '@/components/store/AlertModalStore'
const store = useCommonStore()
const modal = useAlertModal()
const { dispatch, currentRestaurant } = useDispatchInfo()
const { currentDelivery, postOnKAction } = useRestaurant()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!dispatch || !currentRestaurant || !currentDelivery) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  }
})

const isShowMenu = ref(false)
const date = ref('')
const today = ref(new Date())
const show = ref(false)
const noset = ref(false)

const formatDate = (date) => {
  return dayjs(date).format('MM/DD/YYYY')
}
const onConfirmDate = (value) => {
  show.value = false
  date.value = formatDate(value)
}

const onClickRight = () => {
  isShowMenu.value = true
}

const exReason = reactive({
  code: currentDelivery?.code,
  exp: date,
  name: null,
  no: null,
  qty: 0,
  set_qty: null,
  note: '',
})
watch(
  () => noset.value,
  () => {
    exReason.set_qty = null
  },
)

const reason = computed(() => {
  if (store.onkAbnormalReasons && currentDelivery?.code) {
    return store.onkAbnormalReasons.find((value) => value.code === currentDelivery.code)
  } else return null
})

const onClickLeft = () => {
  router.push({
    path: '/restaurant/delivery',
    query: {
      ...route.query,
    },
  })
}

const handlePostOnK = () => {
  if (!exReason.name || !exReason.no) {
    modal.open({
      type: 'error',
      title: '錯誤',
      content: '請確實填寫品號與名稱',
    })
  } else if (!exReason.note) {
    modal.open({
      type: 'error',
      title: '錯誤',
      content: '備註原因欄位為必填',
    })
  } else {
    const payload = {
      ...exReason,
      exp: formatDate(today.value),
    }
    postOnKAction(currentDelivery.id, payload).then(() => onClickLeft())
  }
}
</script>

<template>
  <div class="bg-primary bg-opacity-[0.05] h-full pb-28">
    <RestaurantMenuPopup v-model:isShow="isShowMenu" />
    <NavBar
      safe-area-inset-top
      fixed
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      title="O&K異常登記"
    >
      <template #right> <Icon name="wap-nav" size="18" /> </template>
    </NavBar>
    <div class="px-7 bg-[#F2F8FB] pt-20">
      <div class="rounded-[20px] shadow-lg">
        <section class="rounded-t-[20px] max-w-5xl overflow-hidden bg-white py-4 px-6">
          <div class="text-primary text-[13px] mb-2"><span class="font-bold">單號 </span>{{ '202020430' }}</div>
          <div class="flex">
            <div class="mr-2">
              <img src="/dispatching_calendar.png" class="h-4 align-sub pr-1" alt="calanderIcon" />
              <span class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">{{
                dayjs(currentRestaurant?.departure_time).format('MM/DD/YYYY')
              }}</span>
            </div>
            <div>
              <img src="/dispatching_clock.png" class="h-4 align-sub px-1" alt="clockIcon" />
              <span class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">{{
                dayjs(currentRestaurant?.departure_time).format('HH:mm')
              }}</span>
            </div>
          </div>
        </section>
        <section
          class="rounded-b-[20px] max-w-5xl shadow-[0_0_2px_0_rgba(112,112,112,100)] overflow-hidden bg-white py-3 px-6"
        >
          <div
            class="input-wrap flex flex-col bg-zinc-100 px-2 py-3 text-neutral-500 rounded"
            @click="handleToDeliveryDetail"
          >
            <input v-model="exReason.name" type="text" placeholder="輸入品號" class="py-2 col-span-4" />
            <input v-model="exReason.no" type="text" placeholder="輸入產品名稱" class="py-2 col-span-4" />
          </div>
        </section>
      </div>

      <div class="flex flex-col items-stretch">
        <div
          class="flex flex-col items-center bg-white text-gray text-[13px] shadow-[0_2px_10px_0_rgba(112,112,112,100)] border-[solid 1px #707070] rounded-[20px] px-8 py-4 my-6"
        >
          <div class="mb-3 font-bold text-[13px]">異常原因</div>
          <input
            v-if="reason"
            :value="reason.code + ' ' + reason.content"
            name="reason"
            class="w-11/12 border border-dashed p-3 text-gray bg-[#fffcf6] tracking-widest"
          />
          <div class="mt-6 mb-3 font-bold text-[13px]">有效日期</div>
          <input
            :value="formatDate(today)"
            name="exp"
            @click="show = true"
            class="w-11/12 border border-dashed p-3 text-gray bg-[#fffcf6] tracking-widest"
          />
          <!-- <Calendar
            title="選擇日期"
            row-height="36"
            color="#086eb6"
            first-day-of-week="1"
            v-model:show="show"
            @confirm="onConfirmDate"
            :show-confirm="false"
          /> -->
          <Popup v-model:show="show" position="bottom">
            <DatetimePicker
              v-model="today"
              type="date"
              @confirm="onConfirmDate"
              title="選擇日期"
              confirm-button-text="確認"
              cancel-button-text="取消"
              :columns-order="['month', 'day', 'year']"
            />
          </Popup>

          <div class="mt-6 mb-3 font-bold text-[13px]">異常數量</div>
          <div class="grid grid-cols-6 w-full mb-2 items-center">
            <div class="text-[15px] col-span-1">單位</div>
            <input v-model="exReason.qty" type="text" class="border py-2 bg-[#fffcf6] border-dashed col-span-4" />
          </div>
          <div class="grid grid-cols-6 w-full items-center mb-2">
            <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !noset }">內包</div>
            <input
              v-model="exReason.set_qty"
              :disabled="!noset"
              type="text"
              class="border py-2 bg-[#fffcf6] border-dashed col-span-4"
            />
            <Switch v-model="noset" size="16px" active-color="#6dbe5b" class="mx-auto"></Switch>
          </div>

          <div class="mt-6 mb-3 font-bold text-[13px]">備註原因</div>
          <textarea v-model="exReason.note" class="py-2 bg-[#fffcf6] border-dashed w-full"></textarea>
        </div>
        <div class="m-auto mb-5">
          <button :onClick="handlePostOnK" class="bg-success border-0 text-white rounded-full py-3 px-28 text-bold">
            完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 使用Calendar時開啟 */
/* :deep(.van-popup) {
  height: 50%;
} */
:deep(#app) {
  font-family: 'Segoe UI';
}
:deep(.van-nav-bar__title) {
  font-size: 12px;
  color: #707070;
}

.input-wrap {
  input {
    outline: 0;
    border-width: 0 0 2px;
    border-color: #000;
    opacity: 0.7;
  }
  input:focus {
    border-color: green;
  }
}
</style>
