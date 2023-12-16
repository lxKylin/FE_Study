/**
 * @name Vue数据双向绑定（响应式系统）的实现原理
 */

// observe方法遍历并包装对象属性
function observe(target) {
  // 若target是一个对象，则遍历它
  if (target && typeof target === "Object") {
    Object.keys(target).forEach((key) => {
      // defineReactive方法会给目标属性装上“监听器”
      defineReactive(target, key, target[key]);
    });
  }
}
// 定义defineReactive方法
function defineReactive(target, key, val) {
  const dep = new Dep();
  // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
  observe(val);
  // 为当前属性安装监听器
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get() {
      return val;
    },
    // 监听器函数
    set(value) {
      dep.notify();
    },
  });
}

class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }

  // 派发更新
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
