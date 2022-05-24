import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: 'Kylin',
      count: 1,
      list: [
        { name: 'a', age: 21 },
        { name: 'b', age: 22 }
      ]
    };
  },
  // 相当于Vue中的计算属性，具有缓存属性，值不改变多次使用，只调用一次
  // 箭头函数第一个参数就是state
  getters: {
    double(state) {
      return state.count * 2;
    },
    // 普通函数可以通过 this 访问整个store
    about(): any {
      return `${this.list[0].name}+${this.list[0].age}`;
    }
  },
  // 方法 支持同步和异步
  actions: {
    updateName(name: string) {
      this.name = name;
    },
    addCount() {
      this.count++;
    }
  }
});
