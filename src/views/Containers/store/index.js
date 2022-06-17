import { defineStore } from 'pinia'
import ContainersApiCaller from '@/views/Containers/service'
import useAccountInfo from '@/views/Login/store'

const useContainersInfo = defineStore('containers', {
  state: () => ({
    containers: null,
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async getContainersAction(car_id, container_id) {
      const accountStore = useAccountInfo()
      this.isLoading = true
      try {
        const response = await ContainersApiCaller.getContainers(
          accountStore.account.id,
          accountStore.account.fleet_id,
          car_id,
          container_id,
        )
        if (response.status === 'success') {
          this.containers = response.data
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

export default useContainersInfo
