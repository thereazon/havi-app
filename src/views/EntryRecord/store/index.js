import { defineStore } from 'pinia'
import ApiCaller from '../service'
import { useAlertModal } from '@/components/store/AlertModalStore'

const useEntryRecord = defineStore('entryRecord', {
  state: () => ({
    status: 'init',
    isLoading: false,
    message: '',
  }),
  actions: {
    async userCheckInAction(id, temperature, cb) {
      const modal = useAlertModal()
      try {
        this.isLoading = true
        const response = await ApiCaller.checkIn(id, temperature)
        if (response.status === 'success') {
          this.status = response.status
          this.message = response.message
          modal.open({
            type: 'success',
            title: '報到成功',
            callback: () => cb(),
          })
        }
      } catch (err) {
        this.status = err.status
        this.message = err.message
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

export default useEntryRecord
