/**
 * 作用：
 * 在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
 * @param {Object} obj 要添加属性的对象
 * @param {} prop 要定义或修改的属性的名称或者Symbol
 * @param {} descriptor 要定义或修改的属性描述符
 * Object.defineProperty(obj, prop, descriptor)
 */

/**
 * 1.监听一个属性值的变化
 */

let person = {}
let personName = 'Kylin'

// 在person对象上添加属性name，值为personName
Object.defineProperty(person, 'name', {
  get() {
    console.log('触发了get方法')
    return personName
  },
  set(val) {
    console.log('触发了set方法')
    personName = val
  }
})

// 触发get方法
console.log(person.name)

personName = 'Arms'
console.log(person.name)

// 修改person.name的值，触发set方法
person.name = 'lx'
console.log(person.name)

console.log('--------------------------------');

/**
 * 2.监听对象上的多个属性
 * 使用Object.keys(obj)进行遍历
 * 以数组的形式返回对象上所有可枚举的键(key)
 */

// let obj = { 0: 'a', 1: 'b', 2: 'c' }
// console.log(Object.keys(obj)) // [ '0', '1', '2' ]

let person2 = {
  name: '',
  age: 0
}

// 实现一个响应式函数
function defineProperty(obj, key, val) {
  //如果某对象的属性也是一个对象，递归进入该对象，进行监听
  if (typeof val === 'object') {
    Observer(val)
  }
  Object.defineProperty(obj, key, {
    get() {
      console.log(`访问了${key}属性`)
      return val
    },
    set(newVal) {
      // 如果newVal是一个对象，递归进入该对象进行监听
      if (typeof val === 'object') {
        Observer(key)
      }
      console.log(`${key}属性被修改为${newVal}了`)
      val = newVal
    }

  })
}

// 实现一个遍历函数Observer(中转作用)
function Observer(obj) {
  //如果传入的不是一个对象，return
  if (typeof obj !== "object" || obj === null) {
    return
  }
  // for (key in obj) {
  Object.keys(obj).forEach((key) => {
    defineProperty(obj, key, obj[key])
  })
  // }

}

Observer(person2)
console.log(person2.age)
person2.age = 18
console.log(person2.age)