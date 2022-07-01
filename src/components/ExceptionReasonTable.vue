<script setup>
import { reactive, watch, ref } from 'vue'
import { Switch } from 'vant'

const props = defineProps({
  finish: Boolean,
})

const emits = defineEmits(['update:data', 'delete:reason'])

const noset = ref(true)
const nopcs = ref(true)

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
  () => props.finish,
  () => {
    if (props.finish) emits('update:data', exReason)
  },
)

watch(
  () => noset.value,
  () => {
    exReason.set_qty = null
  },
)

watch(
  () => nopcs.value,
  () => {
    exReason.pcs_qty = null
  },
)
const exReason = reactive({
  selectReason: reasonData[0],
  unit: null,
  set_qty: null,
  pcs_qty: null,
  note: '',
})
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
      <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !noset }">內包</div>
      <input
        v-model="exReason.set_qty"
        :disabled="!noset"
        type="text"
        class="py-2 bg-[#fffcf6] border-dashed col-span-4"
      />
      <Switch v-model="noset" size="23px" class="mx-auto"></Switch>
    </div>
    <div class="grid grid-cols-6 w-full items-center mb-[9px]">
      <div class="text-[15px] col-span-1" :class="{ 'text-[#bbb]': !nopcs }">零散</div>
      <input
        v-model="exReason.pcs_qty"
        :disabled="!nopcs"
        type="text"
        class="py-2 bg-[#fffcf6] border-dashed col-span-4"
      />
      <Switch v-model="nopcs" size="23px" class="mx-auto"></Switch>
    </div>
    <div class="mt-[23px] mb-[13px]">備註原因</div>
    <textarea v-model="exReason.note" class="py-2 bg-[#fffcf6] border-dashed w-full"></textarea>
  </div>
</template>
