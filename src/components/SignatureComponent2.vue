<script setup>
import { ref } from 'vue'
import { Button, Divider } from 'vant'
let esign = ref(null)
const handleReset = () => {
  esign.value.reset()
}
const handleGenerate = () => {
  esign.value
    .generate()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      alert(err)
    })
}
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden" v-if="$vssWidth > $vssHeight">
    <vue-esign :height="$vssHeight - 90" ref="esign" isCrop="false" :lineWidth="3" :lineColor="lineColor" />
    <div class="bottom">
      <Divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> 請手寫簽名 </Divider>
      <div class="flex justify-between">
        <Button :onClick="handleReset" loading-type="spinner" class="h-[25px] bg-success text-white" round block
          >清除</Button
        >
        <Button :onClick="handleGenerate" loading-type="spinner" class="h-[25px] bg-success text-white" round block
          >儲存</Button
        >
      </div>
    </div>
  </div>
  <div v-else>請將螢幕轉向</div>
</template>

<style>
.bottom {
  height: 90px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
