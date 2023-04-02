<script setup>
import { Popup, Button } from 'vant'
import { computed, watch, ref } from 'vue'

const emit = defineEmits(['update:isShow', 'confirm'])
const props = defineProps({
  title: String,
  isShow: Boolean,
  item: Object,
})

const isShow = computed({
  get: () => props.isShow,
  set: (val) => emit('update:isShow', val),
})

watch(() => isShow.value)

const handleFinish = () => {
  emit('confirm')
}
</script>
<template>
  <Popup class="rounded-[20px] w-[325px] py-[15px]" v-model:show="isShow">
    <div class="py-[5px] px-[2px]">
      <div class="grid grid-cols-11 gap-1 p-3">
        <div class="col-span-3">
          <div class="text-[#044d80] text-[12px]">{{ props.item.name }}</div>
          <div class="mt-1 text-gray text-[8px]">訂貨：{{ props.item.qty }}</div>
        </div>
        <div class="col-span-2 text-center text-gray">
          <div class="text-[13px]">{{ props.item.backing_qty }}</div>
          <div class="mt-1 text-[8px]">墊底</div>
        </div>
        <div class="col-span-2 text-center text-primary">
          <div class="text-[13px]">{{ props.item.purchase_total }}</div>
          <div class="mt-1 text-[8px]">餐廳進貨</div>
        </div>
        <div class="col-span-2 text-center text-success">
          <div class="text-[13px]">{{ props.item.return_total }}</div>
          <div class="mt-1 text-[8px]">餐廳退回</div>
        </div>
        <div class="col-span-2 text-center text-[#1bc5bd]">
          <div class="text-[13px]">{{ props.item.pallet_qty }}</div>
          <div class="mt-1 text-[8px]">裝車容器</div>
        </div>
      </div>
    </div>

    <div v-for="detail in props.item.detail" :key="detail.no" class="py-[5px] px-[2px] list">
      <div class="grid grid-cols-11 gap-1 p-3">
        <div class="col-span-3">
          <div class="text-[#044d80] text-[12px] font-bold">{{ detail.number }}</div>
          <div class="mt-1 text-gray text-[8px]">{{ detail.no }}</div>
        </div>
        <div class="col-span-2 text-center text-gray">
          <div class="text-[13px]">{{ detail.backing_qty }}</div>
          <div class="mt-1 text-[8px]">墊底</div>
        </div>
        <div class="col-span-2 text-center text-primary">
          <div class="text-[13px]">{{ detail.purchase_total }}</div>
          <div class="mt-1 text-[8px]">餐廳進貨</div>
        </div>
        <div class="col-span-2 text-center text-success">
          <div class="text-[13px]">{{ detail.return_total }}</div>
          <div class="mt-1 text-[8px]">餐廳退回</div>
        </div>
        <div class="col-span-2 text-center text-[#1bc5bd]">
          <div class="text-[13px]">{{ detail.qty }}</div>
          <div class="mt-1 text-[8px]">訂貨</div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-1 p-3">
        <div class="col-span-4 flex items-center">
          <div class="text-warning">短收</div>
          <div class="w-[46px] text-center bg-white ml-[5px]">{{ detail.short_qty }}</div>
        </div>
        <div class="col-span-4 flex">
          <div class="text-success">回收</div>
          <div class="w-[46px] text-center bg-white ml-[5px]">{{ detail.resource_qty }}</div>
        </div>
        <div class="col-span-4 flex">
          <div class="text-warning">退貨</div>
          <div class="w-[46px] text-center bg-white ml-[5px]">{{ detail.return_qty }}</div>
        </div>
      </div>
    </div>

    <div class="mt-5 px-[18px]">
      <Button class="text-white bg-success w-full" @click="handleFinish" round>返回</Button>
    </div>
  </Popup>
</template>

<style>
.list {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.47);
  background-color: #f2f8fb;
}
</style>
