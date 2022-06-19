import { defineStore } from 'pinia'
import ApiCaller from '../service/index'
import useAccountInfo from '@/views/Login/store'
import { StatusType } from '../helper'

const useContainers = defineStore('containers', {
  state: () => ({
    containers: [],
    status: StatusType.INIT,
    isLoading: false,
    message: '',
  }),
  getters: {
    filteredContainerGetter: (state) => {
      return (dispatch_no) => state.containers.filter((container) => container.no === dispatch_no)
    },
  },
  actions: {
    async getContainersAction(car_id, container_id) {
      if (!car_id) {
        this.status = StatusType.CAR_ID_MISSING
        return
      }
      const accountStore = useAccountInfo()
      this.isLoading = true
      try {
        const response = await ApiCaller.getContainers(
          accountStore.account.id,
          accountStore.account.fleet_id,
          car_id,
          container_id,
        )
        if (response.status === 'success') {
          this.containers = response.data
          this.status = StatusType.SUCCESS
        }
        console.log(response)
      } catch (err) {
        this.status = StatusType.FAIL
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})

export default useContainers
