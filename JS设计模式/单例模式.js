/**
 * 单例模式：
 * 不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例。
 * 需要构造函数具备判断自己是否已经创建过一个实例的能力
 * 在getInstance方法的判断和拦截下，我们不管调用多少次，
 * Only都只会给我们返回一个实例
 */

class Only {
  show() {
    console.log('only one');
  }
  /**
   * 1. 静态方法
   * 判断单例模式逻辑：
   * instance: 是一个对象，由构造函数所创建的实例
   */
  static getInstance() {
    if (!Only.instance) {
      Only.instance = new Only();
    }
    return Only.instance;
  }
}

let o1 = Only.getInstance();
let o2 = Only.getInstance();
console.log(o1 === o2); // true

/**
 * Vuex源码中实现单例模式的代码
 * 失去了单例判断能力的 install 方法，会为当前的Vue实例重新注入一个新的 Store，
 * 也就是说你中间的那些数据操作全都没了，一切归 0。
 * 因此，单例模式在此处是非常必要的
 */
let Vue; // 这个Vue的作用和楼上的instance作用一样

export function install(_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return;
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue;
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue);
}
