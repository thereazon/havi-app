<script setup>
import { computed, reactive, ref } from 'vue'
import { Collapse, CollapseItem, Dialog, Button, Icon, Loading, Field } from 'vant'
import { storeToRefs } from 'pinia'
import useRestaurant from '@/views/Restaurant/store'
import { useAlertModal } from '@/components/store/AlertModalStore'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const VanDialog = Dialog.Component
const { containers, isLoading } = storeToRefs(useRestaurant())
const { setContainersAction, postContainerFinishAction, postContainerSendAction } = useRestaurant()
const modal = useAlertModal()
const isConfirmDialog = ref(false)
const isConfirmDialog2 = ref(false)
const collapseActiveNames = ref([])
const pageSize = 1
const dataIndex = ref(0)
const currentPage = computed(() => dataIndex.value + 1)
const pageTotal = computed(() => Math.ceil(containers.value.length / pageSize))
const showInputDialog = ref(false)
const inputDialogTitle = ref('')
const initialContainerForm = {
  id: '',
  qty: 0,
  backing_qty: 0,
  short_qty: 0,
  resource_qty: 0,
  return_qty: 0,
}
const containerForm = reactive({ ...initialContainerForm })
const showAlert = (content) => {
  modal.open({
    type: 'hint',
    title: '提醒',
    content: content,
  })
}

const openInputDialog = (container) => {
  showInputDialog.value = true
  inputDialogTitle.value = container.name
  const { id, backing_qty, short_qty, resource_qty, return_qty, qty } = container
  const form = { id, backing_qty, short_qty, resource_qty, return_qty, qty }
  Object.assign(containerForm, form)
}
const submitContainerCount = () => {
  const shortQty = Number(containerForm.short_qty)
  if (shortQty > containerForm.qty) {
    showAlert('短收不可大於訂貨量')
    return
  }
  setContainersAction(containerForm, dataIndex.value)
  showInputDialog.value = false
}
const closeInputDialog = () => {
  Object.assign(containerForm, initialContainerForm)
}
const prevPage = () => {
  if (currentPage.value === 1) {
    return
  } else {
    dataIndex.value -= 1
  }
}
const nextPage = () => {
  if (currentPage.value === pageTotal.value) {
    return
  } else {
    dataIndex.value += 1
  }
}
const submit = (containerOrderId) => {
  isConfirmDialog.value = false
  postContainerSendAction(containerOrderId)
}
const confirm = (containerOrder) => {
  isConfirmDialog2.value = false
  postContainerFinishAction(containerOrder)
}
</script>

<template>
  <div class="mt-5">
    <Loading class="flex justify-center" v-if="isLoading" />
    <div class="flex flex-col items-center" v-if="containers.length !== 0">
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
          class="w-16 h-5 text-[0.875rem] rounded-full bg-white text-primary border border-solid border-primary flex justify-center items-center"
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

      <div class="w-full rounded-xl shadow-md bg-white">
        <div class="flex flex-col justify-between box-border h-20 px-5 py-4 text-[0.8125rem]">
          <div class="flex items-center text-[#044d80] font-bold">
            <span class="mr-[10px]">送貨單號</span>
            <span>{{ containers[dataIndex].no }}</span>
          </div>
          <div class="flex items-center text-gray">
            <img src="/dispatching_calendar.png" class="w-4 h-4 mr-2" alt="" />
            <div class="bg-[#f2f2f2] w-24 h-5 pl-2 flex items-center">{{ containers[dataIndex].date }}</div>
          </div>
        </div>

        <Collapse v-model="collapseActiveNames">
          <CollapseItem v-for="container in containers[dataIndex].items" :key="container.id" :name="container.id">
            <template #title>
              <div class="flex items-center">
                <div class="w-[50%] flex flex-col">
                  <span class="text-[#044d80] text-[0.8125rem] font-bold truncate">{{ container.name }}</span>
                  <span class="text-gray text-[0.75rem]">訂貨：{{ container.qty }}</span>
                </div>
                <div class="w-[50%] flex justify-between items-center">
                  <div class="flex flex-col items-center text-gray">
                    <span class="text-[0.8125rem] font-bold">{{ container.backing_qty }}</span>
                    <span class="text-[0.75rem]">墊底</span>
                  </div>
                  <div class="flex flex-col items-center text-primary">
                    <span class="text-[0.8125rem] font-bold">{{ container.purchase_total }}</span>
                    <span class="text-[0.75rem]">餐廳進貨</span>
                  </div>
                  <div class="flex flex-col items-center text-success">
                    <span class="text-[0.8125rem] font-bold">{{ container.return_total }}</span>
                    <span class="text-[0.75rem]">餐廳退回</span>
                  </div>
                </div>
              </div>
            </template>

            <div
              class="h-9 flex items-center mx-4 border-0 border-b border-solid border-gray"
              @click="openInputDialog(container)"
            >
              <div class="h-5 pl-2 mr-5 font-bold text-primary flex items-center">
                <span class="text-[0.8125rem] mr-1">墊底</span>
                <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                  {{ container.backing_qty }}
                </div>
              </div>
              <div class="h-5 font-bold text-warning flex items-center">
                <span class="text-[0.8125rem] mr-1">短收</span>
                <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                  {{ container.short_qty }}
                </div>
              </div>
            </div>
            <div class="h-9 flex items-center mx-4">
              <div class="h-5 pl-2 mr-5 font-bold text-success flex items-center">
                <span class="text-[0.8125rem] mr-1">回收</span>
                <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                  {{ container.resource_qty }}
                </div>
              </div>
              <div class="h-5 font-bold text-warning flex items-center">
                <span class="text-[0.8125rem] mr-1">退貨</span>
                <div class="w-12 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
                  {{ container.return_qty }}
                </div>
              </div>
            </div>
          </CollapseItem>
        </Collapse>
      </div>

      <div class="w-full pt-9 pb-9 flex justify-between items-center font-bold text-white text-[1rem]">
        <button class="w-[48%] h-[43px] bg-success rounded-full border-0" @click="isConfirmDialog2 = true">完成</button>
        <button class="w-[48%] h-[43px] bg-warning rounded-full border-0" @click="isConfirmDialog = true">發送</button>
      </div>

      <!-- 輸入容器數量的彈窗 -->
      <van-dialog
        v-model:show="showInputDialog"
        closeOnClickOverlay
        :showConfirmButton="false"
        @close="closeInputDialog"
      >
        <div class="text-gray text-[1.25rem] font-bold text-center">{{ inputDialogTitle }}</div>
        <div class="text-gray text-[0.875rem] text-center mb-3">請填寫數據</div>
        <div class="border-0 border-b border-solid border-gray">
          <div class="h-7 font-bold text-primary flex items-center justify-center mb-1">
            <span class="text-[1rem] mr-5">墊底</span>
            <div class="w-1/2 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
              <input
                class="w-full h-full py-0 px-1 border border-solid border-gray"
                type="number"
                v-model="containerForm.backing_qty"
              />
            </div>
          </div>
          <div class="h-7 font-bold text-warning flex items-center justify-center mb-3">
            <span class="text-[1rem] mr-5">短收</span>
            <div class="w-1/2 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
              <input
                class="w-full h-full py-0 px-1 border border-solid border-gray"
                v-model="containerForm.short_qty"
                type="number"
              />
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="h-7 font-bold text-success flex items-center justify-center mb-1">
            <span class="text-[1rem] mr-5">回收</span>
            <div class="w-1/2 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
              <input
                class="w-full h-full py-0 px-1 border border-solid border-gray"
                v-model="containerForm.resource_qty"
                type="number"
              />
            </div>
          </div>
          <div class="h-7 font-bold text-warning flex items-center justify-center">
            <span class="text-[1rem] mr-5">退貨</span>
            <div class="w-1/2 h-full bg-white text-[0.75rem] rounded-md flex justify-center items-center">
              <input
                class="w-full h-full py-0 px-1 border border-solid border-gray"
                v-model="containerForm.return_qty"
                type="number"
              />
            </div>
          </div>
        </div>
        <button
          class="w-full h-[43px] bg-success rounded-full border-0 font-bold text-white text-[1rem] mt-3"
          @click="submitContainerCount()"
        >
          確認
        </button>
      </van-dialog>

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
            <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog = false">
              取消
            </button>
            <button
              class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0"
              @click="submit(containers[dataIndex].id)"
            >
              確認
            </button>
          </div>
        </template>
      </ConfirmDialog>

      <ConfirmDialog v-model:isShowDialog="isConfirmDialog2" :isCloseOnClickOverlay="true">
        <template v-slot:title>
          <div className="mb-20">
            請確認是否完成容器對點單，點 <br />擊確認後將
            <span class="text-warning"> 『無法再異動』</span>
          </div>
        </template>
        <template v-slot:footer>
          <div class="px-[10%] flex justify-between items-center font-bold text-white text-[1rem]">
            <button class="w-[48%] h-[43px] bg-gray rounded-full border-0" @click="isConfirmDialog2 = false">
              取消
            </button>
            <button class="w-[48%] h-[43px] bg-[#eb5e55] rounded-full border-0" @click="confirm(containers[dataIndex])">
              確認
            </button>
          </div>
        </template>
      </ConfirmDialog>
    </div>
  </div>
</template>

<style scoped>
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
:deep(.van-collapse-item:last-child > .van-collapse-item__wrapper > .van-collapse-item__content) {
  border-radius: 0 0 0.75rem 0.75rem;
}
.detail-list {
  border-bottom: 1px solid #707070;
}
.detail-list:last-child {
  border-bottom: 0;
}
:deep(.van-dialog) {
  padding: 1rem;
}
</style>
