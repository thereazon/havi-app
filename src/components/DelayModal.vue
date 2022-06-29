<script setup>
import { Popup, Button } from 'vant'
import { computed, reactive } from 'vue'
import useCommonStore from '@/common/useCommonStore.js'

const emit = defineEmits(['update:isShow', 'confirm'])
const props = defineProps({
  title: String,
  subTitle: String,
  optionFirst: String,
  warning: String,
  isShow: Boolean,
})

const store = useCommonStore()
const form = reactive({
  reason_id: '',
  message: '',
})

const dataPassToParent = 'from child'

const isShow = computed({
  get: () => props.isShow,
  set: (val) => emit('update:isShow', val),
})
</script>
<template>
  <Popup class="rounded-[20px] w-[325px] h-[365px]" v-model:show="isShow">
    <div class="py-[26px] px-[36px]">
      <h1 class="text-center text-[#707070] text-[17px] mb-0">{{ props.title }}</h1>
      <h2 class="text-center text-[#a4a4a4] text-[12px]">{{ props.subTitle }}</h2>
      <form class="mt-3">
        <select
          name=""
          id="dispatch-no"
          class="bg-[#fffcf6] border-dashed border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 px-4 h-[36px]"
          v-model="form.reason_id"
        >
          <option disabled value="">{{ props.optionFirst }}</option>
          <option v-for="reason in store.undeliverableReasons" :value="reason.id" :key="reason.id">
            {{ reason.content }}
          </option>
        </select>

        <textarea
          class="border-dashed border-gray-300 bg-[#fffcf6] mt-3 w-[252px] h-[101px]"
          v-model="form.message"
          rows="5"
          maxlength="150"
        />
      </form>
      <div class="text-warning text-center mt-2 text-[13px]">{{ props.warning }}</div>
      <Button class="mt-2 text-white bg-success w-full" round @click="$emit('confirm', dataPassToParent)">完成</Button>
    </div>
  </Popup>
</template>

<!-- 
如何使用 DelayModal

import DelayModal from '@/components/DelayModal.vue'
import { ref } from 'vue'

const showDelayModal = ref(false)
const showUndeliverableModal = ref(false)

const openDelayModal = () => {
  showDelayModal.value = true
}

const openUndeliverableModal = () => {
  showUndeliverableModal.value = true
}

const confirmDelay = (data) => {
  showDelayModal.value = false
  console.log('confirm Delay', data)
}
const confirmUndeliverable = (data) => {
  showUndeliverableModal.value = false
  console.log('confirm Undeliverable', data)
}
<template>
  <div>
    <button @click="openDelayModal">延後配送</button>
    <button @click="openUndeliverableModal">攜回配銷中心</button>
    <DelayModal
      v-model:isShow="showDelayModal"
      title="延後配送"
      subTitle="請填寫延後配送原因"
      optionFirst="請選擇延後配送原因"
      warning="!請確認不再進行配送此單!"
      @confirm="confirmDelay"
    />
    <DelayModal
      v-model:isShow="showUndeliverableModal"
      title="攜回配銷中心"
      subTitle="請填寫無法配送原因"
      optionFirst="請選擇無法配送原因"
      warning="!確認後將此單延至最後一筆進行配送!"
      @confirm="confirmUndeliverable"
    />
  </div>
</template>

 -->
