class Person {
  // 私有属性
  private username: string = "Kylin";
  private age: number = 18;
  // 取值
  get getUserName() {
    return this.username;
  }
  get getAge() {
    return this.age
  }
  // 设置值
  set setAge(val: number) {
    this.age = val
  }

  // 静态属性
  static id: string = 'Arms'
  static getId() {
    return Person.id
  }

  // 保护属性
  protected name: string = 'lxKylin'
}
class Navy extends Person {
  getName() {
    return this.name
  }
}

const lx = new Person();
console.log(lx.getUserName); // Kylin

lx.setAge = 21;
console.log(lx.getAge); // 21
/**
 * 在这一步你可能会以为是这样的写法
 * lx.setAge(21)
 */

console.log(Person.id, Person.getId()); // Arms Arms

const navy = new Navy();
console.log(navy.getName()); // lxKylin

export {}
