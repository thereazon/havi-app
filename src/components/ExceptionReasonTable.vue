<script setup>
import { reactive, watch, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Switch, Icon } from 'vant'

const uuid = uuidv4()

const props = defineProps({
  readyToPush: Boolean,
})

const emits = defineEmits(['update:data', 'delete:reason'])

const toggleSet = ref(true)
const togglePcs = ref(true)
const file = ref()
const fileStructure = reactive({
  fileName: '',
  base64: '',
  uploaded: false,
})

const reasonData = reactive([
  {
    id: 'AL12345',
    category: 0,
    code: 'F3',
    content: '廠商品質問題拒收',
  },
  {
    id: 'AL12347',
    category: 1,
    code: 'F2',
    content: '廠商品質問題拒收',
  },
  {
    id: 'AL12346',
    category: 2,
    code: 'F1',
    content: '廠商品質問題拒收',
  },
])

const remove = () => {
  emits('delete:reason')
}

watch(
  () => props.readyToPush,
  () => {
    if (props.readyToPush) emits('update:data', { data: exReason, img: fileStructure.base64 })
  },
)

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
  uuid: uuid,
  selectReason: reasonData[0],
  unit: null,
  set_qty: null,
  pcs_qty: null,
  note: '',
})

const dataURItoBlob = (dataURI) => {
  return fetch(dataURI).then((res) => res.blob())
}

const handleFileUpLoad = () => {
  fileStructure.fileName = file.value.files[0].name
  fileStructure.uploaded = true
  let oFReader = new FileReader()
  oFReader.onloadend = async function () {
    await dataURItoBlob(oFReader.result).then((res) => {
      fileStructure.base64 = res
    })
  }
  oFReader.readAsDataURL(file.value.files[0])
}
</script>
<template>
  <div
    class="text-gray text-[13px] flex flex-col items-center shadow-[0_2px_10px_0_gray] border-gray border-solid bg-white rounded-[20px] px-[23px] pt-[23px] pb-[16px]"
  >
    <div class="mb-3 flex items-center justify-center w-full relative">
      <div class="mb-[13px]">異常原因</div>
      <div class="absolute top-0 right-0">
        <button @click="remove" class="rounded-full bg-transparent border-warning border-solid text-warning px-3">
          刪除
        </button>
      </div>
    </div>
    <select v-model="exReason.selectReason" class="w-full border-dashed p-5 text-gray bg-[#fffcf6] mb-4" id="">
      <option v-for="reason in reasonData" :key="reason.id" :value="reason">
        {{ reason.code + ' ' + reason.content }}
      </option>
    </select>
    <div class="mt-[23px] mb-[13px]">異常數量</div>
    <div class="grid grid-cols-6 w-full mb-[9px] items-center">
      <div class="text-[15px] col-span-1">單位</div>
      <input v-model="exReason.unit" type="text" class="py-2 bg-[#fffcf6] border-dashed col-span-4" />
    </div>
    <div class="grid grid-cols-6 w-full items-center mb-[9px]">
      <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !toggleSet }">內包</div>
      <input
        v-model="exReason.set_qty"
        :disabled="!toggleSet"
        type="text"
        class="py-2 bg-[#fffcf6] border-dashed col-span-4"
      />
      <Switch v-model="toggleSet" active-color="#6dbe5b" size="15px" class="mx-auto"></Switch>
    </div>
    <div class="grid grid-cols-6 w-full items-center mb-[9px]">
      <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !togglePcs }">零散</div>
      <input
        v-model="exReason.pcs_qty"
        :disabled="!togglePcs"
        type="text"
        class="py-2 bg-[#fffcf6] border-dashed col-span-4"
      />
      <Switch v-model="togglePcs" active-color="#6dbe5b" size="15px" class="mx-auto"></Switch>
    </div>
    <button class="bg-[#fffcf6] border-dashed w-full py-4 mt-[23px]" @click="$refs.file.click()">
      <div v-if="!fileStructure.uploaded" class="flex justify-center gap-2">
        <Icon class="bg-gray rounded-full p-1" color="white" name="plus"></Icon>
        <div>選擇圖片</div>
      </div>
      <div v-else>{{ fileStructure.fileName }}</div>
    </button>
    <input type="file" ref="file" class="hidden" @change="handleFileUpLoad" />
    <div class="mt-[23px] mb-[13px]">備註原因</div>
    <textarea v-model="exReason.note" class="py-2 bg-[#fffcf6] border-dashed w-full"></textarea>
  </div>
</template>
