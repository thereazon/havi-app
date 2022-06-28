import { defineStore } from 'pinia'

const styleDefine = {
  success: {
    header: 'bg-green-400',
    button: 'text-green-400 border-green-400',
    iconName: 'passed',
  },
  hint: {
    header: 'bg-blue-400',
    button: 'text-blue-400 border-blue-400',
    iconName: 'info-o',
  },
  warning: {
    header: 'bg-orange-400',
    button: 'text-orange-400 border-orange-400',
    iconName: 'warning-o',
  },
  error: {
    header: 'bg-red-400',
    button: 'text-red-400 border-red-400',
    iconName: 'close',
  },
}

export const useAlertModal = defineStore('alertModal', {
  state: () => ({
    type: '',
    title: '',
    content: '',
    callback: () => {},
    isShow: false,
    modalStyle: {},
  }),
  actions: {
    open(options) {
      if (options.type) {
        this.isShow = true
        this.modalStyle = styleDefine[options.type]

        // 傳入的項目
        this.type = options.type //required
        this.title = options.title
        this.content = options.content
        this.callback = options.callback
      }
    },
    close() {
      this.isShow = false
    },
  },
})
