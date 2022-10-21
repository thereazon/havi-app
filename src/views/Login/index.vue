<script setup>
import { Button, Form, Field, PasswordInput, NumberKeyboard } from 'vant'
import { ref } from 'vue'
import { StatusType } from '@/views/Login/helper'
import useAccountInfo from '@/views/Login/store'
import { useRoute, useRouter } from 'vue-router'
import usePreCoolInfo from '@/views/PreCool/store'
import SecurityCodeDialog from '@/components/SecurityCodeDialog.vue'
const route = useRoute()
const router = useRouter()

const isSecurityCodeDialog = ref(false)
const store = useAccountInfo()
const preCoolStore = usePreCoolInfo()
const securityCode = ref('')
const showKeyboard = ref(false)
const username = ref('')
const password = ref('')

const onSubmit = (values) => {
  const cb = () => router.push('/cars')
  if ((store.status === StatusType.INIT || store.status === StatusType.LOGIN_FAIL) && store.error.times < 5) {
    store.handleLogin(values.Username, values.Password, cb)
  } else if (store.error.times >= 5) {
    store.handleLoginWithSecurityCode(values.Username, `000${securityCode.value}`, cb)
  }
}
</script>

<template>
  <div class="h-[100vh] px-[16px] flex flex-col items-center justify-center bg-main">
    <div>
      <img width="300" class="mb-20" src="/havi_logo.png" alt="logo" />
      <!-- <h1 class="text-white">logo</h1> -->
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
          v-if="store.error.times < 5"
          class="rounded-full mt-5"
          v-model="password"
          type="password"
          name="Password"
          left-icon="lock"
          placeholder="密碼"
          :rules="[{ required: true, message: '密碼必填' }]"
        />
        <div class="mt-2">
          <PasswordInput
            v-if="store.error.times >= 5"
            :value="securityCode"
            :length="3"
            :gutter="10"
            :mask="false"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
          <NumberKeyboard maxlength="3" v-model="securityCode" :show="showKeyboard" @blur="showKeyboard = false" />
        </div>
        <div v-if="store.error.times < 5" class="mt-2 text-center text-warning main w-full">
          {{ store.error?.message }}
        </div>

        <!-- need to check designer-->

        <!-- <div class="mt-9 text-white main w-full">
          <Checkbox class="text-white" checked-color="#6dbe5b" v-model="isLocked"> 記住我 </Checkbox>
        </div> -->
        <Button
          :disabled="store.error.minutes > 0"
          loading-type="spinner"
          class="mt-[70px]"
          round
          block
          type="success"
          native-type="submit"
        >
          登入
        </Button>
        <div
          class="mt-3 text-center text-white main w-full"
          v-if="store.error.times < 5 && store.status === StatusType.LOGIN_FAIL"
        >
          您剩餘
          <span class="text-warning">{{ 6 - store.error?.times }}</span>
          次 輸入機會
        </div>
        <div
          class="mt-3 text-center text-white main w-full"
          v-if="store.error.times === 5 && store.status === StatusType.LOGIN_FAIL && store.error.minutes == 0"
        >
          請確認您的帳號
          <br />
          並與值班人員確認安全碼
        </div>
        <div class="mt-3 text-center text-white main w-full" v-if="store.error.minutes > 0">
          驗證碼輸入錯誤超過
          <span class="text-warning">5</span>
          次
        </div>
        <div class="mt-0 text-center text-white main w-full" v-if="store.error.minutes > 0">
          鎖定帳號剩餘
          <span class="text-warning">{{ store.error?.minutes }}</span>
          分鐘
        </div>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scope>
.van-checkbox__label {
  color: #fff;
}

.main .van-checkbox__label {
  color: #fff;
}
</style>
