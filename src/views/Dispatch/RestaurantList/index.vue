<script setup>
import { NavBar } from 'vant'
import { onMounted } from 'vue'
import useDispatchInfo from '@/views/Dispatch/store'

const dispatchStore = useDispatchInfo()
onMounted(() => {
  console.log(dispatchStore)
})
</script>

<template>
  <NavBar safe-area-inset-top fixed title="派工單id" />
  <div class="bg-main bg-opacity-5 h-screen">餐廳明細列表頁面</div>
</template>
