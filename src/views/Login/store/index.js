import { defineStore } from 'pinia'
import { StatusType, StorageKeys } from '@/views/Login/helper'
import { login, postSecurityCode, loginWithSecurityCode } from '@/views/Login/service'
import { getItem, setItem, removeItem } from '@/utils/storage.js'
import { useAlertModal } from '@/components/store/AlertModalStore'
const useAccountInfo = defineStore('account', {
  state: () => ({
    account: getItem(StorageKeys.ACCOUNT),
    status: StatusType.INIT,
    isLoading: false,
    error: {
      times: 0,
      message: '',
      minutes: 0,
    },
  }),
  actions: {
    async handleLogin(account, password, cb) {
      this.isLoading = true
      try {
        const response = await login(account, password)
        if (response.status === 'success') {
          this.account = response.data
          // this.status = StatusType.LOGIN_SUCCESS
          setItem(StorageKeys.ACCOUNT, this.account)
          this.error = {
            times: 0,
            message: '',
            minutes: 0,
          }
          cb()
        }
      } catch (err) {
        this.status = StatusType.LOGIN_FAIL
        this.error = {
          message: err.message,
          times: err.times,
          secodes: err.seconds,
          minutes: Number(err.seconds / 60).toFixed(0),
        }
      } finally {
        this.isLoading = false
      }
    },
    async handleLoginWithSecurityCode(account, password, cb) {
      this.isLoading = true
      const modal = useAlertModal()
      try {
        const response = await loginWithSecurityCode(account, password)
        if (response.status === 'success') {
          this.account = response.data
          setItem(StorageKeys.ACCOUNT, this.account)
          this.error = {
            times: 0,
            message: '',
            minutes: 0,
          }
          cb()
        }
      } catch (err) {
        this.status = StatusType.LOGIN_FAIL
        this.error = {
          message: err.message,
          times: this.error.times,
          secodes: err.seconds,
          minutes: Number(err.seconds / 60).toFixed(0),
        }
        modal.open({
          type: 'error', //required
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
    },
    async handlePostSecurityCode(securityCode) {
      this.isLoading = true
      const modal = useAlertModal()
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
        modal.open({
          type: 'error', //required
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
    },
    handleLogout(cb) {
      this.account = null
      removeItem(StorageKeys.ACCOUNT)
      cb()
    },
  },
})

export default useAccountInfo
