// 这就是一个模块
let name = 'Kylin'
let age = 21

function sayHello(name) {
  console.log('Hello' + '-' + name)
}

setTimeout(() => {
  exports.name = 'Arms'
}, 1000)

exports.name = name
exports.age = age
exports.sayHello = sayHello
