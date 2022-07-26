import { defineStore } from 'pinia'
import ApiCaller from '../service'

const useRestaurant = defineStore('restaurant', {
  state: () => ({
    restaurant: null,
    deliveries: null,
    containers: [],
    returned: null,
    osnd: null,
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
          if (this.containers.length !== 0) {
            this.containers.forEach((content) => {
              content.items.forEach((item) => {
                item.purchase_total = item.qty - (item.short_qty + item.backing_qty)
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
    setContainersAction(FormData, index) {
      this.containers[index].items.forEach((content) => {
        if (content.id === FormData.id) {
          content.backing_qty = Number(FormData.backing_qty)
          content.short_qty = Number(FormData.short_qty)
          content.resource_qty = Number(FormData.resource_qty)
          content.return_qty = Number(FormData.return_qty)
          content.purchase_total = content.qty - (content.short_qty + content.backing_qty)
          content.return_total = content.return_qty + content.resource_qty
        }
      })
    },
  },
})

export default useRestaurant
