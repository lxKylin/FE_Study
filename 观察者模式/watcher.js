// 目标对象
class Subject {
  constructor() {
    // 观察者列表
    this.observerList = [];
  }

  // 添加观察者
  add(observer) {
    this.observerList.push(observer);
  }

  // 删除观察者
  remove(observer) {
    // this.observerList = this.observerList.filter(item => item !== observer)
    let index = this.observerList.indexOf(observer);
    if (index !== -1) this.observerList.splice(index, 1);
  }

  // 通知观察者
  notify() {
    this.observerList.forEach(item => {
      item.update();
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(this.name)
  }
}

let sub = new Subject()

let ob1 = new Observer('xxx')
let ob2 = new Observer('arms')

sub.add(ob1);
sub.add(ob2);

setTimeout(() => {
  console.log(sub.observerList)
  sub.remove(ob1)
}, 200)

setTimeout(() => {
  sub.notify()
}, 1000)