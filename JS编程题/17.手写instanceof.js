// 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。
// 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false
function myInstanceof(left, right) {
  //基本数据类型直接返回false
  if(typeof left !== 'object' || left === null) return false;

  let rightProto = right.prototype; // 取右表达式的 prototype 值
  left = left.__proto__; // 取左表达式的__proto__值 左边是实例，拿到的是隐性原型

  while (true) {
    if (left === null) {
      return false;
    }
    if (left === rightProto) {
      return true;
    }
    left = left.__proto__
  }
}

console.log(myInstanceof(new Set(), Object))
console.log(myInstanceof('Kylin', String))
console.log(myInstanceof(111, Number))

