
// bar = exports 这两个是同一个对象

const bar = require('./bar')

console.log(bar.name)
console.log(bar.age)
bar.sayHello('Kylin')

setTimeout(() => {
  console.log(bar.name)
}, 2000)

// 解构
// const {name, age, sayHello} = require('./bar')

// console.log(name)
// console.log(age)
// sayHello('Kylin')

const obj = {
  name: 'Arms',
  age: 21
}
const info = obj
obj.name = 'Timestamp'
console.log(info.name) // Timestamp

/**
 * 这里obj info就是堆内存中的同一个内存地址
 * 只要一个改变，另一个也会被改变
 */
