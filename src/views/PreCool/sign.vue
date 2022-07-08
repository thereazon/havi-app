<script setup>
import dayjs from 'dayjs'
import { reactive, ref, onMounted, computed } from 'vue'
import { Checkbox, CheckboxGroup, NavBar, Button } from 'vant'
import { useRouter } from 'vue-router'
import useDispatchInfo from '@/views/Dispatch/store'
import usePreCoolInfo from '@/views/PreCool/store'
import SignatureComponent from '@/components/SignatureComponent.vue'
import SecurityCodeDialog from '@/components/SecurityCodeDialog.vue'
import { useAlertModal } from '@/components/store/AlertModalStore'
import { isCanvasEmpty, getCanvasToImage } from '@/utils/canvas'

const modal = useAlertModal()
const checked = ref([])
const isCelsiusTemp = ref(false)
const state = reactive({
  freezing: '',
})

const isSecurityCodeDialog = ref(false)

const confirm = () => {
  isSecurityCodeDialog.value = true
}

const preCoolStore = usePreCoolInfo()
const dispatchStore = useDispatchInfo()

const router = useRouter()

onMounted(() => {
  if (!dispatchStore.dispatch) {
    router.back()
  }
})

const onClickLeft = () => {
  router.back()
}

const handleFinished = () => {
  const canvas = document.getElementById('canvas')
  if (isCanvasEmpty(canvas)) {
    modal.open({
      type: 'error',
      title: '錯誤',
      content: '櫃檯簽名為必填',
    })
  } else {
    preCoolStore.setSignImage(getCanvasToImage(canvas))
    router.back()
  }
}

const currentDate = dayjs().format('MM/DD/YYYY')
const currentTime = dayjs().format('HH:mm')

const isDisabled = computed(() => {
  if (checked.value.length !== 2) {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top left-arrow @click-left="onClickLeft" fixed title="櫃檯簽名"> </NavBar>
    <div class="px-[26px]">
      <div class="text-primary flex flex-col">
        <div class="text-[0.9375rem] mb-[4px] flex items-center">
          <span class="mr-[5px]">當前溫度</span>
        </div>
        <div class="text-[0.75rem] font-bold">
          <span class="mr-[10px]">{{ currentDate }}</span>
          <span>{{ currentTime }}</span>
        </div>
      </div>
      <div class="w-full my-1.5 flex justify-evenly items-center text-gray text-[0.75rem] font-bold">
        <span class="w-[16%]"></span>
        <div class="w-[42%] flex justify-center items-center">目前溫度</div>
        <div class="w-[18%] flex justify-center items-center">櫃台溫度</div>
      </div>
      <div
        class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
      >
        <span class="w-[16%] text-primary">冷凍品溫</span>
        <div class="w-[42%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
          {{
            preCoolStore.temperature && `${preCoolStore.temperature.c.frozen}°C/${preCoolStore.temperature.f.frozen}°F`
          }}
        </div>
        <div class="w-[18%] h-[50%] bg-[#f2f2f2] rounded-md flex justify-center items-center text-[#242424]">
          {{
            preCoolStore.currentTemp
              ? `${preCoolStore.temperature.c.frozen}°C/${preCoolStore.temperature.f.frozen}°F`
              : '-'
          }}
        </div>
      </div>
      <div class="mt-[37px] mb-4 flex justify-between items-center">
        <span class="text-primary text-[0.9375rem]">填寫溫度</span>
        <div
          class="w-[30%] h-[14px] text-[0.75rem] rounded-md bg-primary border-[3px] border-solid border-primary flex items-center"
          @click="isCelsiusTemp = !isCelsiusTemp"
        >
          <span
            class="w-[50%] h-full flex justify-center items-center"
            :class="[isCelsiusTemp ? 'text-white' : 'text-primary bg-white rounded-l-md']"
            >°C</span
          >
          <span
            class="w-[50%] h-full flex justify-center items-center"
            :class="[isCelsiusTemp ? 'text-primary bg-white rounded-r-md' : 'text-white']"
            >°F</span
          >
        </div>
      </div>
      <div
        class="w-full h-[42px] rounded-xl shadow-md bg-white flex justify-evenly items-center text-[0.75rem] font-bold mb-2.5 last:mb-0"
      >
        <span class="w-[16%] text-primary">冷凍品溫</span>
        <input
          class="w-[60%] h-[24px] py-0 px-1 border-0 text-center bg-[#f2f2f2] rounded-md text-[#242424]"
          v-model="state.freezing"
        />
      </div>
      <div class="w-full h-[42px] rounded-xl shadow-md bg-white flex items-center text-[0.75rem] font-bold">
        <CheckboxGroup v-model="checked" direction="horizontal">
          <Checkbox shape="square" name="pest">蟲鼠害確認</Checkbox>
          <Checkbox shape="square" name="clean">車廂清潔確認</Checkbox>
        </CheckboxGroup>
      </div>
      <SignatureComponent />
      <Button
        class="w-full mt-7 text-white font-bold text-[1.0625rem] bg-success rounded-full"
        :disabled="isDisabled"
        @click="handleFinished"
      >
        完成
      </Button>
      <SecurityCodeDialog v-model:isShowDialog="isSecurityCodeDialog" :isCloseOnClickOverlay="true" />
    </div>
  </div>
</template>

<style scoped>
:deep(.van-checkbox__label) {
  color: #086eb6 !important;
  font-size: 0.75rem;
  font-weight: bold;
}
:deep(.van-checkbox-group--horizontal) {
  width: 100%;
  justify-content: space-evenly;
}
:deep(.van-checkbox__icon .van-icon) {
  border: none;
  border-radius: 5px;
  background: #f2f2f2;
}
:deep(.van-checkbox__icon--checked .van-icon) {
  color: #6dbe5b;
}
</style>
