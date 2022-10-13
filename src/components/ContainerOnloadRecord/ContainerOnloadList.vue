<script setup>
import { Field, CellGroup } from 'vant'
import { ref } from 'vue'

const props = defineProps({
  ingredientsList: {
    type: Array,
    required: true,
  },
})

const formatter = (value) => (value === '' ? parseInt(0) : parseInt(value))
const fieldRef = ref(null)
const handleFoucs = (index) => {
  const input = fieldRef.value[index].$el.querySelector('input')
  input.select()
}
</script>

<template>
  <div class="rounded-[20px] max-w-5xl bg-white shadow-lg overflow-hidden">
    <p class="text-xs text-center py-1.5 my-0 text-primary font-bold">請於下方填寫容器裝車記錄數值</p>
    <CellGroup>
      <Field
        v-for="(ingredient, index) in props.ingredientsList"
        class="border-0 border-t border-solid border-neutral-300"
        title-class="text-primary text-sm font-bold pb-3"
        value-class="text-teal-400 text-sm font-bold"
        input-align="right"
        ref="fieldRef"
        :onclick="() => handleFoucs(index)"
        :key="ingredient.id"
        v-model="ingredient.qty"
        type="digit"
        :formatter="formatter"
        :label="ingredient.name"
      />
    </CellGroup>
  </div>
</template>

<style>
.van-field__label {
  width: 145px;
}
</style>
