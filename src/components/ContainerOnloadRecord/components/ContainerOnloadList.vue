<script setup>
import { Cell, CellGroup } from 'vant'
</script>

<template>
  <div class="rounded-[20px] max-w-5xl bg-white shadow-lg overflow-hidden">
    <p class="text-xs text-center py-1.5 my-0 text-primary font-bold">請於下方填寫容器裝車記錄數值</p>
    <CellGroup>
      <Cell
        center
        title="5加崙糖漿桶"
        value="0"
        class="border-0 border-t border-solid border-neutral-300 "
        title-class="text-primary text-sm font-bold pb-3"
        value-class="text-teal-400 text-sm font-bold"
      />
    </CellGroup>
  </div>
</template>

<style lang="scss" scoped>
</style>