import observe from './observe.js';

import Dep from './Dep.js';

// 响应式Reactive 提供闭包环境
// val是get和set 闭包中的环境
export default function defineReactive(data, key, val) {
  const dep = new Dep();
  // console.log('我是defineReactive', key);

  // 判断传入参数个数, 如果只传入两个参数，那么val为该对象的本身值
  if (arguments.length == 2) {
    val = data[key];
  }

  // 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
  let childOb = observe(val);

  Object.defineProperty(data, key, {
    // enumerable，configurable这两个也可不配置
    // 可枚举
    enumerable: true,
    // 可以被配置，比如可以被delete
    configurable: true,

    // getter
    get() {
      console.log('你试图访问' + key + '属性');
      // 如果现在处于依赖收集阶段
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      // 返回值会被作为属性的值
      return val;
    },

    // setter
    set(newValue) {
      console.log('你试图改变' + key + '属性', newValue);
      if (val === newValue) {
        return;
      }
      // 将原来的值改为新值
      val = newValue;
      // 当设置了新值，这个新值也要被observe
      childOb = observe(newValue);

      // 发布订阅模式，通知dep
      dep.notify();
    }
  });
}
