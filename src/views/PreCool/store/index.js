import { defineStore } from 'pinia'
import { TempModule } from '@/utils/common'
import ApiCaller from '../service'
import dayjs from 'dayjs'

const usePreCool = defineStore('precool', {
  state: () => ({
    isLoading: false,
    status: 'init',
    message: '',
    dispatch: null,
    temperature: null,
    currentTemp: null,
    signImage: null,
    data: [],
    checked: [],
    degree_type: 'C',
  }),
  actions: {
    setSignData(data) {
      const { degree_type, checked, currentTemp, signImage } = data
      this.signImage = signImage
      this.checked = checked
      this.degree_type = degree_type
      this.currentTemp = currentTemp
    },
    cleanSignImage() {
      this.signImage = null
    },
    async postTemperature(id) {
      // const formData = new FormData()
      // const blob = this.signImage.blob()
      // console.log(this.signImage.blob())
      // formData.append('signature_photo', jpg)
      // formData.append('temp_photo', jpg)
      const data = {
        temp_type: 1,
        degree_type: 'f',
        temp_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        cold_c: this.degree_type === 'C' ? this.currentTemp : TempModule.toCelsius(this.currentTemp),
        cold_storage_c: this.degree_type === 'C' ? this.currentTemp : TempModule.toCelsius(this.currentTemp),
        frozen_c: this.degree_type === 'C' ? this.currentTemp : TempModule.toCelsius(this.currentTemp),
        frozen_storage_c: this.degree_type === 'C' ? this.currentTemp : TempModule.toCelsius(this.currentTemp),
        cold_f: this.degree_type === 'F' ? this.currentTemp : TempModule.toFahrenheit(this.currentTemp),
        cold_storage_f: this.degree_type === 'F' ? this.currentTemp : TempModule.toFahrenheit(this.currentTemp),
        frozen_f: this.degree_type === 'F' ? this.currentTemp : TempModule.toFahrenheit(this.currentTemp),
        frozen_storage_f: this.degree_type === 'F' ? this.currentTemp : TempModule.toFahrenheit(this.currentTemp),
        is_clean: 1,
        is_bug: 1,
        signature_photo: this.signImage,
        temp_photo: this.signImage,
      }
      // for (let key in data) {
      //   formData.append(key, data[key])
      // }
      try {
        this.isLoading = true
        const response = await ApiCaller.postPreCool(id, data)
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
