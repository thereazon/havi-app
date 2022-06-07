<script setup>
import { Button, Form, Field, Checkbox } from 'vant'
import { ref, defineComponent } from 'vue'
import { useAccountInfo } from '@/stores'

const accountStore = useAccountInfo()
const username = ref('')
const password = ref('')
const isLocked = ref(false)
const onSubmit = (values) => {
  accountStore.login(values.Username, values.Password)
}
</script>

<template>
  <div class="h-[100vh] px-[16px] flex flex-col items-center justify-center bg-main">
    <div>
      <!-- <img src="" alt="logo" /> -->
      <h1 class="text-white">logo</h1>
      <div>{{ accountStore?.account?.name }}</div>
    </div>
    <Form @submit="onSubmit" class="w-full">
      <div>
        <Field
          class="rounded-full"
          v-model="username"
          name="Username"
          left-icon="contact"
          placeholder="帳號"
          :rules="[{ required: true, message: '帳號必填' }]"
        />
        <Field
          class="rounded-full mt-5"
          v-model="password"
          type="password"
          name="Password"
          left-icon="lock"
          placeholder="密碼"
          :rules="[{ required: true, message: '密碼必填' }]"
        />
        <div class="mt-9 text-white main w-full">
          <Checkbox class="text-white" checked-color="#6dbe5b" v-model="isLocked"> 記住我 </Checkbox>
        </div>
        <Button class="mt-[70px]" round block type="success" native-type="submit"> 登入 </Button>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scope>
.van-checkbox__label {
  color: #fff !important;
}

.main .van-checkbox__label {
  color: #fff !important;
}
</style>
