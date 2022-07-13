<script setup>
import { ref, reactive } from 'vue'
import { Icon } from 'vant'

defineProps({
  detailData: Array,
  number: Number,
  date: String,
})
const select = ref('')
const mtop = ref(null)

const allClear = () => {}
const reWrite = () => {}

const detailData = reactive([
  {
    id: '123',
    p: 'p3',
    name: '麥當勞冷凍麥克炸雞排',
    number: '120720',
    unitNum: 9,
    unit: '箱',
    inclusive: 23,
    scattered: 0,
    data: [
      {
        number: '120720',
        tag: '#12',
        unitNum: 9,
        unit: '箱',
        inclusive: 23,
        scattered: 0,
      },
      {
        number: '120720',
        tag: '#12',
        unitNum: 9,
        unit: '箱',
        inclusive: 23,
        scattered: 0,
      },
    ],
  },
  {
    id: '456',
    p: 'p3',
    name: '麥當勞冷凍麥克炸雞排',
    number: '120720',
    unitNum: 9,
    unit: '箱',
    inclusive: 23,
    scattered: 0,
    data: [
      {
        number: '120720',
        tag: '#12',
        unitNum: 9,
        unit: '箱',
        inclusive: 23,
        scattered: 0,
      },
      {
        number: '120720',
        tag: '#12',
        unitNum: 9,
        unit: '箱',
        inclusive: 23,
        scattered: 0,
      },
    ],
  },
])

const toggle = (item) => {
  select.value == item.id ? (select.value = '') : (select.value = item.id)

  mtop.value = `-${74 * item.data.length}px`
}
</script>

<template>
  <div class="mx-5 rounded-[20px] border-solid overflow-hidden">
    <div class="flex border-b-0 px-[20px] py-[15px] justify-between items-center">
      <div>
        <div class="flex text-primary gap-4 mb-5">
          <div class="font-bold">退貨單號</div>
          <div>{{ number }}</div>
        </div>
        <div class="flex items-center gap-2">
          <img class="w-[20px]" src="dispatching_calendar.png" alt="icon" />
          <div class="bg-[#f2f2f2] text-gray px-3 py-1">{{ date }}</div>
        </div>
      </div>
      <div class="flex gap-3">
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
    <div class="border-solid border-x-0 border-b-0" v-for="item in detailData" @click="toggle(item)" :key="item.id">
      <div class="flex gap-4 px-5">
        <div class="text-[12px] py-5">
          <div class="bg-primary rounded-full text-white font-bold p-2">{{ item.p }}</div>
        </div>
        <div class="w-full py-4">
          <div class="text-primary font-bold">{{ item.name }}</div>
          <div class="text-gray text-[12px] mb-5">{{ item.number }}</div>
          <div class="flex justify-between text-[12px] px-5">
            <div class="text-primary font-bold">{{ item.unitNum }}</div>
            <div>{{ item.unit }}</div>
            <div class="text-primary font-bold">{{ item.inclusive }}</div>
            <div>內包</div>
            <div class="text-primary font-bold">{{ item.scattered }}</div>
            <div>零散</div>
          </div>
        </div>
      </div>
      <div class="overflow-hidden">
        <transition name="slide">
          <div v-show="item.id == select">
            <div
              class="py-3 pl-16 pr-5 bg-[#f2f2f2] border-solid border-gray border-x-0 border-t-0 last:border-b-0"
              v-for="subitem in item.data"
              :key="subitem.id"
            >
              <div>
                <div class="flex text-gray text-[12px] mb-5 gap-12">
                  <div>{{ subitem.number }}</div>
                  <div>{{ subitem.tag }}</div>
                </div>

                <div class="flex justify-between text-[12px] px-5">
                  <div class="text-primary font-bold">{{ subitem.unitNum }}</div>
                  <div>{{ subitem.unit }}</div>
                  <div class="text-primary font-bold">{{ subitem.inclusive }}</div>
                  <div>內包</div>
                  <div class="text-primary font-bold">{{ subitem.scattered }}</div>
                  <div>零散</div>
                </div>
              </div>
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
  transition: all 0.9s ease;
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
</style>
