<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { Collapse, CollapseItem, Button, Icon } from 'vant'

const props = defineProps({
  // table標題
  title: String,
  // osnd單與退貨單header區別 -> 要不要顯示按鈕
  showBtn: Boolean,
  // api資料
  detailData: {
    type: Array,
    required: true,
    default: [],
  },
})
// 自製折疊面板的高度css in js 變數

const select = ref('all')
const currentIndex = ref(0)
const currentPage = computed(() => currentIndex.value + 1)
const pageTotal = computed(() => props.detailData.length)

// 選擇按鈕類型
const state = reactive({
  tabList: [
    { value: 'all', title: '全部', bg: '#fff', color: '#044d80' },
    { value: 'D', title: '常溫', bg: '#6dbe5b', color: '#fff' },
    { value: 'C', title: '冷藏', bg: '#086eb6', color: '#fff' },
    { value: 'F', title: '冷凍', bg: '#044d80', color: '#fff' },
  ],
})
const collapseActiveNames = ref(props.detailData[currentIndex.value].items.filter((v) => v.data).map((v) => v.name))

const data = computed(() => props.detailData)

const selectDetailData = computed(() => data.value[currentIndex.value])

let _filterDeliveriesItems = ref([])

const filterData = computed({
  get() {
    const filterByActiveTemperature = (item) => {
      if (select.value === 'all') return true
      return item.temp_zone === select.value
    }

    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    _filterDeliveriesItems.value = selectDetailData.value.items.filter(filterByActiveTemperature)
    return _filterDeliveriesItems.value
  },
  set(val) {
    _filterDeliveriesItems.value = [...val]
  },
})

// watch(
//   () => data.value,
//   (newVal, oldVal) => {
//     console.log(newVal)
//     if (oldVal) {
//       console.log(oldVal[0].items.map((v) => v.name))
//       collapseActiveNames.value = oldVal[currentIndex].items.map((v) => v.name)
//     }
//   },
// )

// watch(
//   () => collapseActiveNames.value,
//   (newVal, oldVal) => {
//     console.log(newVal)
//   },
// )

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
const handleTab = (id) => {
  select.value = id
}

const handleToAbnormalPage = (id) => () => {
  alert('abnormal' + id)
}

const handleToAbnormalOPage = (id) => () => {
  alert('abnormal O')
}
</script>

<template>
  <!-- 頁籤 -->
  <div class="flex justify-center items-center">
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
  </div>
  <!-- 過濾資料按鈕 -->
  <div class="flex justify-center items-center">
    <ul class="w-full h-7 mb-5 flex items-center justify-between">
      <li
        v-for="tab in state.tabList"
        :key="tab.value"
        class="w-16 h-full text-[0.875rem] font-bold flex justify-center items-center rounded-full"
        :class="{ 'tab-active': select === tab.value }"
        :style="{ background: tab.bg, color: tab.color }"
        @click="handleTab(tab.value)"
      >
        {{ tab.title }}
      </li>
    </ul>
  </div>

  <!-- table內容 -->
  <div class="rounded-[20px] border border-solid border-gray-300 overflow-hidden">
    <div class="bg-white vflex border-b-0 px-[20px] py-[15px] justify-between items-center">
      <div>
        <div class="flex text-primary gap-4 mb-5">
          <div class="font-bold">{{ props.title }}</div>
          <div>{{ selectDetailData.no }}</div>
        </div>
        <div class="flex items-center gap-2">
          <img class="w-[20px]" src="/dispatching_calendar.png" alt="icon" />
          <div class="bg-[#f2f2f2] text-gray px-3 py-1">{{ selectDetailData.date }}</div>
        </div>
      </div>
    </div>

    <Collapse v-model="collapseActiveNames">
      <CollapseItem :readonly="item.data ? false : true" v-for="item in filterData" :key="item.id" :name="item.name">
        <template #title>
          <div class="flex gap-4 px-5">
            <div class="w-full">
              <div class="text-primary font-bold">{{ item.name }}</div>
              <div class="text-gray text-[12px]">{{ item.no }}</div>
              <div class="flex justify-between text-[12px] px-5">
                <div class="text-primary font-bold">{{ item.ctn_qty }}</div>
                <div>{{ item.unit }}</div>
                <div class="text-primary font-bold">{{ item.set_qty }}</div>
                <div>{{ item.set_unit }}</div>
                <div class="text-primary font-bold">{{ item.pcs_qty }}</div>
                <div>{{ item.pcs_unit }}</div>
              </div>
            </div>
          </div>
        </template>
        <li
          v-for="subitem in item.data"
          :key="subitem.id"
          class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray"
          :onClick="handleToAbnormalPage(subitem.id)"
        >
          <div class="bg-[#f2f2f2] w-full" v-for="(subitem, index) in item.data" :key="subitem.id">
            <div class="flex">
              <div class="text-[12px] py-5 px-5">
                <div
                  class="w-[20px] h-[20px] bg-primary flex rounded-full text-white font-bold items-center justify-center"
                >
                  {{ subitem.code }}
                </div>
              </div>
              <div class="w-full">
                <div class="py-3">
                  <div class="flex text-gray text-[12px] mb-5 gap-12">
                    <div>{{ subitem.exp }}</div>
                    <div>#{{ subitem.batch_no }}</div>
                    <div>{{ subitem.tag }}</div>
                  </div>

                  <div class="flex justify-between text-[12px] px-5 mr-5">
                    <div class="text-primary font-bold">{{ subitem.qty }}</div>
                    <div>{{ subitem.unit }}</div>
                    <div class="text-primary font-bold">{{ subitem.set_qty }}</div>
                    <div>{{ subitem.set_unit }}</div>
                    <div class="text-primary font-bold">{{ subitem.pcs_qty }}</div>
                    <div>{{ subitem.pcs_unit }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-show="!(item.data.length - 1 == index)"
              class="w-[90%] border-solid border-x-0 border-t-0 mx-auto"
            ></div>
          </div>
        </li>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter-to {
  margin-top: 0px;
}

.active {
  border: solid 2px #eb5e55;
}

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
