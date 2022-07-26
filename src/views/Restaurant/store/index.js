import { defineStore } from 'pinia'
import ApiCaller from '../service'
import dayjs from 'dayjs'

const useRestaurant = defineStore('restaurant', {
  state: () => ({
    restaurant: null,
    deliveries: null,
    containers: null,
    returned: null,
    osnd: null,
    temperature: null,
    temperatureImage: null,
    degree_type: 'c',
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
    cleanTempImage() {
      this.temperatureImage = null
    },
    async postLockTemperature(restaurantId) {
      const formData = new FormData()
      const tempImageBlob = await fetch(this.temperatureImage).then((r) => r.blob())
      console.log('tempImageBlob', tempImageBlob)
      console.log('this.temperatureImage', this.temperatureImage)
      formData.append('photo', tempImageBlob)
      const data = {
        temp_type: 2,
        degree_type: this.degree_type,
        temp_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        cold: this.cold_temp,
        frozen: this.frozen_temp,
      }
      Object.keys(data).forEach((key) => formData.append(key, data[key]))
      this.isLoading = true
      try {
        const response = await ApiCaller.postLockTemperature(restaurantId, formData)

        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
        }
      } catch (error) {
        this.status = error.status
        this.message = error.message
      } finally {
        this.isLoading = false
      }
    },
    async postTemperatureFinish(restaurantId) {
      this.isLoading = true
      try {
        const response = await ApiCaller.postTemperatureFinish(restaurantId)
        if (response.status === 'success') {
          this.message = response.message
          this.status = response.status
        }
      } catch (err) {
        this.message = err.message
        this.status = err.status
      } finally {
        this.isLoading = false
      }
    },
  },
})

export default useRestaurant
