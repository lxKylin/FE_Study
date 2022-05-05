class EventEmitter {
  constructor() {
    // 初始化一个存放订阅的数组
    // this.list = [];

    // 1.在constructor里初始化，用对象来存放数组
    this.list = {};
  }

  // 2.实现一个订阅者 
  on(name, fun) {
    // this.list.push({name, fun})

    // 如果没有这个订阅者，那么将这个订阅者初始化为空数组
    if (!this.list[name]) {
      this.list[name] = []
    }
    this.list[name].push(fun)
  }

  // 3.实现一个发布者
  emit(name, ...params) {
    // for (let index in this.list) {
    //   if (this.list[index].name === name) {
    //     this.list[index].fun(...params)
    //   }
    // }

    if (this.list[name]) {
      this.list[name].forEach(fun => fun(...params))
    }
  }

  // 4.实现删除一个订阅者
  off(name) {
    // for (let index in this.list) {
    //   if (this.list[index].name === name) {
    //     this.list.splice(index, 1)
    //   }
    // }

    if (this.list[name]) {
      const index = this.list[name].indexOf(name)
      if (index !== -1) {
        // 删除
        this.list[name].splice(index, 1)
      }
      if (this.list[name].length === 0) {
        delete this.list[name]
      }
    }
  }
}

// 5.使用new 来调用这个类
let lx = new EventEmitter()
let xxx = new EventEmitter()

lx.on('say', function (name) {
  console.log(`哈喽${name}`)
})

xxx.on('eat', function(food) {
  console.log(`走，来去吃${food}`)
})

lx.emit('say', 'arms')
xxx.emit('eat', '冰激凌')

lx.off('say')
xxx.off('eat')