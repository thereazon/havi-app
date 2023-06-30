import { defineStore } from 'pinia'
import ApiCaller from '../service'
import dayjs from 'dayjs'
import { useAlertModal } from '@/components/store/AlertModalStore'
import useDispatchStore from '@/views/Dispatch/store'
const useRestaurant = defineStore('restaurant', {
  state: () => ({
    isPreviewMode: true,
    restaurant: null,
    deliveries: null,
    currentDelivery: null,
    containers: [],
    returned: null,
    osnd: null,
    isGetCurrentTemp: false, // 獲取溫度
    isGetCounterTemp: false, // 獲取櫃檯溫度
    temperature: null,
    temperatureImage: null,
    degree_type: 'f',
    cold_temp: null,
    frozen_temp: null,
    currentException: {
      deliveryNo: null,
      deliveryDate: null,
      item: null, // Current item {object}
      item_desc: null,
      qty: null,
      type: null,
      uid: null,
      uom: null,
      wrin: null,
    },
    currentReturned: null,
    returnDetail: null,
    status: 'init',
    message: null,
    isLoading: null,
  }),
  actions: {
    setPreviewMode(bool) {
      this.isPreviewMode = bool
    },
    setCurrentReturned(returned) {
      this.currentReturned = returned
    },
    setCurrentDelivery(delivery) {
      this.currentDelivery = delivery
    },
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
    async postDeliveryAction(id, data) {
      this.isLoading = true
      try {
        const response = await ApiCaller.postDelivery(id, data)
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
    async deleteDeliveryAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.deleteDelivery(id)
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
    async getContainerAction(id) {
      this.isLoading = true
      try {
        const response = await ApiCaller.getContainer(id)
        if (response.status === 'success') {
          this.containers = response.data
          this.status = response.status
          if (this.containers.length !== 0) {
            this.containers.forEach((content) => {
              content.items.forEach((item) => {
                item.purchase_total = item.qty - item.short_qty
                item.return_total = item.return_qty + item.resource_qty
              })
            })
          }
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
      const modal = useAlertModal()
      const dispatchStore = useDispatchStore()
      this.isLoading = true
      const tempZones = dispatchStore.currentRestaurant.temp_zone.split(',')
      const isNormal = tempZones ? tempZones.find((v) => v === 'D') && tempZones.length === 1 : null
      if (isNormal) {
        this.isGetCurrentTemp = true
      } else {
        try {
          const response = await ApiCaller.getTemperature(carId, containerId)
          if (response.status === 'success') {
            if (response.data.f.frozen && response.data.f.cold) {
              this.temperature = response.data
              this.isGetCurrentTemp = true
              this.status = response.status
            } else {
              modal.open({
                type: 'hint',
                title: '提醒',
                content: '無溫度資料',
              })
            }
          }
        } catch (err) {
          this.status = err.status
          this.message = err.message
        } finally {
          this.isLoading = false
        }
      }
    },
    async postContainerFinishAction(containerOrder) {
      const dispatchStore = useDispatchStore()
      const modal = useAlertModal()
      this.isLoading = true
      try {
        const { id, items } = containerOrder
        const newItems = items.map(({ name, qty, wrin, sort, ...item }) => {
          return item
        })
        const response = await ApiCaller.postContainerFinish(id, newItems)
        if (response.status === 'success') {
          dispatchStore.updateCurrentRestaurantStatus({
            ...dispatchStore.currentRestaurant,
            is_container: true,
          })
          modal.open({
            type: 'success',
            title: '成功',
            content: '資料儲存成功',
          })
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
    cleanTempImage() {
      this.temperatureImage = null
    },
    async postLockTemperature(restaurantId, cb) {
      const dispatchStore = useDispatchStore()
      const modal = useAlertModal()
      const formData = new FormData()
      if (this.temperatureImage) {
        const tempImageBlob = await fetch(this.temperatureImage).then((r) => r.blob())
        formData.append('photo', tempImageBlob)
      }
      const data = {
        temp_type: dispatchStore.dispatch.isNormal ? 4 : this.cold_temp ? 2 : 1,
        degree_type: this.degree_type,
        temp_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        cold: dispatchStore.dispatch.isNormal ? null : this.cold_temp ? this.cold_temp : this.temperature.f.cold,
        frozen: dispatchStore.dispatch.isNormal
          ? null
          : this.frozen_temp
          ? this.frozen_temp
          : this.temperature.f.frozen,
      }
      Object.keys(data).forEach((key) => formData.append(key, data[key]))
      this.isLoading = true
      try {
        const response = await ApiCaller.postLockTemperature(restaurantId, formData)
        if (response.status === 'success') {
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
    async postContainerSendAction(id) {
      const modal = useAlertModal()
      this.isLoading = true
      try {
        const response = await ApiCaller.postContainerSend(id)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
          modal.open({
            type: 'success',
            title: '成功',
            content: '資料儲存成功',
          })
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
    async postTemperatureFinish(restaurantId) {
      const dispatchStore = useDispatchStore()
      const modal = useAlertModal()
      this.isLoading = true
      try {
        const response = await ApiCaller.postTemperatureFinish(restaurantId)
        if (response.status === 'success') {
          modal.open({
            type: 'success',
            title: '成功',
            content: '溫度儲存成功',
          })
          dispatchStore.updateCurrentRestaurantStatus({
            ...dispatchStore.currentRestaurant,
            is_temp: true,
          })
        }
      } catch (err) {
        modal.open({
          type: 'error',
          title: '警告',
          content: '您尚未『鎖定溫度』無法完成此步驟！ 請先『鎖定溫度』後，在點擊『完成』',
        })
      } finally {
        this.isLoading = false
      }
    },
    setContainersAction(FormData, index) {
      this.containers[index].items.forEach((content) => {
        if (content.id === FormData.id) {
          content.backing_qty = Number(FormData.backing_qty)
          content.short_qty = Number(FormData.short_qty)
          content.resource_qty = Number(FormData.resource_qty)
          content.return_qty = Number(FormData.return_qty)
          content.purchase_total = content.qty - content.short_qty
          content.return_total = content.return_qty + content.resource_qty
        }
      })
    },
    setCurrentException(currentItem, product, delivery) {
      this.currentException.deliveryNo = delivery.no
      this.currentException.deliveryDate = delivery.date
      this.currentException.item = currentItem
      this.currentException.item_desc = product.item_desc
      this.currentException.qty = product.qty
      this.currentException.type = product.type
      this.currentException.uid = currentItem.uid
      this.currentException.uom = product.uom
      this.currentException.wrin = product.wrin
    },
    resetCurrentException() {
      this.currentException.deliveryNo = null
      this.currentException.deliveryDate = null
      this.currentException.item = null
      this.currentException.item_desc = null
      this.currentException.qty = null
      this.currentException.type = null
      this.currentException.uid = null
      this.currentException.uom = null
      this.currentException.wrin = null
    },
    async getExceptionAction(id, type) {
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.getException(id, type)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
          return response.data
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
    async postExceptionAction(itemId, exceptionList, type, cb) {
      const isNotesEmpty = exceptionList.find((v) => v.note === null || v.note === '')
      const modal = useAlertModal()
      if (isNotesEmpty) {
        modal.open({
          type: 'error',
          title: '錯誤',
          content: '備註為必填欄位',
          callback: cb,
        })
        return
      }
      this.isLoading = true
      const formData = new FormData()
      const encoder = exceptionList.reduce((prev, curr) => {
        return {
          ...prev,
          [`abnormal_id[${curr.id}]`]: curr.selectReason,
          [`qty[${curr.id}]`]: curr.unit ? curr.unit : null,
          [`set_qty[${curr.id}]`]: curr.set_qty ? curr.set_qty : null,
          [`pcs_qty[${curr.id}]`]: curr.pcs_qty ? curr.pcs_qty : null,
          [`note[${curr.id}]`]: curr.note ? curr.note : null,
          [`file[${curr.id}][0]`]: curr.file && curr.file[0] ? curr.file[0].file : null,
          [`file[${curr.id}][1]`]: curr.file && curr.file[1] ? curr.file[1].file : null,
          [`file[${curr.id}][2]`]: curr.file && curr.file[2] ? curr.file[2].file : null,
        }
      }, {})
      Object.keys(encoder)
        .filter((v) => encoder[v])
        .forEach((key) => formData.append(key, encoder[key]))
      try {
        const response = await ApiCaller.postException(itemId, formData, type)
        if (response.status === 'success') {
          modal.open({
            type: 'success',
            title: '成功',
            content: '儲存成功',
            callback: cb,
          })
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
    async postOnKAction(id, data, cb) {
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.postOnK(id, data)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
          modal.open({
            type: 'success',
            title: '成功',
            content: '資料儲存完成',
            callback: cb,
          })
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
    async getOnKAction(id) {
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.getOnK(id)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
          return response.data
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
    async updateOnKAction(id, data, cb) {
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.updateOnK(id, data)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
          modal.open({
            type: 'success',
            title: '成功',
            content: '資料儲存完成',
            callback: cb,
          })
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
    async getReturnedDetailAction(id, cb) {
      const modal = useAlertModal()
      this.isLoading = true
      try {
        const response = await ApiCaller.getReturnedDetail(id)
        if (response.status === 'success') {
          this.returnDetail = response.data
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
    async postReturnStatusAction(id, type) {
      const dispatchStore = useDispatchStore()
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.postReturnStatus(id, { type })
        if (response.status === 'success') {
          this.getReturnedAction(dispatchStore.currentRestaurant.id)
          dispatchStore.updateCurrentRestaurantStatus({
            ...dispatchStore.currentRestaurant,
            is_returned: false,
          })
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
    async postReturnFinishAction(id) {
      const dispatchStore = useDispatchStore()
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.postReturnFinish(id)
        if (response.status === 'success') {
          dispatchStore.updateCurrentRestaurantStatus({
            ...dispatchStore.currentRestaurant,
            is_returned: true,
          })
          modal.open({
            type: 'success',
            title: '成功',
            content: '資料儲存完成',
          })
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
    async postReturnDetailAction(id, data, cb) {
      const modal = useAlertModal()
      try {
        const response = await ApiCaller.postReturnDetail(id, data)
        if (response.status === 'success') {
          cb()
        } else {
          modal.open({
            type: 'error',
            title: '錯誤',
            content: response.message,
          })
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
    async postStoreFinish(restaurantId, data1, data2, cb) {
      this.isLoading = true
      const modal = useAlertModal()
      const formData = new FormData()
      const signImageBlob = await fetch(data1).then((r) => r.blob())
      if (data2) {
        const signImageBlob2 = await fetch(data2).then((r) => r.blob())
        formData.append('store_photo', signImageBlob2)
      }
      formData.append('driver_photo', signImageBlob)
      try {
        const response = await ApiCaller.postStoreFinish(restaurantId, formData)
        if (response.status === 'success') {
          modal.open({
            type: 'success',
            title: '成功',
            content: response.message,
            callback: cb,
          })
        } else {
          modal.open({
            type: 'error',
            title: '錯誤',
            content: response.message,
          })
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
  },
})

export default useRestaurant
