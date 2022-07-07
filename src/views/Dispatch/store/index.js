import { defineStore } from 'pinia'
import DispatchApiCaller from '@/views/Dispatch/service'
import { DispatchStatusNumberToType } from '@/views/Dispatch/helper'
import useAccountInfo from '@/views/Login/store'

const useDispatchInfo = defineStore('dispatch', {
  state: () => ({
    dispatchs: null,
    dispatch: null, //current dispatch
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async setCurrentDispath(dispatch) {
      this.dispatch = dispatch
    },
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
          this.dispatchs = response.data.map((v) => ({
            ...v,
            is_loading: Boolean(v.is_loading),
            status: DispatchStatusNumberToType[v.status],
          }))
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
