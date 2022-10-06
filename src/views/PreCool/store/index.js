import { defineStore } from 'pinia'
import { TempModule } from '@/utils/common'
import { useAlertModal } from '@/components/store/AlertModalStore'
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
    isValidCurrentTemp: null,
    tempPhoto: null,
    validTemp: null,
  }),
  actions: {
    setIsValidTemp(validTemp) {
      this.validTemp = validTemp
    },
    setTempPhoto(photo) {
      this.tempPhoto = photo
    },
    setSignData(data) {
      const { degree_type, checked, currentTemp, signImage, isValidTemp } = data
      this.signImage = signImage
      this.checked = checked
      this.degree_type = degree_type
      this.currentTemp = currentTemp
      this.isValidCurrentTemp = isValidTemp
    },
    cleanSignImage() {
      this.signImage = null
    },
    async postTemperature(dispatch, cb) {
      const { id, isNormal } = dispatch
      const formData = new FormData()
      const signPhotoBlob = await fetch(this.signImage).then((r) => r.blob())
      const modal = useAlertModal()
      if (this.tempPhoto || isNormal || this.validTemp) {
        formData.append('signature_photo', signPhotoBlob)
        if (this.tempPhoto) {
          formData.append('temp_photo', this.tempPhoto)
        }
        const data = {
          temp_type: 1,
          degree_type: 'f',
          temp_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          frozen_c:
            this.degree_type === 'C'
              ? this.currentTemp
                ? this.currentTemp
                : -1
              : TempModule.toCelsius(this.currentTemp),
          frozen_f:
            this.degree_type === 'F'
              ? this.currentTemp
                ? this.currentTemp
                : -1
              : TempModule.toFahrenheit(this.currentTemp),
          is_clean: 1,
          is_bug: 1,
        }
        Object.keys(data).forEach((key) => formData.append(key, data[key]))
        try {
          this.isLoading = true
          const response = await ApiCaller.postPreCool(id, formData)
          if (response.status === 'success') {
            this.status = response.status
            this.message = response.message
            this.currentTemp = null
            this.signImage = null
            this.checked = null
            this.degree_type = 'C'
            this.isValidCurrentTemp = null
            cb()
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
      } else {
        modal.open({
          type: 'error',
          title: '錯誤',
          content: '車機溫度照片不可為空',
        })
      }
    },
    async setCurrentDispatch(dispatch) {
      this.dispatch = dispatch
    },
    async getTemperatureAction(carId, containerId) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getTemperature(carId, containerId)
        if (response.status === 'success') {
          // if(response.data.f.frozen) {

          // }
          console.log(response.data.f.frozen)
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
    async postSecurityCodeAction(code, cb) {
      const modal = useAlertModal()
      try {
        this.isLoading = true
        const response = await ApiCaller.postSecurityCode(code)
        if (response.status === 'success') {
          cb && cb()
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

export default usePreCool
