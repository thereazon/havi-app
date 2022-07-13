<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { Collapse, CollapseItem, Checkbox } from 'vant'

const allChecked = ref(false)
const isAllChecked = ref(false)
const tabActive = ref('all')
const collapseActiveNames = ref([])
const pageSize = 5
const total = ref(0)
const currentPage = ref(1)
const pageTotal = computed(() => Math.ceil(total.value / pageSize))
const state = reactive({
  tabList: [
    { value: 'all', title: '全部', bg: '#fff', color: '#044d80' },
    { value: 'normal', title: '常溫', bg: '#6dbe5b', color: '#fff' },
    { value: 'Chilled', title: '冷藏', bg: '#086eb6', color: '#fff' },
    { value: 'Frozen', title: '冷凍', bg: '#044d80', color: '#fff' },
  ],
  mockData: {
    order: '202020430',
    code: 'O',
    date: '02/06/2021',
    weight: '1332.52',
    total: 8,
    currentPage: 1,
    list: [
      {
        productId: 12345678901234234,
        temperature: 'Frozen',
        name: '麥當勞冷凍麥克炸雞排',
        count: 11,
        package: '箱',
        checked: false,
        detailsList: [
          {
            id: 1,
            no: 120720,
            name: '#12',
            count: 6,
            package: '箱',
            abnormal: false,
          },
          {
            id: 2,
            no: 120720,
            name: '#12',
            count: 5,
            package: '箱',
            abnormal: true,
          },
        ],
      },
      {
        productId: 1234457890124214,
        temperature: 'Chilled',
        name: '滿福麵包C',
        count: 11,
        package: '箱',
        checked: false,
        detailsList: [
          {
            id: 1,
            no: 120720,
            name: '#12',
            count: 6,
            package: '箱',
            abnormal: false,
          },
          {
            id: 2,
            no: 120720,
            name: '#12',
            count: 5,
            package: '箱',
            abnormal: true,
          },
        ],
      },
      {
        productId: 11245567890124214,
        temperature: 'normal',
        name: '點點卡',
        count: 11,
        package: '箱',
        checked: false,
        detailsList: [
          {
            id: 1,
            no: 120720,
            name: '#12',
            count: 6,
            package: '箱',
            abnormal: false,
          },
          {
            id: 2,
            no: 120720,
            name: '#12',
            count: 5,
            package: '箱',
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
onMounted(() => {
  total.value = state.mockData.total
  currentPage.value = state.mockData.currentPage
})
watch(allChecked, (newVal, oldVal) => {
  if (newVal) {
    state.mockData.list.forEach((item) => (item.checked = true))
  }
  if (isAllChecked.value && oldVal) {
    state.mockData.list.forEach((item) => (item.checked = false))
  }
})
watch(
  () => state.mockData.list,
  (newVal, oldVal) => {
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
            <span>{{ state.mockData.order }}</span>
          </div>
          <div class="w-14 h-full flex justify-center items-center bg-[#044d80] text-white text-[0.75rem] rounded-full">
            {{ state.mockData.code }}代號
          </div>
        </div>
        <div class="text-gray text-[0.875rem] flex justify-between items-center">
          <div class="flex items-center">
            <img src="dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-24 h-5 pl-2 flex items-center">{{ state.mockData.date }}</div>
          </div>
          <div class="flex items-center">
            <img src="dispatching_box.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-20 h-5 pl-2 flex items-center">{{ state.mockData.weight }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center px-4 py-[10px] border-0 border-y border-solid border-[#f2f2f2]">
        <div class="w-[10%]">
          <Checkbox v-model="allChecked" @click.stop></Checkbox>
        </div>
        <span class="text-[#044d80] text-[0.875rem] font-bold">全選</span>
      </div>
      <Collapse v-model="collapseActiveNames">
        <CollapseItem v-for="product in state.mockData.list" :key="product.productId" :name="product.productId">
          <template #title>
            <div class="flex items-center">
              <div class="w-[10%]">
                <Checkbox v-model="product.checked" @click.stop></Checkbox>
              </div>
              <div class="w-[50%] flex flex-col leading-snug">
                <span class="text-[#044d80] text-[0.875rem] font-bold truncate">{{ product.name }}</span>
                <span class="text-gray text-[0.75rem] truncate">{{ product.productId }}</span>
              </div>
              <div class="w-[40%] flex items-center text-[0.875rem] font-bold text-[#044d80]">
                <div class="min-w-[40%] flex justify-between items-center">
                  <span>{{ product.count }}</span>
                  <span>{{ product.package }}</span>
                </div>
              </div>
            </div>
          </template>

          <li
            v-for="item in product.detailsList"
            :key="item.id"
            class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray"
          >
            <div class="w-[50%] ml-[10%] flex flex-col leading-snug">
              <span class="text-[0.875rem] truncate">{{ item.no }}</span>
              <span class="text-[0.75rem] truncate">{{ item.name }}</span>
            </div>
            <div class="w-[40%] flex justify-between items-center text-[0.875rem]">
              <div class="min-w-[40%] flex justify-between items-center">
                <span>{{ item.count }}</span>
                <span>{{ item.package }}</span>
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
