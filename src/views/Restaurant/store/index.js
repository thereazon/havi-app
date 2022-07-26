import { defineStore } from 'pinia'
import ApiCaller from '../service'

const useRestaurant = defineStore('restaurant', {
  state: () => ({
    restaurant: null,
    deliveries: null,
    containers: null,
    returned: null,
    osnd: null,
    temperature: null,
    temperatureImage: null,
    degree_type: 'C',
    cold_temp: null,
    frozen_temp: null,
    status: 'init',
    message: null,
    isLoading: null,
  }),
  actions: {
    async getRestaurantDetailAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getRestaurantDetail(id)
        if (response.status === 'success') {
          this.restaurant = response.data
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async getDeliveryAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getDelivery(id)
        if (response.status === 'success') {
          this.deliveries = response.data
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async getContainerAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getContainer(id)
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
    async getOSNDAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getOSND(id)
        if (response.status === 'success') {
          this.osnd = response.data
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async getReturnedAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getReturned(id)
        if (response.status === 'success') {
          this.returned = response.data
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async getTemperatureAction(carId, containerId) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getTemperature(carId, containerId)
        if (response.status === 'success') {
          this.temperature = response.data
          this.status = response.status
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async postLockTemperature(restaurantId) {
      const data = {}
      // try {
      //   this.isLoading = true
      //   const response = await ApiCaller.postLockTemperature(restaurantId, data)
      //   if (response.status === 'success') {
      //     this.status = response.status
      //     this.message = response.message
      //   }
      // } catch (error) {
      //   this.status = error.status
      //   this.message = error.message
      // } finally {
      //   this.isLoading = false
      // }
    },
  },
})

export default useRestaurant
