/**
 * 工厂模式
 * 将创建对象的过程进行单独的封装，将变化(特性)的进行封装、不变(共性)的进行保留。
 * 就像淘宝下单，顾客只需下单，并不需要知道商品的制作流程，就能拿到商品。
 * 简而言之，工厂模式就是一个new和传参的过程，并不需要写很多代码的实现逻辑
 */

/**
 * 构造器 -> 构造函数 -> class类(本质还是构造函数，是构造函数的语法糖)
 * 构造器解决的是多个对象实例的问题，简单工厂解决的是多个类的问题。
 */

function User(username, age) {
  this.username = username;
  this.age = age;
}

User.prototype.sayName = function sayName() {
  console.log(this.username, this.age)
}
let user = new User('小刘同学', 21);
user.sayName() // => '小刘同学' 21

// 等价于上面的写法
class User2 {
  constructor(username, age) {
    this.username = username;
    this.age = age;
  }
  sayName() {
    console.log(this.username, this.age);
  }
}
let user2 = new User2('Arms', 22);
user2.sayName() // 'Arms' 22

/**
 * constructor()
 * 是类默认的方法，就算没有显式定义这个方法，类也会默认隐式的加上这个方法
 */


