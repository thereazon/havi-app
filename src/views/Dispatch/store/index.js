import { defineStore } from 'pinia'
import DispatchApiCaller from '@/views/Dispatch/service'
import { DispatchStatusNumberToType, restaurantByStatus } from '@/views/Dispatch/helper'
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
  }),
  actions: {
    async setCurrentRestaurant(restaurant) {
      this.currentRestaurant = restaurant
    },
    async setCurrentDispatch(dispatch) {
      this.dispatch = dispatch
    },
    async getDispatchDetailAction(id) {
      this.isLoading = true
      try {
        const response = await DispatchApiCaller.getDispatchDetail(id)
        if (response.status === 'success') {
          this.restaurant = restaurantByStatus(response.data)
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async getRestaurantDetailAction(id) {
      this.isLoading = true
      try {
        const response = await DispatchApiCaller.getRestaurantDetail(id)
        if (response.status === 'success') {
          this.currentRestaurant = {
            temperature_count: 1, //餐廳溫度數量寫死1
            ...response.data,
          }
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
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
