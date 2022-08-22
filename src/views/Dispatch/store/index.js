import { defineStore } from 'pinia'
import DispatchApiCaller from '@/views/Dispatch/service'
import { DispatchStatusNumberToType, restaurantByStatus, LockTempNumberToType } from '@/views/Dispatch/helper'
import { useAlertModal } from '@/components/store/AlertModalStore'
import useAccountInfo from '@/views/Login/store'

const useDispatchInfo = defineStore('dispatch', {
  state: () => ({
    dispatchs: null,
    dispatch: null, //current dispatch
    restaurant: null,
    status: 'init',
    isLoading: false,
    message: '',
    currentRestaurant: null,
    showUnableDeliverMenu: false,
    unableDeliverID: null,
  }),
  actions: {
    closeUnableDeliverMenu() {
      this.showUnableDeliverMenu = false
    },
    openUnableDeliverMenu(id) {
      this.unableDeliverID = id
      this.showUnableDeliverMenu = true
    },
    async setCurrentRestaurant(restaurant) {
      this.currentRestaurant = restaurant
    },
    async setCurrentDispatch(dispatch) {
      this.dispatch = dispatch
    },
    async getDispatchDetailAction(id, cb) {
      const modal = useAlertModal()
      this.isLoading = true
      try {
        const response = await DispatchApiCaller.getDispatchDetail(id)
        if (response.status === 'success') {
          this.restaurant = restaurantByStatus(response.data)
          cb && cb()
        }
      } catch (err) {
        modal.open({
          type: 'error',
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
    },
    async getRestaurantDetailAction(id, cb) {
      const modal = useAlertModal()
      this.isLoading = true
      try {
        const response = await DispatchApiCaller.getRestaurantDetail(id)
        if (response.status === 'success') {
          this.currentRestaurant = {
            ...response.data,
            temperature_count: 1, //餐廳溫度數量寫死1
            is_temp: !!response.data.is_temp,
            is_container: !!response.data.is_container,
            is_returned: !!response.data.is_returned,
            is_finish: !!response.data.is_finish,
            lock_temp_type: LockTempNumberToType[response.data.lock_temp_type],
          }
          this.status = response.status
          cb()
        }
      } catch (err) {
        modal.open({
          type: 'error',
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
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
    async postUndeliveredAction(id) {
      this.isLoading = true
      try {
        const response = await DispatchApiCaller.postUndelivered(id)
        if (response.status === 'success') {
          await this.getDispatchDetailAction(this.dispatch.id)
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async postCheckOut() {
      const modal = useAlertModal()
      try {
        const response = await DispatchApiCaller.postCheckOut(this.dispatch.id)
        if (response.status === 'success') {
          this.status = response.status
        }
      } catch (err) {
        modal.open({
          type: 'error', //required
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
    },
    async postBringAction(id, text) {
      const modal = useAlertModal()
      try {
        const response = await DispatchApiCaller.postBring(this.unableDeliverID, id, text)
        if (response.status === 'success') {
          await this.getDispatchDetailAction(this.dispatch.id)
        }
      } catch (err) {
        modal.open({
          type: 'error', //required
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
    },
    async postDelayAction(id, text) {
      const modal = useAlertModal()
      try {
        const response = await DispatchApiCaller.postDelayed(this.unableDeliverID, id, text)
        if (response.status === 'success') {
          await this.getDispatchDetailAction(this.dispatch.id, () => null)
        }
      } catch (err) {
        modal.open({
          type: 'error', //required
          title: '錯誤',
          content: err.message,
        })
      } finally {
        this.isLoading = false
      }
    },
  },
})

export default useDispatchInfo
