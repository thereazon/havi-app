<script setup>
import { Button, NavBar } from 'vant'
import { onMounted } from 'vue'
import usePallet from '@/views/Pallet/store'
import useDispatchInfo from '@/views/Dispatch/store'
import { useRouter, useRoute } from 'vue-router'
import ContainerOnloadCard from '@/components/ContainerOnloadRecord/ContainerOnloadCard.vue'
import ContainerOnloadList from '@/components/ContainerOnloadRecord/ContainerOnloadList.vue'
import { useAlertModal } from '@/components/store/AlertModalStore'

const palletStore = usePallet()
const modal = useAlertModal()
const dispatchStore = useDispatchInfo()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!dispatchStore.dispatch) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  } else {
    palletStore.getPalletAuction(dispatchStore.dispatch.id)
  }
})

const onClickLeft = () => {
  router.back()
}

const handleSubmit = () => {
  palletStore.postPalletAction(dispatchStore.dispatch.id).then(() => {
    modal.open({
      type: 'success', //required
      title: '成功',
      content: '裝車棧板已上傳成功',
      callback: () => router.back(),
    })
  })
}
</script>

<template>
  <div class="bg-primary/[.05] min-h-screen h-full pt-[46px] pb-[78px] box-border">
    <!-- 導航列 -->
    <NavBar safe-area-inset-top left-arrow @click-left="onClickLeft" fixed title="容器裝車紀錄"> </NavBar>
    <div v-if="dispatchStore.dispatch" class="px-[26px]">
      <ContainerOnloadCard v-bind="dispatchStore.dispatch" class="mb-6"> </ContainerOnloadCard>
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
