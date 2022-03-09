### 1.Vuex状态管理：多个组件间共享数据、状态

### 2.哪些状态需要在多个组件间共享状态

- 用户登录状态(token)、用户名称、头像、地理位置信息等（在企业中，只有这些会存储在Vuex中）

### Vuex中状态是对象时，使用时需要注意什么

- 因为对象是引用对象，复制后改变属性还是会影响原始数据，这样会改变state中的数据，所以要先深拷贝对象，再修改

### 3.多页面状态管理(五个核心)

- `state`：存放数据，`$store.state.`
- `getters`：处理数据，`$store.getter.`
- `mutations`：修改同步数据，`this.$store.commit()`
- `actions`：修改异步数据，`this.$store.dispath()`
- `modules`：模块，`$store.state.模块名.`，只有state的方法需要加上模块名

```js
import Vue from "vue";
import Vuex from "vuex"

import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import moduleA from "./modules/moduleA"

//1. 安装插件
Vue.use(Vuex)

// 2.创建对象
const state = {
  count: 1000,
  students: [
    {id: 11, name: 'lx', age: 18},
    {id: 12, name: 'kylin', age: 21},
    {id: 13, name: 'king', age: 23},
    {id: 14, name: 'queen', age: 34},
  ],
  info: {
    name: 'Kylin',
    age: 21,
    height: 172
  },
}
const store = new Vuex.Store({
  //保存状态 公共的对象 通过 $store.state. 使用
  state,
  mutations,//进行同步操作 写方法，通过 $store.commit. 使用
  actions, //进行异步操作，通过 $store.dispath. 使用
  getters,//类似计算属性，默认不能传参，如果要传，要让它返回另一个函数
  //moreAgeStu(state) {
    // return function(age) {
    //   return state.students.filter(s => s.age > age)
    // }
    //return age => {
      //return state.students.filter(s => s.age > age)
    //}
 // }
  modules: { //模块
    a: moduleA
  }
})

// 3.导出store对象
export default store
```

#### 3.1通过`this.$store.state.属性`的方式访问状态

#### 3.2Mutation中的方法必须是同步方法

- 通过`this.$store.commit('mutation中的方法')`来修改状态

- 修改状态不能直接去修改state，要经过Action/Mutations去修改，否则不能跟踪状态的变化

```js
//mutations中
// 方法
  //[INCREMENT] 抽成常量
  [INCREMENT](state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
//组件中
<button @click="addition">+</button>
<button @click="subtraction">-</button>
methods: {
  addition() {
  	this.$store.commit(INCREMENT)
  },
  subtraction() {
  	this.$store.commit('decrement')
  },
}
```

#### 3.3Action中的方法必须是异步方法

```js
// context 上下文 -> store
  aUpdateInfo(context) {
    setTimeout(() => {
      context.commit('updateInfo')
    }, 1000)
  }
//Vue组件的methods中
updateInfo() {
 	this.$store.dispatch('aUpdateInfo')
},
```

