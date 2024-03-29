### 1.对Vue的理解

vue是一套用于构建用户界面的渐进式框架，相当于view层, 可以双向数据绑定, 相对其他框架，他更轻量, 性能上更高效, 更容易上手, 学习成本低,可以和各种支持的第三方库结合使用，完全能够为复杂的单页面富应用(SPA)提供驱动

### 2.与React的区别

React采用特殊的JSX语法，Vue在组件开发中使用`.vue`特殊文件格式；中心思想相同：都是使用组件，组件实例之间可以嵌套；都不内置AJAX，Route等功能到核心包，而是以插件的方式加载；在组件开发中都支持mixins的特性。

`Vue` 借鉴了`angular` 的模板和数据绑定技术，又借鉴了`react` 的组件化和虚拟`DOM` 技术

### 3.生命周期

- 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。
- 可以总共分为**8**个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后

- **beforeCreate**：在beforeCreate生命周期执行的时候，data和methods中的数据都还没有初始化。不能在这个阶段使用data中的数据和methods中的方法
-  **created**：data 和 methods都已经被初始化好了，**如果要调用 methods 中的方法，或者操作 data 中的数据，最早可以在这个阶段中操作，也可进行网络请求**
- **beforeMount**：执行到这个钩子的时候，在内存中已经编译好了模板了，但是还没有挂载到页面中，此时，页面还是旧的
- **mounted**：执行到这个钩子的时候，就表示Vue实例已经初始化完成了。此时组件脱离了创建阶段，进入到了运行阶段。 **如果要通过插件操作页面上的DOM节点，最早可以在和这个阶段中进行，也可进行网络请求**
- **beforeUpdate**： 当执行这个钩子时，页面中的显示的数据还是旧的，data中的数据是更新后的， 页面还没有和最新的数据保持同步
-  **updated**：页面显示的数据和data中的数据已经保持同步了，都是最新的
-  **beforeDestroy**：Vue实例从运行阶段进入到了销毁阶段，这个时候上所有的 data 和 methods ，指令，过滤器 ……都是处于可用状态。还没有真正被销毁
- **destroyed**： 这个时候上所有的 data 和 methods ，指令，过滤器 ……都是处于不可用状态。组件已经被销毁了。

### 4.Vue获取数据(网络请求)在哪个生命周期

- 一般 created/beforeMount/mounted 皆可
- 如果你要操作 DOM ,  mounted 时候才能操作
- 如果想要在created操作DOM，可以通过 vm.$nextTick 来访问 Dom，**nextTick（DOM更新之后再执行回调）**
- 在created中调用网络请求，能更快获取到服务端数据，减少页面loading事件，服务端渲染(SSR)，不支持beforeMount/mounted ，根据实际情况而定，要是需要操作DOM，就在mounted中

#### nextTick的实现原理

- 涉及事件循环
- vue进行DOM更新，内部是调用nextTick来做异步队列控制。而当我们自己调用nextTick的时候，它就在更新DOM的那个微任务后追加了回调函数，从而确保我们的代码在DOM更新后执行

### 5.MVVM与MVC

#### 5.1MVVM

- **Model**模型：用于处理应用程序的数据逻辑
- **View**视图：用于应用程序中处理数据显示
- **ViewModel**视图模型：是View和Model层的桥梁， 一是将【模型】转化成【视图】，二是将【视图】转化成【模型】
- vue是实现了双向数据绑定的mvvm框架，就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变。

#### 5.2MVC

- 在 Controller 里面把 Model 的数据赋值给 View

- **Model**模型：用于处理应用程序的数据逻辑
- **View**视图：用于应用程序中处理数据显示

- **Controller**控制器：是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据

#### 5.3区别

- MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变

### 6.Vue2.x中响应式是如何实现的？

vue2.x 响应式是通过 **数据劫持** 结合 **发布订阅模式**（依赖收集、派发更新）的方式来实现的， 
- 在访问数据时，数据有自带的`get`方法，如果手动写了`get`方法，就代表重写，也就是数据劫持
- 此时，不能定义`value`的值（`value`和`get`、`set`不能同时存在）

- **采用数据劫持/数据代理结合发布-订阅模式，通过 `Object.defineProperty`来劫持各个属性的 setter，getter，当数据变动时，发布消息给订阅者，会触发响应的监听回调。**
#### 总体流程

![总体流程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b52c07de7ac54f52abbc3d2f000f808b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

- 在Vue中，每个组件实例都有相应的`watcher`实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而致使它关联的组件得以更新。(典型的**观察者模式**)

#### 关键角色

- `Observer`: 它的作用是通过`Object.defineProperty`给对象的属性添加`getter`和`setter`，用于依赖收集和派发更新
  
- `Dep`: 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个`Dep`实例（里面`subs`是`Watcher`实例数组）,当数据有变更时,会通过`dep.notify()`通知各个`watcher`。
  
- `Watcher`: 观察者对象 , 实例分为`渲染 watcher (render watcher)`,`计算属性 watcher (computed watcher)`,`侦听器 watcher（user watcher）`三种

#### Watcher和Dep的关系
![Watcher和Dep的关系](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6097bb7630dc44a68cb6b4c4dbef62f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

- `Dep`究竟是用来做什么的呢？
  - 我们通过`defineReactive`方法将`data`中的数据进行响应式后，虽然可以监听到数据的变化了，那我们怎么处理通知视图就更新呢？
- `Dep`就是帮我们依赖管理的。
- 如上图所示：一个属性可能有多个依赖，每个响应式数据都有一个`Dep`来管理它的依赖。

#### 一段话总结原理

- 当创建`Vue`实例时,`vue`会遍历`data`选项的属性,利用`Object.defineProperty`为属性添加`getter`和`setter`对数据的读取进行劫持（`getter`用来依赖收集,`setter`用来派发更新）,并且在内部追踪依赖,在属性被访问和修改时通知变化。
  
- 每个组件实例会有相应的`watcher`实例,会在组件渲染的过程中记录依赖的所有数据属性（进行依赖收集,还有`computed watcher`,`user watcher`实例）,之后依赖项被改动时,`setter`方法会通知依赖与此`data`的`watcher`实例重新计算（派发更新）,从而使它关联的组件重新渲染。

#### 核心实现
- 见详情

#### 6.1响应式实现步骤

- **实现一个监听器 Observer**：利用  `Object.defineProperty` 劫持(监听)各个属性的setter 和 getter。数据变动时，就能监听到数据变化。
- **实现一个解析器 Compile**：解析 Vue 模板指令，将模板中的变量都转成数据，然后初始化渲染页面，并给每个指令对应的节点绑定更新函数；添加监听数据的订阅者，一旦数据有变动，调用更新函数进行数据更新。
- **实现一个订阅者 Watcher**：负责订阅数据的变化，当数据发生变化时，触发对应的更新函数。
- **实现一个发布者Dep**：采用发布-订阅模式，来收集订阅者 Watcher，对监听器 Observer 和 订 阅者 Watcher 进行统一管理。

![响应式实现步骤](https://cdn.nlark.com/yuque/0/2022/jpeg/23115285/1646543265580-2e7655e4-0610-413a-b31a-db15b544e509.jpeg?x-oss-process=image%2Fresize%2Cw_750%2Climit_0)

#### 6.2.数组响应式如何实现

实际上 `Object.defineProperty` 不能监听数组变化

- 以`Array.prototype`为原型创建`arrayMethods`对象
- 遍历那7个响应式数组的方法，在方法原有功能上，**额外添加通知更新(notify)操作**
- 有三种方法push\unshift\splice能够插入新项，现在要把插入的新项也要变为响应式的
- 使用`Object.setPrototypeOf()`将数组的`__proto__`指向`arrayMethods`对象  

#### 6.3.vm.$set()添加响应式属性
- 在Vue.js里面只有data中已经存在的属性才会被`Observe`为响应式数据, 
- 如果你是新增的属性是不会成为响应式数据, 因此Vue提供了一个api(`vm.$set`)来解决这个问题。
- **原理**
  - `vm.$set()`在`new Vue()`时候就被注入到Vue的原型上。

- **正确写法**
  - `this.$set(this.data,”key”,value’)`

- **注意**
  - 对象不能是Vue实例，或者Vue实例的根数据对象（data）

```js
data () {
  return {
    student: {
      name: '',
      sex: ''
    }
  }
}
// 错误写法
//mounted () { // ——钩子函数，实例挂载之后
//  this.student.age = 24
//}
// 正确写法
mounted () {
  this.$set(this.student,"age", 24)
}

```

### 7.**vue组件中的data为什么是函数**

组件中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，它们只负责各自维护的数据，不会造成混乱。而单纯的写成对象形式，就是所有的组件实例共用了一个data，这样改一个全都改了

### 8.分别简述computed和watch的使用场景

- **computed:计算属性**
  - 支持缓存，只有依赖数据发生改变，才会重新进行计算
  - 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
  - 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个**多对一或者一对一**，一般用computed
  - 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法
  - 当**一个属性受多个属性影响**的时候就需要用到computed
  - 最典型的栗子： 购物车商品结算的时候
- **watch:侦听属性**
  - 不支持缓存，数据变，直接会触发相应的操作
  - watch支持异步
  - 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值
  - 当一个属性发生变化时，需要执行对应的操作；**一对多**；
  - 当**一条数据影响多条数据**的时候就需要用watch
  - 栗子：搜索数据

### 9.**如何获取dom**

- Vue2：ref="domName" 用法：this.$refs.domName

- Vue3：ref="pageModalRef" const pageModalRef = ref<InstanceType<typeof PageModal>>()

### 10.Vue两个核心点

数据驱动(ViewModel)、组件系统

### 11.Vue组件通信方式

- `props` 和`$emit`：父组件向子组件传递数据是通过 `prop` 传递的，子组件传递数据给父组件是通过`$emit` 触发事件来做到的
- `$parent`,`$children` 获取当前组件的父组件和子组件
- `provide`和`inject`祖孙组件
  - 一个定义，另一个接收
- `$refs`获取组件实例
- `eventBus` 兄弟组件数据传递 ，这种情况下可以使用事件总线的方式
- vuex状态管理

### 12.虚拟DOM是什么？有什么优缺点？

- 本质就是用**一个原生的 JS 对象去描述一个 DOM 节点**，是对真实 DOM 的一层抽象
- 在浏览器中频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因

- 优点：
  - 无需手动操作 DOM
  - 跨平台
  - 保证性能下限

- 缺点
  - 无法进行极致优化
  - 会比 innerHTML 插入慢，首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算

### 13.Vue事件绑定原理

- 原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的$on 实现的。
- 如果要在组件上使用原生事件，需要加**.native** 修饰符，这样就相当于在父组件中把子组件当做普通 html 标签，然后加上原生事件

### 14.Vue-Router动态路由

- 把某种模式匹配到的所有路由，全都映射到同个组件
- 路由路径中使用“动态路径参数”

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});
```

- vue-router 组件复用导致路由参数失效怎么办?
  - 用 :key 

### 15.对Vuex的理解

vuex 是专门为 vue 提供的全局状态管理系统，可以为多个组件实现**数据共享、数据缓存**等

- 主要包括以下几个模块
  - State：存放数据
  - Getters：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
  - Mutations：是唯一更改 State的方法，且必须是同步函数
  - Actions：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作
  - Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中

### 16.Vuex 页面刷新数据丢失怎么解决

- store里的数据是保存在运行的内存中的，当页面刷新时，页面会重新加载vue实例，store中的数据就会被重新赋值初始化

- 需要做 **vuex 数据持久化**， 一般使用本地存储localStorage的方案来保存数据 ，可以自己设计存储方案 ，也可以使用第三方插件
- 推荐使用 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中

### 17.Vuex 为什么要分模块

- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象中。
- 当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
- 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、**甚至是嵌套子模块**

### 18.vue 中使用了哪些设计模式

- **工厂模式** - 传入参数即可创建实例

  虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

- **单例模式** - 整个程序**有且仅有一个实例**

  - vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉
  - 解决多线程并发访问的问题。
  - 节约系统内存，提交系统运行的效率，提高系统性能

- **发布-订阅模式** (vue 事件机制)

- **观察者模式** (响应式数据原理)

- **装饰模式**: (@装饰器的用法)
- **策略模式** 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

#### 发布订阅模式和观察者模式的区别

- **发布订阅模式**： 订阅者向事件调度中心（`PubSub`）注册（`subscribe`）监听，当**事件调度中心**（`PubSub`）发布通知时（`publish`），订阅者的监听事件将会被触发。
- **观察者模式**： 定义了对象之间 `一对多` 的依赖关系，它只有两个角色，分别是观察的目标对象 `Subject` 和观察者对象 `Observer`，当一个 `目标对象` 的状态发生改变时，所有依赖于它的 `观察者对象` 都会收到通知。

### 19.都做过哪些 Vue 的性能优化

- v-if 和 v-show 区分使用场景 
- 事件代理
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if，v-for的优先级比v-if更高，不能一起使用
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载
- 路由懒加载
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用

### 20.Vue.mixin 的使用场景和原理

- 在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 Vue 的 mixin 功能抽离公共的业务逻辑，

- 原理类似“对象的继承”，当组件初始化时会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
  
- 混入(mixin) 对于不同情况的策略：

  - 函数叠加混入（data、provide）
  - 数组叠加混入（hook、watch）
  - 原型链叠加混入（components，filters，directives）
  - 对象覆盖混入（props，methods，computed，inject ）
  - 替换覆盖混入（el，template，propData）



### 21.Vue首屏加载优化方案

- **使用CDN资源,减小服务器带宽压力**
- **路由懒加载**
- 将一些静态js css放到其他地方（如OSS），减小服务器压力
- **按需加载UI组件**
- 使用nginx开启gzip减小网络传输的流量大小
- 若首屏为登录页，可以做成多入口，登录页单独分离为一个入口
- 使用uglifyjs-webpack-plugin插件代替webpack自带UglifyJsPlugin插件
