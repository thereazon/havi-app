import { defineStore } from 'pinia'
import ApiCaller from '../service'

const usePreCool = defineStore('precool', {
  state: () => ({
    status: 'init',
    isLoading: false,
    message: '',
    dispatch: null,
    temperature: null,
    currentTemp: null,
    signImage: null,
    data: [],
  }),
  actions: {
    setSignImage(img) {
      this.signImage = img
    },
    async setCurrentDispath(dispatch) {
      this.dispatch = dispatch
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
    async getPalletAuction(id) {
      try {
        this.isLoading = true
        const response = await ApiCaller.getPallet(id)
        if (response.status === 'success') {
          this.data = response.data
          this.status = response.status
          this.message = response.message
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
    async postPalletAction(id) {
      try {
        this.isLoading = true
        const response = await ApiCaller.postPallet(id, this.data)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
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

export default usePreCool
