/**
 * Proxy
 * 语法：
 * const p = new Proxy(target, handler);
 * @param {Object} target 要使用proxy包装的目标对象（可以是任意类型的对象，包括原生数组、函数、甚至另外一个代理）
 * @param {} handler 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理p的行为
 * 支持13种拦截操作：
 * get、set、has、。。。。
 * https://juejin.cn/post/7069397770766909476
 */

//定义一个需要代理的对象
let person = {
  name: 'Kylin',
  age: 0
}
//定义handler对象
let handler = {
  get(obj, key) {
    // 如果对象里有这个属性，就返回属性值，如果没有，就返回'没有这个属性'
    return key in obj ? obj[key] : '没有这个属性'
  },
  set(obj, key, val) {
    obj[key] = val
    return true
  }
}
//把handler对象传入Proxy
let proxyObj = new Proxy(person, handler)

// 测试get能否拦截成功
console.log(proxyObj.name) //输出Kylin
console.log(proxyObj.age) //输出0
console.log(proxyObj.school) //输出'没有这个属性'

// 测试set能否拦截成功
proxyObj.age = 18
console.log(proxyObj.age) //输出18 修改成功