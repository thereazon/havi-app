<script setup>
import { Button, NavBar } from 'vant'
import { onMounted } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'

const dispatchStore = useDispatchInfo()
onMounted(() => {
  console.log(dispatchStore)
})
</script>

<template>
  <NavBar safe-area-inset-top fixed title="派工單" />
  <div class="bg-main bg-opacity-5 h-screen">
    <ContainerOnloadCard v-for="dispatch in dispatchStore.dispatchs" :key="dispatch.id" v-bind="dispatch">
      <div class="flex justify-around w-100 bg-white p-4">
        <Button
          size="mini"
          round
          plain
          type="primary"
          class="border-2 border-solid border-primary text-primary px-3 py-1"
        >
          預冷溫度
        </Button>
        <Button size="mini" round class="border-2 border-solid border-emerald-500 bg-emerald-500 text-white px-3 py-1">
          容器裝車紀錄
        </Button>
        <Button size="mini" round class="border-2 border-solid border-neutral-500 bg-neutral-500 text-white px-3 py-1">
          餐廳明細
        </Button>
      </div>
    </ContainerOnloadCard>
  </div>
</template>
