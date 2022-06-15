import { defineStore } from 'pinia'
import DispatchApiCaller from '@/views/Dispatch/service'
import useAccountInfo from '@/views/Login/store'

const useDispatchInfo = defineStore('dispatch', {
  state: () => ({
    dispatchs: null,
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async getDispatchAction(car_id, container_id) {
      const accountStore = useAccountInfo()
      this.isLoading = true
      try {
        const response = await DispatchApiCaller.getDispatch(
          accountStore.account.id,
          accountStore.account.fleet_id,
          car_id,
          container_id,
        )
        if (response.status === 'success') {
          this.dispatchs = response.data
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

export default useDispatchInfo