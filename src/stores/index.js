import { defineStore } from 'pinia'
import { AuthService } from '@/service'

export const useAccountInfo = defineStore('account', {
  state: () => ({
    account: null,
  }),
  actions: {
    async login(account, password) {
      const response = await AuthService.login(account, password)
      if (response.status === 'success') {
        this.account = response.data
      }
    },
  },
})
