<script setup>
import { Button, NavBar } from 'vant'
import { onMounted } from 'vue'
import usePallet from '@/views/Pallet/store'
import { useRoute, useRouter } from 'vue-router'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'
import ContainerOnloadList from '@/components/ContainerOnloadRecord/ContainerOnloadList.vue'

const palletStore = usePallet()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!palletStore.dispatch) {
    router.back()
  }
  palletStore.getPalletAuction(palletStore.dispatch.id)
})

const onClickLeft = () => {
  router.back()
}

const handleSubmit = () => {
  palletStore.postPalletAction(palletStore.dispatch.id).then(() => router.back())
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top left-arrow @click-left="onClickLeft" fixed title="容器裝車紀錄"> </NavBar>
    <div class="px-[26px]">
      <ContainerOnloadCard v-bind="palletStore.dispatch" class="mb-6"> </ContainerOnloadCard>
      <ContainerOnloadList :ingredientsList="palletStore.data" />
      <Button
        class="bg-success mt-28"
        loading-type="spinner"
        round
        block
        type="success"
        native-type="submit"
        @click.prevent="handleSubmit"
        >完成</Button
      >
    </div>
  </div>
</template>
