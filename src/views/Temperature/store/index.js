import { defineStore } from 'pinia'
import TempApiCaller from '@/views/Temperature/service'
import useAccountInfo from '@/views/Login/store'

const useTempInfo = defineStore('temperature', {
  state: () => ({
    temperature: null,
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async getTemperatureAction(containerId) {
      const accountStore = useAccountInfo()
      this.isLoading = true
      try {
        const response = await TempApiCaller.getTemperature(accountStore.account.fleet_id, containerId)
        if (response.status === 'success') {
          this.temperature = response.data
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})

export default useTempInfo
