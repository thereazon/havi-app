<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Switch, Icon, Uploader, Field } from 'vant'
import useCommonStore from '@/common/useCommonStore'

const props = defineProps({
  reason: {
    type: Object,
  },
  deleteReason: Function,
})

const commonStore = useCommonStore()
const emit = defineEmits(['update:reason'])

const toggleSet = ref(false)
const togglePcs = ref(false)

const theReason = computed({
  get: () => props.reason,
  set: (value) => emit('update:reason', value),
})

const handleToggleSet = () => {
  toggleSet.value = !toggleSet.value
  theReason.value.set_qty = null
}

const handleTogglePcs = () => {
  togglePcs.value = !togglePcs.value
  theReason.value.pcs_qty = null
}

watch(
  () => toggleSet.value,
  () => {
    exReason.set_qty = null
  },
)

watch(
  () => togglePcs.value,
  () => {
    exReason.pcs_qty = null
  },
)
const exReason = reactive({
  id: uuidv4(),
  selectReason: 'AL6003f27223c0b',
  unit: null,
  set_qty: null,
  pcs_qty: null,
  note: '',
  file: null,
})

const handleUploader = (value) => {
  if (props.reason.file.length === 0) {
    theReason.value.file = value.filter((v, i) => i < 3)
  } else {
    theReason.value.file = value.filter((v, i) => i >= props.reason.file.length && i <= props.reason.file.length + 2)
  }
}
</script>
<template>
  <div
    class="text-gray text-[13px] flex flex-col items-center shadow-[0_2px_10px_0_gray] border-gray border-solid bg-white rounded-[20px] px-[23px] pt-[23px] pb-[16px]"
  >
    <div class="mb-3 flex items-center justify-center w-full relative">
      <div class="mb-[13px]">異常原因</div>
      <div class="absolute top-0 right-0">
        <button @click="deleteReason" class="rounded-full bg-transparent border-warning border-solid text-warning px-3">
          刪除
        </button>
      </div>
    </div>
    <select v-model="theReason.selectReason" class="w-full border-dashed p-5 text-gray bg-[#fffcf6] mb-4" id="">
      <option v-for="reason in commonStore.abnormalReasons" :key="reason.id" :value="reason.id">
        {{ reason.code + ' ' + reason.content }}
      </option>
    </select>
    <div class="mt-[23px] mb-[13px]">異常數量</div>
    <div class="grid grid-cols-6 w-full mb-[9px] items-center">
      <div class="text-[15px] col-span-1">箱</div>
      <Field v-model="theReason.unit" type="digit" class="havi-input col-span-4" />
    </div>
    <div class="grid grid-cols-6 w-full items-center mb-[9px]">
      <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !toggleSet }">內包</div>
      <Field v-model="theReason.set_qty" :disabled="!toggleSet" type="digit" class="havi-input col-span-4" />
      <Switch
        @update:model-value="handleToggleSet"
        :model-value="toggleSet"
        active-color="#6dbe5b"
        size="15px"
        class="mx-auto"
      ></Switch>
    </div>
    <div class="grid grid-cols-6 w-full items-center mb-[9px]">
      <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !togglePcs }">零散</div>
      <Field v-model="theReason.pcs_qty" :disabled="!togglePcs" type="digit" class="havi-input col-span-4" />
      <Switch
        @update:model-value="handleTogglePcs"
        :model-value="togglePcs"
        active-color="#6dbe5b"
        size="15px"
        class="mx-auto"
      ></Switch>
    </div>
    <p class="text-warning">圖片最多僅能上傳3張</p>
    <Uploader
      :deletable="false"
      multiple
      class="loader"
      :modelValue="theReason.file"
      @update:modelValue="handleUploader"
    >
      <div class="bg-[#fffcf6] border-dashed w-full py-2">
        <div class="flex justify-center gap-2">
          <Icon class="bg-gray rounded-full p-1" color="white" name="plus"></Icon>
          <div>選擇圖片</div>
        </div>
      </div>
    </Uploader>
    <div class="mt-[23px] mb-[13px]">備註原因</div>
    <textarea v-model="theReason.note" class="py-2 bg-[#fffcf6] border-dashed w-full"></textarea>
  </div>
</template>

<style>
.loader {
  width: 100%;
}
.van-uploader__wrapper {
  padding-top: 80px;
}
.van-uploader__input-wrapper {
  position: absolute;
  top: 10px;
  width: 100%;
}
</style>
