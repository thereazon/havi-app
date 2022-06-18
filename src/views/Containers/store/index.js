import { defineStore } from 'pinia'
import ApiCaller from '../service/index'
import useAccountInfo from '@/views/Login/store'

let mockData = [
  {
    sort: 0,
    no: 'N-TEST-0616-M01',
    date: '06/16/2022',
    data: [
      {
        name: '滿福麵包籃e04',
        qty: 14,
        purchase_total: 14,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '3加崙糖漿桶',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '開元鮮乳空籃',
        qty: 0,
        purchase_total: 0,
        return_total: 3,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 2,
        return_qty: 0,
        resource_qty: 3,
        pallet_qty: 0,
      },
      {
        name: '聖代吐司焙果籃',
        qty: 4,
        purchase_total: 4,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: 'CO2桶(大)',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '麵包籃-漢堡滿意大麥克芝麻長',
        qty: 84,
        purchase_total: 84,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: 'CO2桶(小)',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '統一-鮮乳籃',
        qty: 0,
        purchase_total: 0,
        return_total: 1,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 2,
        return_qty: 0,
        resource_qty: 1,
        pallet_qty: 0,
      },
      {
        name: '開元鮮乳空籃16入',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '塑膠棧板',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '5加崙糖漿桶',
        qty: 0,
        purchase_total: 0,
        return_total: 6,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 2,
        return_qty: 2,
        resource_qty: 4,
        pallet_qty: 0,
      },
      {
        name: '光泉鮮乳空籃',
        qty: 2,
        purchase_total: 2,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
    ],
  },
  {
    sort: 0,
    no: 'N-TEST-0616-M04',
    date: '06/16/2022',
    data: [
      {
        name: 'CO2桶(大)',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
      {
        name: '統一-鮮乳籃',
        qty: 0,
        purchase_total: 0,
        return_total: 1,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 2,
        return_qty: 0,
        resource_qty: 1,
        pallet_qty: 0,
      },
      {
        name: '開元鮮乳空籃16入',
        qty: 0,
        purchase_total: 0,
        return_total: 0,
        overflow_qty: 0,
        short_qty: 0,
        backing_qty: 0,
        return_qty: 0,
        resource_qty: 0,
        pallet_qty: 0,
      },
    ],
  },
]

const useContainers = defineStore('containers', {
  state: () => ({
    containers: [],
    status: 'init',
    isLoading: false,
    message: '',
  }),
  getters: {
    filteredContainerGetter: (state) => {
      return (dispatch_no) => state.containers.filter((container) => container.no === dispatch_no)
    },
  },
  actions: {
    async getContainersAction(car_id, container_id) {
      const accountStore = useAccountInfo()
      this.isLoading = true
      try {
        const response = await ApiCaller.getContainers(
          accountStore.account.id,
          accountStore.account.fleet_id,
          car_id,
          container_id,
        )
        if (response.status === 'success') {
          this.containers = response.data
          this.status = response.status
        }
        console.log(response)
      } catch (err) {
        this.status = err.status
        this.message = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})

export default useContainers
