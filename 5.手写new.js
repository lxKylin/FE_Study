function _new(fn, ...arg) {
  // 创建空对象，并设置原型链
  let obj = Object.create(fn.prototype);
  // 将构造函数的this指向该对象
  let newObj = fn.apply(obj, arg)
  // 判断构造函数返回值类型，如果是基本类型，返回obj，如果是引用类型，就返回这个引用类型的对象
  return newObj instanceof Object ? newObj : obj
}
function friend(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name)
  }
}
const a = _new(friend, 'Kylin', 21);
console.log(a)