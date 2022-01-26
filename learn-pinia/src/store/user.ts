import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: 'Kylin',
      count: 1
    }
  },
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  actions: {
    updateName(name: string) {
      this.name = name
    },
    addCount() {
      this.count++
    }
  }
})

