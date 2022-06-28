import { defineStore } from 'pinia'
import ApiCaller from '../service'

const useEntryRecord = defineStore('entryRecord', {
  state: () => ({
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async userCheckInAction(id, temperature) {
      try {
        this.isLoading = true
        const response = await ApiCaller.checkIn(id, temperature)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
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

export default useEntryRecord
