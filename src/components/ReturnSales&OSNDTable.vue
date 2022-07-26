<script setup>
import { ref, reactive, computed } from 'vue'
import { Icon } from 'vant'

defineProps({
  // table標題
  title: String,
  // osnd單與退貨單header區別 -> 要不要顯示按鈕
  showBtn: Boolean,
  // api資料
  detailData: Array,
})

// 自製折疊面板的高度css in js 變數
const mtop = ref(null)

const select = ref('A')

const currentPage = ref(1)
const pageTotal = computed(() => detailData.length)

// 選擇按鈕類型
const status = reactive([
  { name: '全部', temp_zone: 'A', color: 'white', text: '#044d80' },
  { name: '常溫', temp_zone: 'F', color: 'success', text: 'white' },
  { name: '冷藏', temp_zone: 'C', color: 'primary', text: 'white' },
  { name: '冷凍', temp_zone: 'D', color: '#044d80', text: 'white' },
])

// api假資料
const detailData = reactive([
  {
    id: '123',
    date: '11/23/2020',
    no: '123',
    items: [
      {
        code: 'P1',
        no: '90830101',
        name: '5加崙糖漿桶',
        temp_zone: 'D',
        qty: 1,
        set_qty: 0,
        pcs_qty: 0,
        m_qty: 1,
        m_set_qty: 0,
        m_pcs_qty: 0,
        unit: '箱',
        set_unit: '內包',
        pcs_unit: '零散',
        data: [
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
        ],
      },
      {
        code: 'P1',
        no: '90830101',
        name: '5加崙糖漿桶',
        temp_zone: 'D',
        qty: 1,
        set_qty: 0,
        pcs_qty: 0,
        m_qty: 1,
        m_set_qty: 0,
        m_pcs_qty: 0,
        unit: '箱',
        set_unit: '內包',
        pcs_unit: '零散',
        data: [
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
        ],
      },
    ],
  },
  {
    id: '123',
    date: '11/23/2020',
    no: '456',
    items: [
      {
        code: 'P1',
        no: '90830101',
        name: '5加崙糖漿桶',
        temp_zone: 'F',
        qty: 1,
        set_qty: 0,
        pcs_qty: 0,
        m_qty: 1,
        m_set_qty: 0,
        m_pcs_qty: 0,
        unit: '箱',
        set_unit: '內包',
        pcs_unit: '零散',
        data: [
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
        ],
      },
      {
        code: 'P1',
        no: '90830101',
        name: '5加崙糖漿桶',
        temp_zone: 'C',
        qty: 1,
        set_qty: 0,
        pcs_qty: 0,
        m_qty: 1,
        m_set_qty: 0,
        m_pcs_qty: 0,
        unit: '箱',
        set_unit: '內包',
        pcs_unit: '零散',
        data: [
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
          {
            id: 'BLI6075347850649',
            batch_no: '123545',
            tag: '#12',
            exp: '',
            qty: 1,
            set_qty: 0,
            pcs_qty: 0,
            m_qty: 1,
            m_set_qty: 0,
            m_pcs_qty: 0,
            unit: '箱',
            set_unit: '內包',
            pcs_unit: '零散',
          },
        ],
      },
    ],
  },
])

// 當前頁面資料
const selectDetailData = computed(() => detailData[currentPage.value - 1])

const filterData = computed(() => {
  if (select.value == 'A') {
    return selectDetailData.value.items
  } else {
    return selectDetailData.value.items.filter((item) => item.temp_zone == select.value)
  }
})

// 這兩個function還不確定功能先寫起來放
const allClear = () => {}
const reWrite = () => {}

const prevPage = () => {
  if (currentPage.value == 1) return
  currentPage.value--
}
const nextPage = () => {
  if (currentPage.value == pageTotal.value) return
  currentPage.value++
}

// 自製折疊面板function
const toggle = (item) => {
  item.select == true ? (item.select = false) : (item.select = true)

  mtop.value = `-${74 * item.data.length}px`
}
</script>

<template>
  <!-- 頁籤 -->
  <div class="mb-5 flex justify-center">
    <div class="flex justify-between items-center gap-3">
      <div class="rounded-full py-1 px-2 bg-white" @click="prevPage()">
        <Icon name="arrow-left" color="#044d80" size="10" />
      </div>
      <div
        class="w-16 h-6 border-2 text-[0.875rem] rounded-full bg-white text-primary border-solid border-primary flex justify-center items-center"
      >
        {{ currentPage }} / {{ pageTotal }}
      </div>
      <div class="rounded-full py-1 px-2 bg-[#044d80]" @click="nextPage()">
        <Icon name="arrow" color="#fff" size="10" />
      </div>
    </div>
  </div>
  <!-- 過濾資料按鈕 -->
  <div class="flex mx-10 gap-3 mb-5">
    <button
      class="rounded-full basis-1/4 text-[12px] py-2"
      :class="[
        { active: select == item.temp_zone },
        { 'border-0': select != item.temp_zone },
        `bg-${item.color}`,
        `bg-[${item.color}]`,
        `text-${item.text}`,
        `text-[${item.text}]`,
      ]"
      v-for="(item, index) in status"
      :key="index"
      @click="select = item.temp_zone"
    >
      {{ item.name }}
    </button>
  </div>
  <!-- table內容 -->
  <div class="mx-5 rounded-[20px] border-solid overflow-hidden">
    <div class="flex border-b-0 px-[20px] py-[15px] justify-between items-center">
      <div>
        <div class="flex text-primary gap-4 mb-5">
          <div class="font-bold">{{ title }}</div>
          <div>{{ selectDetailData.no }}</div>
        </div>
        <div class="flex items-center gap-2">
          <img class="w-[20px]" src="/dispatching_calendar.png" alt="icon" />
          <div class="bg-[#f2f2f2] text-gray px-3 py-1">{{ selectDetailData.date }}</div>
        </div>
      </div>
      <div v-if="showBtn" class="flex gap-3">
        <button
          class="m-auto text-warning border-0 shadow-md p-2 bg-white rounded-[20px] text-[12px]"
          @click="allClear"
        >
          <Icon name="cross" color="#eb5e55" size="35" />
          <div>全部不提</div>
        </button>
        <button class="m-auto border-0 shadow-md bg-white p-2 rounded-[20px] text-[12px] text-gray" @click="reWrite">
          <Icon name="replay" color="#707070" size="35" />
          <div>重新填寫</div>
        </button>
      </div>
    </div>
    <div class="border-solid border-x-0 border-b-0" v-for="item in filterData" @click="toggle(item)" :key="item.id">
      <div class="flex gap-4 px-5">
        <div class="text-[12px] py-5">
          <div class="bg-primary rounded-full text-white font-bold p-2">{{ item.code }}</div>
        </div>
        <div class="w-full py-4">
          <div class="text-primary font-bold">{{ item.name }}</div>
          <div class="text-gray text-[12px] mb-5">{{ item.no }}</div>
          <div class="flex justify-between text-[12px] px-5">
            <div class="text-primary font-bold">{{ item.qty }}</div>
            <div>{{ item.unit }}</div>
            <div class="text-primary font-bold">{{ item.set_qty }}</div>
            <div>{{ item.set_unit }}</div>
            <div class="text-primary font-bold">{{ item.pcs_qty }}</div>
            <div>{{ item.pcs_unit }}</div>
          </div>
        </div>
      </div>
      <!-- 折疊面板內容 -->
      <div class="overflow-hidden">
        <transition name="slide">
          <div v-show="item.select">
            <div class="bg-[#f2f2f2]" v-for="(subitem, index) in item.data" :key="subitem.id">
              <div class="flex">
                <div class="text-[12px] py-5 px-5">
                  <div class="bg-primary rounded-full text-white font-bold p-2">{{ item.code }}</div>
                </div>
                <div class="w-full">
                  <div class="py-3">
                    <div class="flex text-gray text-[12px] mb-5 gap-12">
                      <div>{{ subitem.batch_no }}</div>
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
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  margin-top: v-bind(mtop);
}

.slide-enter-to {
  margin-top: 0px;
}
.slide-leave-to {
  margin-top: v-bind(mtop);
}

.active {
  border: solid 2px #eb5e55;
}
</style>
