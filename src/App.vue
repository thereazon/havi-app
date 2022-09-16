<script setup>
import { onMounted } from 'vue'
import AlertModal from './components/AlertModal.vue'
import useCommonStore from '@/common/useCommonStore'

const commonStore = useCommonStore()

onMounted(async () => {
  await commonStore.getAllInfosAction()
})
</script>
<template>
  <RouterView />
  <AlertModal />
</template>
