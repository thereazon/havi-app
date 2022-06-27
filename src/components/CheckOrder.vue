<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Collapse, CollapseItem } from 'vant'
import ConfirmDialog from './ConfirmDialog.vue'

const isConfirmDialog = ref(false)
const collapseActiveNames = ref([])
const pageSize = 5
const total = ref(0)
const currentPage = ref(1)
const pageTotal = computed(() => Math.ceil(total.value / pageSize))
const state = reactive({
  mockData: {
    order: '202020430',
    date: '02/06/2021',
    total: 8,
    currentPage: 1,
    list: [
      {
        id: 12345,
        name: '統一鮮乳籃',
        orderAmount: 24,
        BackingQty: 3,
        purchaseTotal: 23,
        returnTotal: 21,
        item: {
          shortQty: 1,
          backingQty: 3,
          returnQty: 20,
          recycleQty: 1,
        },
      },
      {
        id: 12346,
        name: '三加侖糖漿桶',
        orderAmount: 24,
        BackingQty: 3,
        purchaseTotal: 23,
        returnTotal: 21,
        item: {
          shortQty: 1,
          backingQty: 3,
          returnQty: 20,
          recycleQty: 1,
        },
      },
      {
        id: 12347,
        name: 'CO2桶（大）',
        orderAmount: 24,
        BackingQty: 3,
        purchaseTotal: 23,
        returnTotal: 21,
        item: {
          shortQty: 1,
          backingQty: 3,
          returnQty: 20,
          recycleQty: 1,
        },
      },
    ],
  },
})
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
const submit = () => {
  isConfirmDialog.value = false
}
onMounted(() => {
  total.value = state.mockData.total
  currentPage.value = state.mockData.currentPage
})
</script>

<template>
  <div class="h-screen bg-[#daf0ff] pt-[26px] px-5 flex flex-col items-center">
    <div class="w-full mb-5 rounded-[20px] shadow-lg overflow-hidden bg-white">
      <div class="p-5 text-[13px]">
        <div class="text-[#044d80] flex items-center mb-3">
          <div class="mr-5 font-bold">單號</div>
          <div>202020430-RE1</div>
        </div>
        <div class="flex items-center">
          <img class="w-[18px] mr-2" src="/dispatching_calendar.png" alt="icon" />
          <div class="text-gray bg-[#f2f2f2] px-2 py-1">11/23/2020</div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="flex gap-1 text-primary font-bold text-[15px] p-5">
        <div class="basis-[10%] p-1 bg-[#f2f2f2] rounded-l-lg">MD</div>
        <div class="basis-[45%] p-1 text-center bg-[#f2f2f2]">00000330</div>
        <div class="basis-[45%] p-1 text-center bg-[#f2f2f2] rounded-r-lg">南崁中正</div>
      </div>
    </div>

    <div class="w-[50%] h-8 flex justify-between items-center mb-5">
      <div class="w-8 h-full rounded-full bg-white" @click="prevPage()"></div>
      <div
        class="w-16 h-6 text-[0.875rem] rounded-full bg-white text-primary border border-solid border-primary flex justify-center items-center"
      >
        {{ currentPage }} / {{ pageTotal }}
      </div>
      <div class="w-8 h-full rounded-full bg-white" @click="nextPage()"></div>
    </div>

    <div class="w-full rounded-xl shadow-md bg-white">
      <div class="flex flex-col justify-between box-border h-20 px-5 py-4 text-[0.8125rem]">
        <div class="flex items-center text-[#044d80]">
          <span class="mr-[10px]">送貨單號</span>
          <span>{{ state.mockData.order }}</span>
        </div>
        <div class="flex items-center text-gray">
          <img src="dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
          <div class="bg-[#f2f2f2] w-24 h-5 pl-2 flex items-center">{{ state.mockData.date }}</div>
        </div>
      </div>

      <Collapse v-model="collapseActiveNames">
        <CollapseItem v-for="container in state.mockData.list" :key="container.id" :name="container.id">
          <template #title>
            <div class="flex items-center">
              <div class="w-[50%] flex flex-col">
                <span class="text-[#044d80] text-[0.8125rem] font-bold truncate">{{ container.name }}</span>
                <span class="text-gray text-[0.75rem]">訂貨：{{ container.orderAmount }}</span>
              </div>
              <div class="w-[50%] flex justify-between items-center">
                <div class="flex flex-col items-center text-gray">
                  <span class="text-[0.8125rem] font-bold">{{ container.BackingQty }}</span>
                  <span class="text-[0.75rem]">墊底</span>
                </div>
                <div class="flex flex-col items-center text-primary">
                  <span class="text-[0.8125rem] font-bold">{{ container.purchaseTotal }}</span>
                  <span class="text-[0.75rem]">餐廳進貨</span>
                </div>
                <div class="flex flex-col items-center text-success">
                  <span class="text-[0.8125rem] font-bold">{{ container.returnTotal }}</span>
                  <span class="text-[0.75rem]">餐廳退回</span>
                </div>
              </div>
            </div>
          </template>

          <div class="h-9 flex items-center mx-4 border-0 border-b border-solid border-gray">
            <div class="h-5 pl-2 mr-5 font-bold text-primary flex items-center">
              <span class="text-[0.8125rem] mr-1">墊底</span>
              <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                {{ container.item.backingQty }}
              </div>
            </div>
            <div class="h-5 font-bold text-warning flex items-center">
              <span class="text-[0.8125rem] mr-1">短收</span>
              <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                {{ container.item.shortQty }}
              </div>
            </div>
          </div>
          <div class="h-9 flex items-center mx-4">
            <div class="h-5 pl-2 mr-5 font-bold text-success flex items-center">
              <span class="text-[0.8125rem] mr-1">回收</span>
              <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                {{ container.item.recycleQty }}
              </div>
            </div>
            <div class="h-5 font-bold text-warning flex items-center">
              <span class="text-[0.8125rem] mr-1">退貨</span>
              <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                {{ container.item.returnQty }}
              </div>
            </div>
          </div>
        </CollapseItem>
      </Collapse>
    </div>

    <div class="w-full mt-9 flex justify-between items-center font-bold text-white text-[1rem]">
      <button class="w-[48%] h-[43px] bg-success rounded-full border-0">完成</button>
      <button class="w-[48%] h-[43px] bg-warning rounded-full border-0" @click="isConfirmDialog = true">發送</button>
    </div>

    <ConfirmDialog v-model:isShowDialog="isConfirmDialog" :isCloseOnClickOverlay="true">
      <template v-slot:title>
        <div>是否要發送容器值到店家？</div>
      </template>
      <div class="px-10 text-warning text-[0.8125rem] font-bold mt-3 mb-5">
        發送後將無法再修改『容器值』數值，<br />
        發送後需等待1～5分鐘才會完成傳送！
      </div>
      <template v-slot:footer>
        <div class="px-[10%] flex justify-between items-center font-bold text-white text-[1rem]">
          <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">取消</button>
          <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="submit()">確認</button>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped>
.divide {
  width: 100%;
  height: 2px;
  background-image: linear-gradient(to right, #086eb6 0%, #086eb6 50%, transparent 50%);
  background-size: 35px 2px;
  background-repeat: repeat-x;
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
  padding: 0;
  background: #f2f2f2;
}
.detail-list {
  border-bottom: 1px solid #707070;
}
.detail-list:last-child {
  border-bottom: 0;
}
</style>
