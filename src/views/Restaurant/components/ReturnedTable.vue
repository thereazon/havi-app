<script setup>
import { ref, reactive, computed } from 'vue'
import { Collapse, CollapseItem, Button, Icon, Toast } from 'vant'

import useRestaurant from '@/views/Restaurant/store'
import { useRouter, useRoute } from 'vue-router'

const restaurantStore = useRestaurant()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  title: String,
  detailData: {
    type: Array,
    required: true,
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
const collapseActiveNames = ref([])

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

const handleToDetailPage = (item, subItem) => () => {
  console.log(item)

  const currentReturned = {
    ...item,
    no: selectDetailData.value.no,
    return_no: item.no,
    date: selectDetailData.value.date,
    items: {
      ...subItem,
    },
  }
  restaurantStore.setCurrentReturned(currentReturned)
  restaurantStore.getReturnedDetailAction(subItem.id, () => {
    return router.push({
      path: '/restaurant/returned/detail',
      query: {
        ...route.query,
      },
    })
  })
}

const handleFinish = () => {
  const id = props.detailData[currentIndex.value].id
  restaurantStore.postReturnFinishAction(id)
}

const handleUpdateStatus = (type) => {
  const id = props.detailData[currentIndex.value].id
  const typeToZh = {
    1: '重新填寫',
    2: '全部不提',
  }
  restaurantStore.postReturnStatusAction(id, type).then(() => Toast({ message: typeToZh[type], position: 'bottom' }))
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
    <div class="flex border-b-0 px-[20px] py-[15px] justify-between items-center bg-white">
      <div>
        <div class="flex text-[14px] text-primary mb-4 items-center">
          <div class="font-bold">{{ props.title }}</div>
          <div>{{ selectDetailData.no }}</div>
        </div>
        <div class="flex items-center gap-2">
          <img class="w-[20px]" src="/dispatching_calendar.png" alt="icon" />
          <div class="bg-[#f2f2f2] text-gray p-1 text-[12px]">{{ selectDetailData.date }}</div>
        </div>
      </div>
      <div class="flex">
        <button class="text-warning border-0 bg-white rounded-[5px] text-[12px]" @click="() => handleUpdateStatus('2')">
          <Icon name="cross" color="#eb5e55" size="30" />
          <div>全部不提</div>
        </button>
        <button class="border-0 bg-white text-gray text-[12px]" @click="() => handleUpdateStatus('1')">
          <Icon name="replay" color="#707070" size="30" />
          <div>重新填寫</div>
        </button>
      </div>
    </div>
    <Collapse v-model="collapseActiveNames">
      <CollapseItem v-for="item in filterData" :key="item.id" :name="item.name">
        <template #title>
          <div class="flex gap-4">
            <div class="w-full">
              <div class="flex items-center">
                <div class="text-[12px] mr-5">
                  <div
                    class="w-[20px] h-[20px] bg-primary flex rounded-full text-white font-bold items-center justify-center"
                  >
                    {{ item.code }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-primary font-bold">
                    {{ item.name }}
                  </div>
                  <div class="text-gray text-[12px]">{{ item.no }}</div>
                  <div class="flex justify-between text-[12px] pr-5">
                    <div class="text-primary font-bold">{{ item.m_qty > 0 ? item.m_qty : item.qty }}</div>
                    <div>{{ item.unit }}</div>
                    <div class="text-primary font-bold">{{ item.m_set_qty > 0 ? item.m_set_qty : item.set_qty }}</div>
                    <div>{{ item.set_unit }}</div>
                    <div class="text-primary font-bold">{{ item.m_pcs_qty > 0 ? item.m_pcs_qty : item.pcs_qty }}</div>
                    <div>{{ item.pcs_unit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <li
          v-for="subitem in item.data"
          :key="subitem.id"
          class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray"
          :onClick="handleToDetailPage(item, subitem)"
        >
          <div class="bg-[#f2f2f2] w-full" v-for="(subitem, index) in item.data" :key="subitem.id">
            <div class="flex">
              <div class="w-full">
                <div class="flex items-center">
                  <div class="mr-5">
                    <div class="w-[20px] h-[20px]" />
                  </div>
                  <div class="flex-1">
                    <div class="flex text-gray text-[12px] mb-2 gap-12">
                      <div>{{ subitem.exp }}</div>
                      <div v-if="subitem.batch_no">#{{ subitem.batch_no }}</div>
                    </div>
                    <div class="flex justify-between text-[12px] mr-5">
                      <div class="text-primary font-bold">{{ subitem.m_qty > 0 ? subitem.m_qty : subitem.qty }}</div>
                      <div>{{ subitem.unit }}</div>
                      <div class="text-primary font-bold">
                        {{ subitem.m_set_qty > 0 ? subitem.m_set_qty : subitem.set_qty }}
                      </div>
                      <div>{{ subitem.set_unit }}</div>
                      <div class="text-primary font-bold">
                        {{ subitem.m_pcs_qty > 0 ? subitem.m_pcs_qty : subitem.pcs_qty }}
                      </div>
                      <div>{{ subitem.pcs_unit }}</div>
                    </div>
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
  <Button :onClick="handleFinish" class="bg-success mt-8" loading-type="spinner" round block type="success"
    >完成</Button
  >
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
