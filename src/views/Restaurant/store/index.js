import { defineStore } from 'pinia'
import RestaurantApiCaller from '@/views/Restaurant/service'

const useRestaurantInfo = defineStore('temperature', {
  state: () => ({
    store: null,
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async getStoreDetailAction(id) {
      this.isLoading = true
      try {
        const response = await RestaurantApiCaller.getStoreDetail(id)
        if (response.status === 'success') {
          this.store = response.data
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

export default useRestaurantInfo
