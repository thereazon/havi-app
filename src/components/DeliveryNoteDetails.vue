<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { Collapse, CollapseItem, Checkbox } from 'vant'

const props = defineProps({
  delivery: {
    type: Object,
    required: true,
  },
})

const deliveryTableData = computed(() => {
  let tempDelivery = props.delivery
  tempDelivery.code = 'O'
  tempDelivery.items = tempDelivery.items.map(({ data, ...props }) => ({
    checked: false,
    data: data.map((x) => ({ abnormal: true, ...x })),
    ...props,
  }))

  return tempDelivery
})

const filterDeliveryItems = computed(() => {
  const filterByActiveTemperature = (deliveryItem) => {
    if (tabActive.value === 'all') return true
    return deliveryItem.temp_zone === tabActive.value
  }

  const paginationQuery = (() => {
    const start = (currentPage.value - 1) * pageSize
    const end = currentPage.value * pageSize
    return [start, end]
  })()

  return deliveryTableData.value.items.filter(filterByActiveTemperature).slice(...paginationQuery)
})

const allChecked = ref(false)
const isAllChecked = ref(false)
const tabActive = ref('all')
const collapseActiveNames = ref([])
const pageSize = 5
const MINIMUM_TOTAL = 1
const total = computed(() => filterDeliveryItems.value.length || MINIMUM_TOTAL)
const currentPage = ref(1)
const pageTotal = computed(() => Math.ceil(total.value / pageSize))
const state = reactive({
  tabList: [
    { value: 'all', title: '全部', bg: '#fff', color: '#044d80' },
    { value: 'D', title: '常溫', bg: '#6dbe5b', color: '#fff' },
    { value: 'C', title: '冷藏', bg: '#086eb6', color: '#fff' },
    { value: 'F', title: '冷凍', bg: '#044d80', color: '#fff' },
  ],
  mockData: {
    no: '202020430',
    code: 'O', // 畫面顯示
    date: '02/06/2021',
    cube: 1332.52,
    // total: 8, // pagination
    // currentPage: 1, // pagination
    items: [
      {
        rec_no: '001',
        wrin: '12345678901234234',
        temp_zone: 'F',
        item_desc: '麥當勞冷凍麥克炸雞排',
        qty: 11,
        uom: '箱',
        checked: false, // for checked
        data: [
          {
            uid: '1',
            batch_no: '120720',
            qty: 6,
            uom: '箱',
            abnormal: false, // 異常按鈕顯示
          },
          {
            uid: '2',
            batch_no: '120720',
            qty: 5,
            uom: '箱',
            abnormal: true,
          },
        ],
      },
      {
        rec_no: '002',
        wrin: '1234457890124214',
        temp_zone: 'C',
        item_desc: '滿福麵包C',
        qty: 11,
        uom: '箱',
        checked: false,
        data: [
          {
            uid: '1',
            batch_no: '120720',
            qty: 6,
            uom: '箱',
            abnormal: false,
          },
          {
            uid: '2',
            batch_no: '120720',
            qty: 5,
            uom: '箱',
            abnormal: true,
          },
        ],
      },
      {
        rec_no: '003',
        wrin: '11245567890124214',
        temp_zone: 'D',
        item_desc: '點點卡',
        qty: 11,
        uom: '箱',
        checked: false,
        data: [
          {
            uid: '1',
            batch_no: '120720',
            qty: 6,
            uom: '箱',
            abnormal: false,
          },
          {
            uid: '2',
            batch_no: '120720',
            qty: 5,
            uom: '箱',
            abnormal: true,
          },
        ],
      },
    ],
  },
})

const handleTab = (id) => {
  tabActive.value = id
}
const prevPage = () => {
  if (currentPage.value === 1) {
    return
  } else {
    currentPage.value -= 1
  }
}
const nextPage = () => {
  if (currentPage.value === pageTotal.value) {
    return
  } else {
    currentPage.value += 1
  }
}

watch(allChecked, (newVal, oldVal) => {
  if (newVal) {
    filterDeliveryItems.value.forEach((item) => (item.checked = true))
  }
  if (isAllChecked.value && oldVal) {
    filterDeliveryItems.value.forEach((item) => (item.checked = false))
  }
})

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

watch(
  () => tabActive.value,
  (newVal, oldVal) => {
    resetPagination()
  },
)

const resetPagination = () => {
  currentPage.value = 1
}
</script>

<template>
  <div class="h-screen pt-[26px] px-5 bg-[#daf0ff] flex flex-col items-center">
    <div class="w-[50%] h-8 flex justify-between items-center mb-5">
      <div class="w-8 h-full rounded-full bg-white" @click="prevPage()"></div>
      <div
        class="w-16 h-6 text-[0.875rem] rounded-full bg-white text-primary border border-solid border-primary flex justify-center items-center"
      >
        {{ currentPage }} / {{ pageTotal }}
      </div>
      <div class="w-8 h-full rounded-full bg-white" @click="nextPage()"></div>
    </div>

    <ul class="w-[90%] h-7 mb-5 flex items-center justify-between">
      <li
        v-for="tab in state.tabList"
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
            <span>{{ deliveryTableData.no }}</span>
          </div>
          <div class="w-14 h-full flex justify-center items-center bg-[#044d80] text-white text-[0.75rem] rounded-full">
            {{ deliveryTableData.code }}代號
          </div>
        </div>
        <div class="text-gray text-[0.875rem] flex justify-between items-center">
          <div class="flex items-center">
            <img src="/dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-24 h-5 pl-2 flex items-center">{{ deliveryTableData.date }}</div>
          </div>
          <div class="flex items-center">
            <img src="/dispatching_box.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">{{ deliveryTableData.cube }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="filterDeliveryItems.length"
        class="flex items-center px-4 py-[10px] border-0 border-y border-solid border-[#f2f2f2]"
      >
        <div class="w-[10%]">
          <Checkbox v-model="allChecked" @click.stop></Checkbox>
        </div>
        <span class="text-[#044d80] text-[0.875rem] font-bold">全選</span>
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
              <span class="text-[0.875rem] truncate">{{ item.batch_no }}</span>
            </div>
            <div class="w-[40%] flex justify-between items-center text-[0.875rem]">
              <div class="min-w-[40%] flex justify-between items-center">
                <span>{{ item.qty }}</span>
                <span>{{ item.uom }}</span>
              </div>
              <div
                v-if="item.abnormal"
                class="w-12 h-5 text-[0.75rem] flex justify-center items-center bg-warning text-white rounded-full"
              >
                異常+
              </div>
            </div>
          </li>
        </CollapseItem>
      </Collapse>
    </div>
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
</style>
