<script setup>
import { Popup, Divider, Checkbox } from 'vant'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  isShow: Boolean,
})
const emit = defineEmits(['update:isShow'])

const route = useRoute()

const router = useRouter()

const isShow = computed({
  get: () => props.isShow,
  set: (val) => emit('update:isShow', val),
})

/**
 * todo:
 *  path可加上對應路徑
 * 	check未來要接props進來的完成狀態
 * 	value未來要接props進來的單據數量
 */

const list = reactive([
  { check: true, text: '餐廳溫度確認', value: 1, path: '/temperature' },
  { check: false, text: '送貨單', value: 1, path: '/restaurant' },
  { check: false, text: 'OSnD單', value: 1, path: '/' },
  { check: false, text: '容器對點單', value: 1, path: '/' },
  { check: false, text: '退貨單', value: 1, path: '/' },
  { check: false, text: '餐廳簽收', value: 1, path: '/' },
])

const goto = (path) => {
  // 溫度未送出前不能點擊其他頁面
  if (list.value[0].check == false) return
  router.push({
    path: path,
  })
}
</script>

<!-- todo: checkBox完成的樣式,active上面會有border要拿掉 -->
<template>
  <Popup class="rounded-l-lg bg-gray h-[80%]" v-model:show="isShow" position="right">
    <div class="flex flex-col items-stretch text-[#cbcbcb]">
      <div class="text-white text-center my-[30px] text-[20px]">作業步驟</div>
      <Divider :dashed="true" class="mb-[35px] mt-0"></Divider>
      <a
        v-for="item in list"
        :class="{ active: item.path == route.path }"
        class="grid grid-cols-3 pr-[30px] text-[17px]"
        @click="goto(item.path)"
      >
        <Checkbox
          v-model="item.check"
          disabled
          checked-color="#6dbe5b"
          class="mx-[25px]"
          :class="{ finish: item.check }"
        ></Checkbox>
        <div
          :class="{ 'text-success': item.check }"
          class="py-[10px] col-span-2 border-t-0 border-x-0 border-solid border-white flex justify-between w-full"
        >
          <div class="mr-[60px]">{{ item.text }}</div>
          <div>{{ item.value }}</div>
        </div>
      </a>
    </div>
  </Popup>
</template>

<style lang="scss" scoped>
.active {
  @apply text-gray bg-white;
}
.finish {
  :deep(.van-checkbox__icon--disabled .van-icon) {
    background-color: #6dbe5b;
  }
}
</style>
