import { defineStore } from 'pinia'
import CarsApiCaller from '@/views/Cars/service'
import useAccountInfo from '@/views/Login/store'

const useCarsInfo = defineStore('cars', {
  state: () => ({
    cars: [],
    containers: [],
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async getCarsAction() {
      const accountStore = useAccountInfo()
      this.isLoading = true
      try {
        const response = await CarsApiCaller.getCars(accountStore.account.fleet_id)
        if (response.status === 'success') {
          this.cars = response.data.car
          this.containers = response.data.container
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

export default useCarsInfo
