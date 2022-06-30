import { defineStore } from 'pinia'
import ApiCaller from '../service'

const useEntryRecord = defineStore('entryRecord', {
  state: () => ({
    status: 'init',
    isLoading: false,
    message: '',
    data: null,
  }),
  actions: {
    async getPalletAuction(id) {
      try {
        this.isLoading = true
        const response = await ApiCaller.get(id)
        if (response.status === 'success') {
          this.data = response.data
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
    async postPalletAction(id) {
      try {
        this.isLoading = true
        const response = await ApiCaller.postPallet(id, this.data)
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
