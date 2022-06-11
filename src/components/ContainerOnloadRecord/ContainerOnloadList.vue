<script setup>
import { Cell, CellGroup } from 'vant'

const props = defineProps({
  ingredientsList: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="rounded-[20px] max-w-5xl bg-white shadow-lg overflow-hidden">
    <p class="text-xs text-center py-1.5 my-0 text-primary font-bold">請於下方填寫容器裝車記錄數值</p>
    <CellGroup>
      <Cell
        v-for="ingredient in props.ingredientsList"
        class="border-0 border-t border-solid border-neutral-300"
        title-class="text-primary text-sm font-bold pb-3"
        value-class="text-teal-400 text-sm font-bold"
        center
        :key="ingredient.id"
        :value="ingredient.value"
        :title="ingredient.title"
      />
    </CellGroup>
  </div>
</template>
