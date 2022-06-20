import { defineStore } from 'pinia'
import TempApiCaller from '@/views/Temperature/service'

const useTempInfo = defineStore('temperature', {
  state: () => ({
    temperature: null,
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async getTemperatureAction(carId, containerId) {
      this.isLoading = true
      try {
        const response = await TempApiCaller.getTemperature(carId, containerId)
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
