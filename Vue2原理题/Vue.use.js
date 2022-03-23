/**
 * Vue.use() 方法至少传入一个参数，该参数类型必须是 Object 或 Function，
 * 如果是 Object 那么这个 Object 需要定义一个 install 方法，
 * 如果是 Function 那么这个函数就被当做 install 方法。
 * 在 Vue.use() 执行时 install 会默认执行，当 install 执行时第一个参数就是 Vue，
 * 其他参数是 Vue.use() 执行时传入的其他参数。
 */
function initUse (Vue) {
  // plugin是插件 参数类型必须是 Object 或 Function
  Vue.use = function (plugin) {
    // 定义 installedPlugins 如果 this._installedPlugins 不存在则为[]
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    // 判断这个插件是否存在 installedPlugins 如果存在就结束，这就是为什么多次调用同一插件，插件只会注册一次
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 如果installedPlugins 不存在
    // additional parameters 附加参数

    // 把类数组的对象转化为真正的数组
    // arguments 是一个对应于传递给函数的参数的类数组对象
    var args = toArray(arguments, 1);
    // unshift 向前添加 this 到 args 
    // 为什么要把这个 this 放到 args 的第一个位置上呢？
    // 这个就和 install 的传递的参数有关系，第一个参数是Vue构造器，第二个参数是可选的选项 options
    // 这里可以看到参数plugin在封装的时候需要暴露一个install方法，或者自身是一个方法，不然是无法传递参数的

    args.unshift(this);
    // 判断入参是否有install方法
    if (typeof plugin.install === 'function') {
      // 有就执行，动态改this指向为plugin
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      // 插件本身就是function 动态改this指向为null
      plugin.apply(null, args);
    }
    // 已注册插件列表添加插件
    installedPlugins.push(plugin);
    return this
  };
}

/**
 * Convert an Array-like object to a real Array.
 * 将类数组转成数组
 */
 function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

class Vue {
  constructor() {}
  _installedPlugins = [];
  test() {
    console.log('test')
  }
}
initUse (Vue)

const plugin = {
  install(vue, option) {
    console.log('plugin')
    console.log(vue, 'vue')
    console.log(option, 'option')
    vue.prototype.like = function (option) {
      console.log('like')
      console.log(option, 'option____')
    }
  }
}

const plugin2 = {
  install(vue, option) {
    console.log('plugin2')
    console.log(vue, 'vue2')
    console.log(option, 'option2')
  }
}

Vue.use(plugin, 'Kylin')
// Vue.use(plugin2, '111')
// Vue.use(plugin)

const vue = new Vue()
vue.test()
vue.like(1)
console.log(Vue._installedPlugins)

/**
 * 总结
 * vue.use原理
 * 首先在Vue的构造函数上面有一个initUse方法传入Vue构造函数进行初始化Vue.use方法
 * 进入Vue.use，这个方法可传入的参数是plugin以及options
 * plugin可以是一个对象也可以是一个函数，若为对象则必须要有install方法
 * 首先Vue.use会判断该插件是否存在在Vue构造函数的_installedPlugins属性上面，存在直接return this
 * 然后使用toArray方法转换类数组把this，也就是Vue构造函数unshift到转换完成的数组前面，这样做是为了
 * install函数中两个形参一个为Vue构造函数，另外的是options。
 * 然后就是判断plugin.install或者plugin是否为函数，是的话使用apply调用并且传入转化好的形参
 * 组后再把插件保存至_installedPlugins属性上 return this
 */
