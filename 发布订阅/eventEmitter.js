class EventEmitter {
  constructor() {
    // 初始化一个存放订阅的数组
    this.list = [];
  }

  // 订阅者
  on(name, fun) { 
    this.list.push({name, fun})
  }

  // 发布者
  emit(name, ...params) { 
    for (let index in this.list) {
      if (this.list[index].name === name) {
        this.list[index].fun(...params)
      }
    }
  }

  // 删除订阅者
  off(name) { 
    for (let index in this.list) {
      if (this.list[index].name === name) {
        this.list.splice(index, 1)
      }
    }
  }
}

let lx = new EventEmitter()

lx.on('say', function(name) {
  console.log(`${name}是傻逼`)
})

lx.emit('say', '温刻新')
lx.off('say')