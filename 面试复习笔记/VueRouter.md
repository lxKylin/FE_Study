### 1.后端渲染

- html+css+java
- java代码从数据库中读取数据，并且将它动态的放在页面中，这已经是在服务器渲染好的网页

### 2.后端路由

- 服务器处理URL和页面之间的映射关系

### 3.前端渲染

- 浏览器中显示的网页中的大部分内容，是由前端写的js代码在浏览器中执行，最终渲染的网页

### 4.前端路由hash及history

- 改变URL，但页面不进行整体刷新

- 直接赋值location.hash改变href，页面不会刷新

- HTML5的history模式(5种方法)，页面也不会刷新
  - ` pushState`、` replaceState`、 `back`、`forward` 、` go`
  
- 通过historyAPI，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话会出现404错误）,因为**刷新是实实在在地去请求服务器的**。

- 在hash模式下，前端路由修改的是#中的信息，而**浏览器请求时不会将 # 后面的数据发送到后台**，所以没有问题。

- 但是在history下，你可以自由的修改path，当刷新时，**如果服务器中没有相应的响应或者资源，则会刷新出来404页面**

  - **只需要在服务器配置如果URL匹配不到任何静态资源，就跳转到默认的index.html**

  ```
  location / {
  　　root  D:\Test\exprice\dist;
  　　index index.html index.htm;
  　　try_files $uri $uri/ /index.html;
  }
  ```

  

### **5.Vue-Router**

#### 5.1使用步骤

- 导入路由对象，并且调用Vue.use(VueRouter)

```js
// 配置路由相关信息
import Vue from 'vue' // 导入vue
import Router from 'vue-router' //导入路由

// 1.通过Vue.use(插件),安装插件
Vue.use(Router)
```

- 创建路由实例，并且传入路由映射配置

```js
// 2.创建路由实例对象
//配置路由映射：组件和路径映射关系
const routes = [
  {
    path: '/',
    redirect: '/home'//重定向，设置首页路径为默认显示
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [//路由嵌套
      {
        //子组件可以这样写 不加 /
        path: 'news',
        component: HomeNews,
      },
      {
        path: 'message',
        component: HomeMessage
      },
      {
        path: '/user/:id', //动态路由
        component: User,
        meta: {
          title: '用户',
    		},
  		},
    ]
  },
]
const router = new Router({
  //配置路由和组件之间的应用关系
  routes,
  mode: 'history', //模式转换为history / ，默认为哈希模式/#
  linkActiveClass: 'active',//谁处于活跃就添加名为active的class
})

// 3.把路由传入Vue实例中
export default router
```

- 使用路由：通过` <router-link>`这个相当于` <a>`标签**跳转路径**和` <router-view>`相当于**占位**

#### 5.2` <router-link>`其他属性

- tag可以指定渲染成什么标签
- replace后退键不能返回上一个
- active-class路由匹配成功后，自动给当前元素设置class

```js
<router-link to="/home" tag="button" active-class="active">首页</router-link>
<router-link to="/about" replace>关于</router-link>
```

#### 5.3通过代码跳转路径

```js
homeClick() {
  //通过代码的方式修改路径
  // $router 调用 push => pushState $router是index.js中 new Router
  this.$router.push('/home')
},
userClick() {
	this.$router.push('/user/' + this.userId)
},
```

### 6.路由懒加载

- 将路由对应的组件打包成一个个js代码块
- 路由被访问时再加载对应组件

#### 为什么要懒加载

- 如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，会出现长时间的白屏，即使做了loading也是不利于用户体验，
- 而运用懒加载则可以将页面进行划分，需要的时候再加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时

#### 实现方式

- 箭头函数包裹` import()`
  - ES6的语法
  - import 是在**编译时调用**,所以必须放在文件开头
  - import()是个**语法糖，返回值是一个Promise对象**，意味着这需要异步处理，你可以在.then()中拿到真正的模块
  - import是**解构过程**，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，**import语法会被转码为require**
- ` require`
  - AMD的规范
  - require是在**运行时调用**,所以require理论上可以运用在代码的任何地方
  - require是**赋值过程**，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量

```js
//1.使用import懒加载，箭头函数形式
const Home = () => import('../components/Home.vue')
//2.使用require懒加载
component: resolve => (require(['./components/Home.vue'], resolve))
```

### 7.传递参数

#### 7.1params(动态路由)

- 配置路由格式：/router/:id
- 传递方式：在path后面跟上对应值
- 传递后形成路径：` /router/id`(参数不会在URL地址显示)
- 取传递参数的方式：` $route.params.id`

```vue
<!-- 这里用v-bind进行动态绑定 -->
<router-link  :to=" '/user/' + userId">用户</router-link>

data() {
    return {
      userId: 'Kylin'
    }
  },
```

#### 7.2query

- 配置路由格式：/router
- 传递方式：对象中使用**query的key**作为传递方式
- 传递后形成路径：` /router?id=123&name=Kylin`(参数会在URL地址显示)
- 取传递参数的方式：` $route.query.name`

```vue
<!--传参数-->
    <router-link :to="{
      path: '/profile',
      query: {name: 'Kylin', age: 21, height: 1.72}
    }">档案</router-link>
```

#### 7.3通过代码传参

```js
userClick() {
	this.$router.push('/user/' + this.userId)
},
profileClick() {
  this.$router.push({
    path: '/profile',
    query: {
      name: 'lx',
      age: 18,
      height: 1.72
    }
  })
},
```

#### 7.4` $router`和 ` $route`的区别

- ` $router`是VueRouter实例(**全局**)，想要导航到不同URL，则使用` $router.push`方法，包括了路由的跳转方法，钩子函数等
- ` $route`是当前router跳转对象(**当前活跃路由**)里可以获取` name`，` path`，` query`，` params`等

### 8.导航守卫

- 监听路由的进入和离开
- 全局和局部(路由独享守卫，组件守卫)

- 应用：在一个SPA应用中，改变网页标题

```js
//前置守卫 guard 前置钩子 hook 也是个回调
router.beforeEach((to, from, next) => {

  //从from 跳转到 to
  document.title = to.matched[0].meta.title
  //next 下一步 是一个拦截器, 最新版中已经不推荐使用，使用return 返回
  next()
})

// 后置守卫不需要主动调用next()
router.afterEach((to, from) => {

})
```

### 9.` keep-alive`状态缓存

- 被包在` keep-alive`中的组件离开前的状态会被保存
- 一般结合路由和动态组件一起使用，用于缓存组件
- 对应两个钩子函数` actived`、` deactived`
  - ` actived`：激活时调用
  - ` deactived`：停用时调用
- 两个重要属性
  - ` include`：字符串或正则表达式，匹配的组件**会被缓存**
  - ` exclude`：字符串或正则表达式，匹配的组件**不会被缓存**

```html
<keep-alive exclude="Profile">
	<router-view></router-view>
</keep-alive>
```

