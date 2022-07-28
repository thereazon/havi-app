<script setup>
import { ref, reactive, watch } from 'vue'
import { Icon, NavBar, DatetimePicker, Calendar, Popup, Switch } from 'vant'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import useCommonStore from '@/common/useCommonStore.js'

const router = useRouter()
const store = useCommonStore()
const date = ref('')
const today = ref(new Date())
const show = ref(false)
const noset = ref(true)

const formatDate = (date) => {
  return dayjs(date).format('MM/DD/YYYY')
}
const onConfirmDate = (value) => {
  show.value = false
  date.value = formatDate(value)
}

const exReason = reactive({
  selectReason: store.onkAbnormalReasons[0],
  exp: date,
  qty: null,
  set_qty: null,
  note: '',
})
watch(
  () => noset.value,
  () => {
    exReason.set_qty = null
  },
)

const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  // 【餐廳明細 - 作業明細 – 餐廳溫度確認 - 確認送出後 - 查看menu】
  //   router.push({
  //     path: '/restaurant/temperature',
  //     query: {
  //
  //     },
  //   })
}

const handleToDeliveryDetail = () => {
  // 【餐廳明細 - 作業明細 - 送貨單 - O代號 - 輸入產品資訊】
  //   router.push({
  //     path: '/restaurant/delivery',
  //     query: {
  //
  //     },
  //   })
}
</script>

<template>
  <div class="bg-primary bg-opacity-[0.05] h-full pb-28">
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
              <span class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">{{ '11/23/2020' }}</span>
            </div>
            <div>
              <img src="/dispatching_clock.png" class="h-4 align-sub px-1" alt="clockIcon" />
              <span class="bg-zinc-100 text-[13px] px-2 py-px text-neutral-500">{{ '20:20' }}</span>
            </div>
          </div>
        </section>
        <section
          class="rounded-b-[20px] max-w-5xl shadow-[0_0_2px_0_rgba(112,112,112,100)] overflow-hidden bg-white py-3 px-6"
        >
          <div class="flex flex-col bg-zinc-100 px-2 py-3 text-neutral-500 rounded" @click="handleToDeliveryDetail">
            <span class="text-[12px] font-bold leading-[1.17]">輸入品號</span>
            <span class="text-[10px] leading-[1.3]">輸入產品名稱</span>
          </div>
        </section>
      </div>

      <div class="flex flex-col items-stretch">
        <div
          class="flex flex-col items-center bg-white text-gray text-[13px] shadow-[0_2px_10px_0_rgba(112,112,112,100)] border-[solid 1px #707070] rounded-[20px] px-8 py-4 my-6"
        >
          <div class="mb-3 font-bold text-[13px]">異常原因</div>
          <select v-model="exReason.selectReason" class="w-full border-dashed p-3 text-gray bg-[#fffcf6]">
            <option v-for="reason in store.onkAbnormalReasons" :key="reason.id" :value="reason">
              {{ reason.code + ' ' + reason.content }}
            </option>
          </select>

          <div class="mt-6 mb-3 font-bold text-[13px]">有效日期</div>
          <input
            v-model="date"
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
          <button class="bg-success border-0 text-white rounded-full py-3 px-28 text-bold">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
