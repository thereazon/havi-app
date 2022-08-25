<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { Collapse, CollapseItem, Checkbox, Button, Icon, RadioGroup, Radio } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import useRestaurant from '@/views/Restaurant/store'
import ConfirmDialog from './ConfirmDialog.vue'

const { postDeliveryAction, deleteDeliveryAction, setCurrentDelivery } = useRestaurant()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  deliveries: {
    type: Array,
    required: true,
  },
})

const DELIVERY_CODE = 'O'
const deliveryTableData = computed(() => {
  return props.deliveries.map(({ items, ...remainDeliveryProperties }) => ({
    code: DELIVERY_CODE,
    items: items.map((item) => ({
      checked: false,
      ...item,
    })),
    ...remainDeliveryProperties,
  }))
})

const currentDelivery = computed(() => {
  return deliveryTableData.value[currentIndex.value]
})

let _filterDeliveriesItems = ref([])
const filterDeliveryItems = computed({
  get() {
    const filterByActiveTemperature = (deliveryItem) => {
      if (tabActive.value === 'all') return true
      return deliveryItem.temp_zone === tabActive.value
    }

    const sortByRecNo = (a, b) => a.rec_no - b.rec_no

    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    _filterDeliveriesItems.value = currentDelivery.value.items.filter(filterByActiveTemperature).sort(sortByRecNo)
    return _filterDeliveriesItems.value
  },
  set(val) {
    _filterDeliveriesItems.value = [...val]
  },
})

const tabList = [
  { value: 'all', title: '全部', bg: '#fff', color: '#044d80' },
  { value: 'D', title: '常溫', bg: '#6dbe5b', color: '#fff' },
  { value: 'C', title: '冷藏', bg: '#086eb6', color: '#fff' },
  { value: 'F', title: '冷凍', bg: '#044d80', color: '#fff' },
]
const rejectTypeList = [
  { code: 'F1', reason: '餐廳空間不足付費拒收' },
  { code: 'F2', reason: '溫度品質拒收' },
  { code: 'F3', reason: '產品品質拒收' },
]

const allChecked = ref(false)
const isAllChecked = ref(false)
const isConfirmDialog = ref(false)
const rejectReason = ref('')
const tabActive = ref('all')
const collapseActiveNames = ref([])
const MINIMUM_TOTAL = 1
const total = computed(() => deliveryTableData.value.length || MINIMUM_TOTAL)
const currentIndex = ref(0)
const currentPage = computed(() => currentIndex.value + 1)
const pageTotal = computed(() => total.value)
const rejectData = reactive({
  code: '',
  ids: [],
})

const handleTab = (id) => {
  tabActive.value = id
}
const prevPage = () => {
  if (currentIndex.value === 0) {
    return
  } else {
    currentIndex.value -= 1
  }
}
const nextPage = () => {
  if (currentPage.value === pageTotal.value) {
    return
  } else {
    currentIndex.value += 1
  }
}

const handleRejectType = (rejectType) => {
  rejectData.code = rejectType.code
  rejectReason.value = rejectType.reason
}

const openConfirmDialog = () => {
  rejectData.ids = currentDelivery.value.items.filter((item) => item.checked).map((item) => item.uid)
  if (rejectData.ids.length === 0) {
    return
  }
  isConfirmDialog.value = true
}

const submitRejectCode = () => {
  postDeliveryAction(currentDelivery.value.id, rejectData)
  isConfirmDialog.value = false
}

const handleToOnK = (delivery) => () => {
  setCurrentDelivery(delivery)
  router.push({
    path: '/restaurant/onkabnormal',
    query: {
      ...route.query,
    },
  })
}

watch(
  () => allChecked.value,
  (newVal, oldVal) => {
    if (newVal) {
      filterDeliveryItems.value.forEach((item) => (item.checked = true))
    }
    if (isAllChecked.value && oldVal) {
      filterDeliveryItems.value.forEach((item) => (item.checked = false))
    }
  },
  { deep: true },
)

watch(
  () => filterDeliveryItems.value,
  (newVal, oldVal) => {
    if (newVal.length === 0) {
      allChecked.value = false
      return
    }
    isAllChecked.value = newVal.every((item) => item.checked === true)
    if (isAllChecked.value) {
      allChecked.value = true
    } else {
      allChecked.value = false
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="h-auto max-h-screen pt-[26px] flex flex-col items-center">
    <div class="w-[50%] h-8 flex justify-between items-center mb-5">
      <Button
        type="primary"
        color="#086eb6"
        :plain="currentPage === 1"
        class="w-8 h-8 rounded-full"
        @click="prevPage()"
      >
        <Icon name="arrow-left" />
      </Button>
      <div
        class="w-16 h-6 text-[0.875rem] rounded-full bg-white text-primary border border-solid border-primary flex justify-center items-center"
      >
        {{ currentPage }} / {{ pageTotal }}
      </div>
      <Button
        type="primary"
        color="#086eb6"
        :plain="currentPage === pageTotal"
        class="w-8 h-8 rounded-full"
        @click="nextPage()"
      >
        <Icon name="arrow" />
      </Button>
    </div>

    <ul class="w-[90%] h-7 mb-5 flex items-center justify-between">
      <li
        v-for="tab in tabList"
        :key="tab.value"
        class="w-16 h-full text-[0.875rem] font-bold flex justify-center items-center rounded-full"
        :class="{ 'tab-active': tabActive === tab.value }"
        :style="{ background: tab.bg, color: tab.color }"
        @click="handleTab(tab.value)"
      >
        {{ tab.title }}
      </li>
    </ul>

    <div class="w-full rounded-xl shadow-md bg-white">
      <div class="px-6 pt-3 pb-4">
        <div class="h-6 mb-2 font-bold flex justify-between items-center">
          <div class="flex items-center text-[0.875rem] text-[#044d80]">
            <span class="mr-[10px]">送貨單號</span>
            <span>{{ currentDelivery.no }}</span>
          </div>
          <div
            :onClick="handleToOnK(currentDelivery)"
            class="w-14 h-full flex justify-center items-center bg-[#044d80] text-white text-[0.75rem] rounded-full"
          >
            {{ currentDelivery.code }}代號
          </div>
        </div>
        <div class="text-gray text-[0.875rem] flex justify-between items-center">
          <div class="flex items-center">
            <img src="/dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-24 h-5 pl-2 flex items-center">{{ currentDelivery.date }}</div>
          </div>
          <div class="flex items-center">
            <img src="/dispatching_box.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">{{ currentDelivery.cube }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="filterDeliveryItems.length"
        class="flex justify-between items-center px-4 py-[10px] border-0 border-y border-solid border-[#f2f2f2]"
      >
        <div class="w-[50%] flex items-center">
          <div class="w-[20%]">
            <Checkbox v-model="allChecked" @click.stop></Checkbox>
          </div>
          <span class="text-[#044d80] text-[0.875rem] font-bold">全選</span>
        </div>
        <div class="w-[50%] flex justify-end items-center">
          <img src="/images/delivery/reject.png" class="w-14 h-14" alt="" @click="openConfirmDialog()" />
          <img
            src="/images/delivery/restore.png"
            class="w-14 h-14"
            alt=""
            @click="deleteDeliveryAction(currentDelivery.id)"
          />
        </div>
      </div>
      <Collapse v-model="collapseActiveNames">
        <CollapseItem v-for="product in filterDeliveryItems" :key="product.wrin" :name="product.wrin">
          <template #title>
            <div class="flex items-center">
              <div class="w-[10%]">
                <Checkbox v-model="product.checked" @click.stop></Checkbox>
              </div>
              <div class="w-[50%] flex flex-col leading-snug">
                <span class="text-[#044d80] text-[0.875rem] font-bold truncate">{{ product.item_desc }}</span>
                <span class="text-gray text-[0.75rem] truncate">{{ product.wrin }}</span>
              </div>
              <div class="w-[40%] flex items-center text-[0.875rem] font-bold text-[#044d80]">
                <div class="min-w-[40%] flex justify-between items-center">
                  <span>{{ product.qty }}</span>
                  <span>{{ product.uom }}</span>
                </div>
              </div>
            </div>
          </template>

          <li
            v-for="item in product.data"
            :key="item.uid"
            class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray"
          >
            <div class="w-[50%] ml-[10%] leading-snug">
              <div class="text-[0.875rem] truncate">{{ item.exp }}</div>
              <div class="text-[0.875rem] truncate">#{{ item.batch_no }}</div>
            </div>
            <div class="w-[40%] flex justify-between items-center text-[0.875rem]">
              <div class="min-w-[40%] flex justify-between items-center">
                <span>{{ item.qty }}</span>
                <span>{{ item.uom }}</span>
              </div>
              <Button
                color="#eb5e55"
                round
                type="danger"
                size="mini"
                @click="
                  $emit('deliveryItemAbnormal', item, product, { no: currentDelivery.no, date: currentDelivery.date })
                "
                >異常+</Button
              >
            </div>
          </li>
        </CollapseItem>
      </Collapse>
    </div>

    <ConfirmDialog v-model:isShowDialog="isConfirmDialog" :isCloseOnClickOverlay="true">
      <template v-slot:title>
        <div>請選擇拒收形式</div>
      </template>
      <div class="h-6 flex justify-center items-center text-warning text-[0.8125rem] font-bold mt-5">
        {{ rejectReason }}
      </div>
      <RadioGroup v-model="rejectData.code">
        <ul class="flex justify-evenly items-center my-5">
          <li
            class="w-16 h-16 flex justify-center items-center font-bold text-[2.5rem] text-warning shadow-md rounded-md box-border"
            :class="{ 'reject-checked': rejectData.code === item.code }"
            v-for="item in rejectTypeList"
            :key="item.code"
            @click="handleRejectType(item)"
          >
            {{ item.code }}
            <Radio :name="item.code" />
          </li>
        </ul>
        <div class="flex justify-center items-center text-gray text-[0.8125rem] font-bold">是否確認拒收？</div>
      </RadioGroup>
      <template v-slot:footer>
        <div class="px-[10%] mt-[42px] flex justify-between items-center font-bold text-white text-[1rem]">
          <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">取消</button>
          <button
            class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0"
            :disabled="rejectData.code === ''"
            @click="submitRejectCode()"
          >
            確認
          </button>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped>
.tab-active {
  border: 2px solid #eb5e55;
}
:deep(.van-cell__right-icon) {
  display: none;
}
:deep(.van-collapse-item > .van-cell) {
  border-radius: 0 0 0.75rem 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
:deep(.van-collapse-item:last-child) {
  border-bottom: 0;
}
:deep(.van-collapse-item__content) {
  padding: 10px 0;
  background: #f2f2f2;
}
.detail-list {
  border-bottom: 1px solid #707070;
}
.detail-list:last-child {
  border-bottom: 0;
}
:deep(.van-radio__icon) {
  display: none;
}
.reject-checked {
  border: 2px solid #eb5e55;
}
</style>
