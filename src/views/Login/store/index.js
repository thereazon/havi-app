import { defineStore } from 'pinia'
import { StatusType } from '@/views/Login/helper'
import { login, postSecurityCode } from '@/views/Login/service'

const useAccountInfo = defineStore('account', {
  state: () => ({
    account: null,
    status: StatusType.INIT,
    isLoading: false,
    error: {
      times: 0,
      message: '',
      seconds: 0,
    },
  }),
  actions: {
    async handleLogin(account, password) {
      this.isLoading = true
      try {
        const response = await login(account, password)
        if (response.status === 'success') {
          this.account = response.data
          this.status = StatusType.LOGIN_SUCCESS
          this.error = {
            times: 0,
            message: '',
            seconds: 0,
          }
        }
      } catch (err) {
        this.status = StatusType.LOGIN_FAIL
        this.error = {
          message: err.message,
          times: err.times,
          seconds: err.seconds,
        }
      } finally {
        this.isLoading = false
      }
    },
    async handlePostSecurityCode(securityCode) {
      this.isLoading = true
      try {
        const response = await postSecurityCode(securityCode)
        if (response.status === 'success') {
          this.account = response.data
          this.status = StatusType.CODE_SUCCESS
          this.error = {
            times: 0,
            message: '',
            seconds: 0,
          }
        }
      } catch (err) {
        this.status = StatusType.CODE_FAIL
        this.error = {
          message: err.message,
          times: err.times,
          seconds: err.seconds,
        }
      } finally {
        this.isLoading = false
      }
    },
  },
})

export default useAccountInfo
